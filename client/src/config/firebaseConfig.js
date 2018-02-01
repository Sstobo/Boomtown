  import * as firebase from 'firebase';
  import 'firebase/auth';
  // Initialize Firebase
const config = {
    apiKey: "AIzaSyDneWVsg7xsubtidXF6RTHku-BH4CKIu5U",
    authDomain: "boomtown-8cb24.firebaseapp.com",
    databaseURL: "https://boomtown-8cb24.firebaseio.com",
    projectId: "boomtown-8cb24",
    storageBucket: "boomtown-8cb24.appspot.com",
    messagingSenderId: "747842299117"
  };
  const firebaseApp = firebase.initializeApp(config);
  const firebaseAuth = firebaseApp.auth();

  export { firebaseApp, firebaseAuth };

