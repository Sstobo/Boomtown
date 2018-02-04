module.exports = ({
  
  psgResource: { getItems, getItem, getTags, getSharedItems, createItem },
  firebaseResource: { getUser, getUsers }
}) => {
  return {
    Query: {
      items() {
      

        return getItems();
      },
      user(root, { id }) {
        return getUser(id);
      },
      users() {
        return getUsers();
      },
      item(root, { id }) {
        return getItem(id);
      }
    },
  
    Mutation: {
      createNewItem(root, { newItem }) {
        console.log(newItem);
        return createItem(newItem);
      },
      updateItem(root, { enterItem: { title } }) {
        return { title };
      },
      updateBorrower(root, { newBorrower: { borrower } }) {
        console.log(borrower);
        return { borrower };
      }
    },
    Item: {
      itemowner(item) {
        return getUser(item.itemowner);
      },
      borrower(item) {
        if (item.borrower) {
          return getUser(item.borrower);
        } else {
          return null;
        }
      },
      tags(item) {
        return getTags(item.id);
      }
    },
    User: {
      shareditems(user) {
        return getSharedItems(user.id);
      }
    }
  };
};