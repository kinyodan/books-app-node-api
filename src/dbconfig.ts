let mysql = require('mysql');
const dotenv = require("dotenv")
dotenv.config()
let dbconfig: any = {}

// Config production
if(process.env.NODE_ENV === 'production'){
    dbconfig = {
      host: process.env.PRODUCTION_DB_HOST || '',
      user: process.env.PRODUCTION_DB_USER || '',
      password: process.env.PRODUCTION_DB_PASSWORD || '',
      database: process.env.PRODUCTION_DATABASE || '',
      acquireTimeout:6000000,
      port: 3306,

    }
}

// Config Development
if (process.env.NODE_ENV === 'development') {
    console.log("Config Development")
    dbconfig = {
      host: process.env.LOCAL_DB_HOST ,
      user: process.env.LOCAL_DB_USER ,
      password: process.env.LOCAL_DB_PASSWORD ,
      database: process.env.LOCAL_DATABASE ,
      connectionLimit: 10,
      acquireTimeout:6000000,
      debug: false
   };
}

let db_connection = mysql.createPool(dbconfig);

export default {
    db_connection
}
