// initializes and requires pg-promise package, which is a function
const pgp = require('pg-promise')();

// This creates a connection to our database
const config = {
    host: 'salt.db.elephantsql.com',
    port: 5432,
    database: 'yqutcism',
    user: 'yqutcism',
    password: 'B146Py8ME36XXZ2UM0_lzZwAQLJLEObz'
};

// our pgp(config) returns our databases in beekeeper
const db = pgp(config);

db.query('SELECT * FROM pokemon WHERE id = 1').then((results) => {
    console.log(results);
}).catch((e) => {
    console.log(e)
});

db.one('SELECT * FROM pokemon WHERE id = 1').then((result) => {
    console.log(result);
});

// closes the connection
pgp.end();