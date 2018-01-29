const { makeExecutableSchema } = require("graphql-tools");
const resolvers = require("./resolvers"); // Next step!
const typeDefs = `
  
    type Tag {
      id: ID
      title: String
    }

    type User {
      id: ID
      email: String
      fullname: String
      shareditems: [Item]
      items: [Item]
    }

    type Item {
      id: ID
      created: String
      imageurl: String
      title: String
      itemowner: User
      borrower: User
      itemurl: String
      description: String
      available: Boolean
      tags: [Tag]
    }  
    
    input TagInput {
      id: ID
      title: String
    }
    input updateItemInput {
      title: String
      description: String
    }
    input AddItemInput {
      imageurl: String
      title: String
      description: String
      tags: [TagInput]
    }
    input updateBorrower {
      available: Boolean  
      borrower: String
    }


    type AddItemReturn {
      title: String
    }

    type Mutation {
      addItem (newItem : AddItemInput): Item
      updateItem (currentItem: updateItemInput): Item
      borrowItem (borrowedItem: updateBorrower): Item
    }
    type Query {
      item(id:ID): Item
      items: [Item]
      user(id: ID): User
      users: [User]
    }
`;
// add borrowitem same way
// when sending information define input type
// any mutation needs an input type, so addItem( what youre making, what it should look like)
module.exports = makeExecutableSchema({
  typeDefs,
  resolvers
});
