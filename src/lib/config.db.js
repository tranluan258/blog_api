import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();
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
const connection = new DB(DATABASE,PASSWORD,HOST,USER).connection()

export default connection;