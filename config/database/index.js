const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : process.env.DB_HOST,
      user : process.env.DB_USER,
      password : process.env.DB_PW,
      database : process.env.DB
    }
  });

export default knex;