const cors = require("cors");

const express = require("express");

const bodyParser = require("body-parser");
const app = express();

const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const schema = require("./api/schema");

// process is from node
const GQL_PORT = process.env.PORT;
// Where we will send all of our GraphQL requests
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
