const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");

const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const {makeExecutableSchema} = require("graphql-tools");

const typeDefs = require('./api/schema');
const initResolvers = require('./api/resolvers');
const config = require('./config');

const app = express();
config(app);

const createLoaders = require('./api/loaders');


const schema = makeExecutableSchema({
  typeDefs,
  resolvers: initResolvers(app)
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
