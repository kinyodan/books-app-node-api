const dotenv = require("dotenv")
dotenv.config()

const dbconfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test',
    connectionLimit : 10,
    debug:  false
};

export default {
    dbconfig
}
