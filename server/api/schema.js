module.exports = `
  
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
    
    }
    input updateItemInput {
      title: String
      description: String
    }
    input AddItemInput {
      imageurl: String
      title: String
      itemowner: ID
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

