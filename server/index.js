const express = require("express");
const bodyParser = require("body-parser");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const app = express();
const cors = require("cors");
const createLoaders = require("./api/loaders");
const { makeExecutableSchema } = require("graphql-tools");
const typeDefs = require("./api/schema");
const config = require("./config");
const initResolvers = require("./api/resolvers");

config(app);


let postgresResource = require("./api/resources/postgresResource");
let firebaseResource = require("./api/resources/firebaseResource")(app);

postgresResource(app).then(psgResource => start(psgResource));

function start(psgResource) {
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers: initResolvers({
      psgResource,
      firebaseResource
    })
  });

  app.use("*", cors());

  app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));

  app.use(
    "/graphiql",
    graphiqlExpress({
      endpointURL: "/graphql"
    })
  );
  app.listen(app.get("PORT"), () =>
    console.log(
      `GraphQL is now running on http://localhost:${app.get("PORT")}/graphiql`
    )
  );
}