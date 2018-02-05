
module.exports = app => {


  app.set('PGUSER', process.env.PGUSER || 'boomtowndb');
  app.set('PGPASSWORD', process.env.PGPASSWORD || 'boomtowndb');
  app.set('PGDATABASE', process.env.PGDATABASE || 'boomtowndb');
  app.set('PGHOST', process.env.PGHOST || 'localhost');
  app.set('PGPORT' , process.env.PGPORT || '5432');
  app.set('PORT', process.env.PORT || '3001');



    app.set("FIREBASE_CONFIG", {
    apiKey: "AIzaSyDneWVsg7xsubtidXF6RTHku-BH4CKIu5U",
    authDomain: "boomtown-8cb24.firebaseapp.com",
    databaseURL: "https://boomtown-8cb24.firebaseio.com",
    projectId: "boomtown-8cb24",
    storageBucket: "boomtown-8cb24.appspot.com",
    messagingSenderId: "747842299117"
    }
  )
  };

  