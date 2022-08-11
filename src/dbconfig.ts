const dotenv = require("dotenv")
dotenv.config()

let dbconfig: any = {}

// Config production
if(process.env.NODE_ENV === 'production'){
    dbconfig = {
      host: process.env.PRODUCTION_DB_HOST || 'localhost',
      user: process.env.PRODUCTION_DB_USER || 'root',
      password: process.env.PRODUCTION_DB_PASSWORD || '',
      database: process.env.PRODUCTION_DATABASE || 'test',
      connectionLimit : 10,
      debug:  false
    };
}

// Config Development
if (process.env.NODE_ENV === 'development') {
    console.log("Config Development")
    dbconfig = {
      host: process.env.LOCAL_DB_HOST || 'localhost',
      user: process.env.LOCAL_DB_USER || 'root',
      password: process.env.LOCAL_DB_PASSWORD || '',
      database: process.env.LOCAL_DATABASE || 'test',
      connectionLimit: 10,
      debug: false
   };
}

export default {
    dbconfig
}
