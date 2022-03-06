const mysql = require('mysql2')
// eslint-disable-next-line no-undef
const {HOST,DATABASE,USER,PASSWORD} = process.env

class DB {
    constructor(database, password,host,user) {
      this.connectionCreated = null;
      this.database = database;
      this.password = password;
      this.host = host,
      this.user = user
    }
  
    connection() {
      // eslint-disable-next-line no-unused-vars
      console.log("init connection")
      if(!this.connectionCreated) {
        this.connectionCreated = mysql.createConnection({
          host: this.host,
          user: this.user,
          password:this.password,
          database: this.database,
        })
        return this.connectionCreated;
      }

      return this.connectionCreated;
    }
}

module.exports = new DB(DATABASE,PASSWORD,HOST,USER).connection();