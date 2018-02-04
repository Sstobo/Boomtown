// where the commands live
module.exports = ({
  // commands for each resource
  firebaseResource: { getUsers, getUser }, 
  postgresResource: { getItem, getItems, getTags, getSharedItems, getBorrowedItems, createItem  }

}) => {
  // all commands exist within the resources. They are collected here. 
 return {
  Query: {
    items() {
      return getItems();
    },
    users() {
      return  getUsers();
    },
    user(root, { id }) {
     return getUser(id);
    },
    item(root, { id }) {
      return getItem(id);
    }
  },
  Mutation: {
    // addItem(root, { newItem} ) {
    //   return createItem(newItem);
    // },
    updateItem(root, { currentItem: { title } }) {
      return { title };
    },
    borrowItem(root, { borrowedItem: { title } }) {
      return { title };
    },
    createNewItem(root, { newItem }) {
      return createItem(newItem);
    },
    updateItem(root, { updatedItem: { borrower } }) {
      console.log({ borrower });
      return { borrower };
    }
  },

  Item: {
    itemowner(item) {
     return getUser(item.itemowner);
    },
    borrower(item) {
      if (item.borrower) {
       return getUser(item.borrower)
      } else {
        return null;
      }
    },
    async tags(item) {
      return await getTags(item.id);
    }
  },
    User: {
      borroweditems(user) {
        return getBorrowedItems(user.id);
      },
    shareditems(user) {
      return sharedItems(user.id);
    }
  }
}
}
