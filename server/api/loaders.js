const DataLoader = require('dataloader');
// const { getUserOwnedItems } = require ('../../clients/redux/modules/filter');
const  dataLoader = function() {
  return {
    UserOwnedItems: new DataLoader(ids => (
      Promise.all(ids.map(id => getUserOwnedItems(id))
    ))),
    // other data loaders go here...
  }
};
module.exports = dataLoader;