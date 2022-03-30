const express = require('express');
const res = require('express/lib/response');
// const todoListData = require('./todoListData');

// App Setup
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//static acts on the first instance of index within the public folder
app.use(express.static('./public'));

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

const models = require('./models');

// let highestId = 4;

// Template Engine Configuration

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home', { name: 'DevDoctor' });
});

// GET /todos
app.get('/todos', (request, response) => {
    // // response.json({ todos: todoListData });
    // db.query('SELECT * FROM todos').then((todoData) => {
    //     response.json({ todo: todoData })
    // }).catch((e) => {
    //     response.json({ errors: e });
    // })

    models.SeqTodo.findAll().then((results) => {
        response.json({ todos: results })
    })
});

// GET /todos/:id
app.get('/todos/:id', (req, res) => {
    let id = parseInt(req.params.id);

    if (id == '' || !id) {
        res.send('invalid id');
        return;
    }

    // let foundTodo = todoListData.find((todo) => todo.id === id);

    // res.json(foundTodo)

    // db.one('SELECT * FROM todos WHERE id=$1', id).then((todoData) => {
    //     res.json({ todoContent: todoData })
    // }).catch((e) => {
    //     res.json({ errors: 'we could not find a todo item with the provided id' });
    // })

    models.SeqTodo.findByPk(id).then((todo) => {
        if (!todo) {
            res.json({ errors: 'could not find todo with givien id' })
        } else {
            res.json(todo)
        }
    })
});

// POST /todos
app.post("/todos", (req, res) => {
    let content = req.body.todo;

    if (!content || content == '') {
        res.status(400).send('expected todo key on body, but none given');
        return;
    }

    //line 27 for highestID
    // highestId = highestId + 1;
    // let todo = {
    //     id: highestId,
    //     content: content
    // };
    // todoListData.push(todo);

    // res.status(201).json(todoListData);

    // db.result('INSERT INTO todos(content) VALUES($1)', content).then(() => {
    //     res.status(201).json({ result: "SUCCESS" })
    // }).catch(e => {
    //     res.json({ errors: 'There was an error inserting the todo item.' })
    // })

    models.SeqTodo.create({ content: content, is_completed: false }).then((todo) => {
        res.json(todo)
    })
});

// PUT /todos/:id
app.put('/todos/:id', (req, res) => {
    // find todo with the given id.
    // modify todo from given id.

    if (req.body.completed !== false && req.body.completed !== true) {
        res.status(400).send('Can only modify complete property on todo items.');
        return;
    }

    let id = parseInt(req.params.id);
    // let foundTodo = todoListData.find((todo) => todo.id === id);

    // if (!foundTodo) {
    //     res.status(400).send(`Could not find todo item with provided id: ${id}`);
    //     return;
    // }

    // foundTodo.completed = req.body.completed;
    // console.log(todoListData);
    // res.json(foundTodo);

    // db.result('UPDATE todos SET is_completed = $1 WHERE id = $2', [req.body.completed, id]).then(() => {
    //     res.status(201).json({ result: "Success" })
    // }).catch(e => {
    //     res.json({ errors: 'There was an error updating this todo.' })
    // })

    models.SeqTodo.findByPk(id).then((todo) => {
        if (!todo) {
            res.json({ errors: 'could not find todo with givien id' })
        } else {
            todo.update({
                is_completed: req.body.completed,
                content: req.body.body
            })
            res.json(todo)
        }
    })
})

// DELETE /todos/:id
app.delete('/todos/:id', (req, res) => {
    // find the element with the given id.
    // remove from the todo list array.

    let id = parseInt(req.params.id);
    // let todoIndex = todoListData.findIndex((todo) => todo.id === id);

    // if (todoIndex == -1) {
    //     res.status(400).send(`Could not find todo item with provided id: ${id}`);
    //     return;
    // }

    // todoListData.splice(todoIndex, 1);

    // res.json(todoListData);

    // db.result('DELETE FROM todos WHERE id = $1', (id)).then(() => {
    //     res.status(201).json({ result: `${id} has been deleted` })
    // }).catch(e => {
    //     res.json({ errors: 'There was an error updating this todo.' })
    // })

    models.SeqTodo.findByPk(id).then((todo) => {
        if (todo) {
            todo.destroy();
        }
        res.status(201).json({ result: "Success" });
    })
})

app.listen(8080, function () {
    console.log('Todo List App is now listening on port 8080...');
});