const { Client } = require('pg')

// 
module.exports = async app => {

// Client is a function of postgress. We name it 'client once instantiated with all of our 
// configurations

const client = new Client({
  user: app.get('PGUSER'),
  host: app.get('PGHOST'),
  database: app.get('PGDATABASE'),
  password: app.get('PGPASSWORD'),
  port: app.get('PGPORT')
  })
// this waits for client to connect with the server
await client.connect()

// these commands do a client.query (method of PG). The query is simply a SQL command to get 
// what we want 
  return {
    getItems() {
      console.log("hey bro dont quit now, your a star!")
      return new Promise((resolve, reject) => {
        client.query('SELECT * FROM items',  (err, res) => {
          resolve(res.rows);
        })
      })
    },

    // pass in args if needed in command line
    getItem(id) {
      return new Promise((resolve, reject) => {
        client.query('SELECT * FROM items WHERE id = $1', [id], (err, res) => {
          resolve(res.rows);
        })
      })
    },
    getTags(itemid) {
      return new Promise((resolve, reject) => {
        client.query(
          `SELECT * FROM tags 
          INNER JOIN itemtags ON itemtags.tagid = tags.id
          WHERE itemtags.itemid=$1`,
          [itemid],
          (err, res) => {
            resolve(res.rows);
          }
        );
      });
    },
    }
  }
