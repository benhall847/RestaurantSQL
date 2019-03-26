const pgp = require('pg-promise')();
const options = {
    host: 'localhost',
    database:'restaurant-app'
};

const db = pgp(options);
module.exports = db;