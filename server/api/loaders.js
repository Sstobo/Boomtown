const DataLoader = require('dataloader');
const  dataLoader = function() {
  return {
    UserOwnedItems: new DataLoader(ids => (
      Promise.all(ids.map(id => getUserOwnedItems(id))
    ))),
  }
};
module.exports = dataLoader;