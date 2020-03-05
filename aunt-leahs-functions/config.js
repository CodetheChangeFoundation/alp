const config = {
  server: process.env['server'], // update me
  userName: process.env['username'],
  password: process.env["password"], // written twice b/c connection pool takes different config form
  database: process.env["db"],
  authentication: {
    options: {
      userName: process.env["username"], // update me
      password: process.env["password"] // update me
    },
    type: "default"
  },
  options: {
    database: process.env["db"], //update me
    encrypt: false,
  }
};

module.exports = {
  config
}