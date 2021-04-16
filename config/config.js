const env = process.env.NODE_ENV 

if (env == 'development' || env =='test') {
    require('dotenv').config()
}

let capsEnv = env.toUpperCase()
  let database = {
      username : process.env["DB_USERNAME_" + capsEnv],
      password : process.env["DB_PASSWORD_" + capsEnv],
      database : process.env["DB_NAME_" + capsEnv],
      host : process.env["DB_HOST_" + capsEnv],
      dialect : process.env["DB_DIALECT_" + capsEnv] 
  }

module.exports = {
  "development": database,
  "test": database,
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
