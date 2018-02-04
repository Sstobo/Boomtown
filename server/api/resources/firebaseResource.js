
// import 'firebase/auth';
const firebase = require('firebase');
// Initialize Firebase
// const firebaseAuth = firebaseApp.auth();



module.exports = app => {

  const firebaseApp = firebase.initializeApp(app.get('FIREBASE_CONFIG'))

  const firedb = firebaseApp.database();
  const auth = firebase.auth();

  return {
    async getUsers() {
      const users = await firedb.ref('/users/').once('value');
      const userList = [];
      Object.keys(users, (userid) => {
        userList.push({
          // id: userid, 
          email: users[userid].email, 
          fullname:users[userid].fullname,
          // imageurl: "",
          bio: users[userid].bio
        });
    })},
    async getUser(userid) {
      console.log(userid)
      let user = await firedb.ref(`/users/${userid}`).once('value');
       user = user.val();
       return {
         id: userid,
         ... user
       }
    }
  }
}

