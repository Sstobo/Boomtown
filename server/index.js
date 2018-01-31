const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const {makeExecutableSchema} = require("graphql-tools");

const config = require('./config');
const createLoaders = require('./api/loaders');
const app = express();
config(app);



const typeDefs = require('./api/schema');
const initResolvers = require('./api/resolvers');
const jsonResource = require("./api/resources/jsonResource")(app);
const postgresResource = require("./api/resources/postgresResource");

postgresResource(app).then(pgResource => start(pgResource));

function start(postgresResource) {

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: initResolvers({
    jsonResource,
    postgresResource
})
});


// app.use('/graphql', bodyParser.json(), graphqlExpress({
//   schema,
//   context: { loaders: createLoaders() }
// }));

app.use("*", cors());
app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));

// A route for accessing the GraphiQL tool
app.use(
  "/graphiql",
  graphiqlExpress({
    endpointURL: "/graphql"
  })
);
app.listen(app.get('PORT'), () =>
  console.log(`http://localhost:${app.get('PORT')}/items`)
);
};