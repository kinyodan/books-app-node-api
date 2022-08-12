let mysql = require('mysql');
const { Client } = require('pg')

const dotenv = require("dotenv")
dotenv.config()
let dbconfigPg: any = {}
let dbconfigMysql: any = {}

// Config production
if(process.env.NODE_ENV === 'production'){
    dbconfigMysql = {
      host: process.env.PRODUCTION_DB_HOST || '',
      user: process.env.PRODUCTION_DB_USER || '',
      password: process.env.PRODUCTION_DB_PASSWORD || '',
      database: process.env.PRODUCTION_DATABASE || '',
      acquireTimeout:6000000,
      port: 3306,
    }

    dbconfigPg = {
        host: process.env.PG_PRODUCTION_DB_HOST || '',
        user: process.env.PG_PRODUCTION_DB_USER || '',
        password: process.env.PG_PRODUCTION_DB_PASSWORD || '',
        database: process.env.PG_PRODUCTION_DATABASE || '',
        port: 5432,
    }
}

// Config Development
if (process.env.NODE_ENV === 'development') {
    console.log("Config Development")
    dbconfigMysql = {
      host: process.env.LOCAL_DB_HOST ,
      user: process.env.LOCAL_DB_USER ,
      password: process.env.LOCAL_DB_PASSWORD ,
      database: process.env.LOCAL_DATABASE ,
      connectionLimit: 10,
      acquireTimeout:6000000,
      debug: false
   };
}

let db_connection = mysql.createPool(dbconfigMysql);
const pg_client = new Client(dbconfigPg)

export default {
    db_connection,
    pg_client
}
