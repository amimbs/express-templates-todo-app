const db = require('./models');

db.SeqTodo.findAll().then((results) => {
    results.forEach((result) => {
        console.log(result.toJSON())
    })
});