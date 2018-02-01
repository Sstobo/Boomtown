// this file pulls all the server functions together
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const {
  graphqlExpress,
  graphiqlExpress
} = require("apollo-server-express");
const {
  makeExecutableSchema
} = require("graphql-tools");

const createLoaders = require('./api/loaders');
const typeDefs = require('./api/schema');
const config = require('./config');
const initResolvers = require('./api/resolvers');

const app = express();
config(app);

const jsonResource = require("./api/resources/jsonResource")(app);
const postgresResource = require("./api/resources/postgresResource");


// this runs the start function
postgresResource(app).then(pgResource => start(pgResource));

// fires start function with with postgres(app) as the argument 

function start(postgresResource) {
  // schema is makeExecutableSchema wuth our schema and resolvers as arguments
  const schema = makeExecutableSchema({
    // runs schema
    typeDefs,
    // runs resolvers 
    resolvers: initResolvers({
      jsonResource,
      // both have several returned functions (getItem ect)
      postgresResource
    })
  });


  // app.use('/graphql', bodyParser.json(), graphqlExpress({
  //   schema,
  //   context: { loaders: createLoaders() }
  // }));

  app.use("*", cors());
  app.use("/graphql", bodyParser.json(), graphqlExpress({
    schema
  }));

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
  app.use("/graphql", bodyParser.json(), graphqlExpress({
    schema
  }));
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