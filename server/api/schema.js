const { makeExecutableSchema } = require("graphql-tools");
const resolvers = require("./resolvers"); // Next step!
const typeDefs = `
  
    type Tag {
      id: ID
      title: String
    }

    type User {
      id: ID
      name: String
      email: String
      shareditems: [Item]
    }

    type Item {
      id: ID
      imageurl: String
      title: String
      itemowner: User
      borrower: User
      itemurl: String
      description: String
      available: Boolean
      tags: [Tag]
    }  
       
    type Query {
      item(id:ID): Item
      items: [Item]
      user(id: ID): User
      users: [User]
    }
`;

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers
});
