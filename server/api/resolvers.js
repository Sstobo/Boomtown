// where the commands live
module.exports = ({
  jsonResource: { getUser, getUsers},
  postgresResource: { getItem, getItems, getTags  }

}) => {
  
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
    addItem(root, { newItem: { title } }) {
      return { title };
    },
    updateItem(root, { currentItem: { title } }) {
      return { title };
    },
    borrowItem(root, { borrowedItem: { title } }) {
      return { title };
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
    tags(item) {
      return getTags(item.id);
      // const theItem = await getItem(item.id);
      // return theItem.tags;
    }
  },
    User: {
      items: (user, args, context) => {
        return context.loaders.UserOwnedItems.load(user.id);
      },
    shareditems(user) {
      return sharedItems(user.id);
    }
  }
}
}
