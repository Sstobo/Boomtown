const fetch = require('node-fetch');

module.exports = app => {

  const ITEMS_URL = `http://localhost:${app.get('JSON_PORT')}/items`;
  const USERS_URL =  `http://localhost:${app.get('JSON_PORT')}/users`;
  return {


    getUsers() {
      return fetch(USERS_URL).then(r => r.json());
    },


    getUser(id) {
      return fetch(`${ITEMS_URL}/${id}`).then(r => r.json());
    },
    sharedItems(query) {
      return fetch(`${ITEMS_URL}/?itemowner=${user.id} `).then(r => r.json());
    }
  };
};