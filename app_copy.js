const express = require('express');
const res = require('express/lib/response');
const todoListData = require('./todoListData');

// App Setup
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//static acts on the first instance of index within the public folder
app.use(express.static('./public'));

let highestId = 4;

// Template Engine Configuration

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home', { name: 'DevDoctor' });
})


// CRUD -> Create Read Update Delete.
// Resource.

// GET /todos
app.get('/todos', (request, response) => {
    response.json({ todos: todoListData });
})

// GET /todos/:id
app.get('/todos/:id', (req, res) => {
    let id = parseInt(req.params.id);

    if (id == '' || !id) {
        res.send('invalid id');
        return;
    }

    // for(let i = 0; i < todoListData.length; i++){
    //   if (todoListData[i].id == id) {
    //     foundTodo = todoListData[i]
    //   }  
    // }
    // todoListData.forEach((todo) => {
    //   if (todo.id == id) {
    //     foundTodo = todo
    //   }
    // })

    let foundTodo = todoListData.find((todo) => todo.id === id);

    res.json(foundTodo)
})

// POST /todos
app.post("/todos", (req, res) => {
    let content = req.body.todo;

    if (!content || content == '') {
        res.status(400).send('expected todo key on body, but none given');
        return;
    }

    highestId = highestId + 1;
    let todo = {
        id: highestId,
        content: content
    };
    todoListData.push(todo);

    res.status(201).json(todoListData);
})

// PUT /todos/:id
app.put('/todos/:id', (req, res) => {
    // find todo with the given id.
    // modify todo from given id.

    if (req.body.completed !== false && req.body.completed !== true) {
        res.status(400).send('Can only modify complete property on todo items.');
        return;
    }

    let id = parseInt(req.params.id);
    let foundTodo = todoListData.find((todo) => todo.id === id);

    if (!foundTodo) {
        res.status(400).send(`Could not find todo item with provided id: ${id}`);
        return;
    }

    foundTodo.completed = req.body.completed;

    res.json(foundTodo);
})

// DELETE /todos/:id
app.delete('/todos/:id', (req, res) => {
    // find the element with the given id.
    // remove from the todo list array.

    let id = parseInt(req.params.id);
    let todoIndex = todoListData.findIndex((todo) => todo.id === id);

    if (todoIndex == -1) {
        res.status(400).send(`Could not find todo item with provided id: ${id}`);
        return;
    }

    todoListData.splice(todoIndex, 1);

    res.json(todoListData);
})

app.listen(3000, function () {
    console.log('Todo List App is now listening on port 3000...');
});