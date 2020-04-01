var config = {
    server: process.env["sqldb_server"],
    options: {
        encrypt: true,
        database: process.env["sqldb_database"]
    },
    authentication: {
        type: 'default',
        options: {
            userName: process.env["sqldb_username"],
            password: process.env["sqldb_password"]
        }
    }
  }
  
  module.exports = config;