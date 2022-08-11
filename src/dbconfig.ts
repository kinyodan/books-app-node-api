const dotenv = require("dotenv")
dotenv.config()

let dbconfig: any = {}

// Config production
if(process.env.NODE_ENV === 'production'){
    dbconfig = {
      host: process.env.PRODUCTION_DB_HOST || 'us-cdbr-iron-east-02.cleardb.net',
      user: process.env.PRODUCTION_DB_USER || 'b2eb7f5d522aef',
      password: process.env.PRODUCTION_DB_PASSWORD || '19ad1620',
      database: process.env.PRODUCTION_DATABASE || 'heroku_32f323172c70e52',
      debug:  true
    }
}

// Config Development
if (process.env.NODE_ENV === 'development') {
    console.log("Config Development")
    dbconfig = {
      host: process.env.LOCAL_DB_HOST || 'us-cdbr-iron-east-02.cleardb.net',
      user: process.env.LOCAL_DB_USER || 'b2eb7f5d522aef',
      password: process.env.LOCAL_DB_PASSWORD || '19ad1620',
      database: process.env.LOCAL_DATABASE || 'heroku_32f323172c70e52',
      connectionLimit: 10,
      debug: false
   };
}

export default {
    dbconfig
}
