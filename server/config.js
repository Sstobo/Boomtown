
module.exports = app => {
// postgres config
  app.set('PGUSER', process.env.PGUSER || 'boomtowndb');
  app.set('PGPASSWORD', process.env.PGPASSWORD || 'boomtowndb');
  app.set('PGDATABASE', process.env.PGDATABASE || 'boomtowndb');
  app.set('PGHOST', process.env.PGHOST || 'localhost');
  app.set('PGPORT' , process.env.PGPORT || '5432');

// GraphQL config

  app.set('PORT', process.env.PORT || '3001');

  // Temp json dev server
  app.set('JSON_PORT', '4000');

};