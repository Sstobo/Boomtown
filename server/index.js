const cors = require("cors");

const express = require("express");

const bodyParser = require("body-parser");
const app = express();
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const schema = require("./api/schema");
const GQL_PORT = process.env.PORT;

const createLoaders = require('./api/loaders');


// app.use('/graphql', bodyParser.json(), graphqlExpress({
//   schema,
//   context: { loaders: createLoaders() }
// }));

app.use("*", cors());
// any request to graphql, parse then run through the schema handler
app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));

// A route for accessing the GraphiQL tool
app.use(
  "/graphiql",
  graphiqlExpress({
    endpointURL: "/graphql"
  })
);
app.listen(GQL_PORT, () =>
  console.log(`GraphQL is now running on http://localhost:${GQL_PORT}/graphql`)
);
