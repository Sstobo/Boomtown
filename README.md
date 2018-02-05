# Boomtown

A property trading ecosystem test in React.

## Getting Started

Download or clone git repo. Run 
```
clients/npm install && npm start
```
```
server/npm install && npm start
```

### Prerequisites

You will need a Postgres server with the content matching the config files in Server. This repo may be updated to include this in the future

```
  app.set('PGUSER', process.env.PGUSER || 'boomtowndb');
  app.set('PGPASSWORD', process.env.PGPASSWORD || '**** YOUR PASSWORD');
  app.set('PGDATABASE', process.env.PGDATABASE || 'boomtowndb');
  app.set('PGHOST', process.env.PGHOST || 'localhost');
  app.set('PGPORT' , process.env.PGPORT || '5432');
  app.set('PORT', process.env.PORT || '3001');
```

### Installing

Install client / server npm packages.
Install / create Boomtown Postgres server.
Run npm start in both client / server folders.
Open localhost:3000
Sign in


## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [React] 
* [Redux]
* [Node.js]
* [Apollo Server] 
* [Postgres]
* [Firebase]
* GraphQL
* Material-ui

## Contributing

As usual, I would like to thank my classmates. They provided a lot of extra help, specifically Colin, Travis and Nate. 

## Learning / Reflection

This has been by far the most challenging project yet. As now, it is still incomplete. The share function is only 30% done. I will be completeing this in the upcoming week.

## Authors

* **Sean Stobo** - *Initial work* - [Sstobo](https://github.com/Sstobo)


## License

This project is licensed under Red Academy.
