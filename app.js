const express = require('express');
const todoListData = require('./todoListData');
let todoIndex = 4;
// App Setup
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('./public'));


// CRUD
// CREATE
// READ 
// UPDATE 
// DELETE 


// Template Engine Configuration



// GET /todos
app.get('/todos', (req, res) => {
  res.json( { todos: todoListData } );
})

// GET /todos/:id
app.get('/todos/:id', (req, res) => {
  let id = parseInt(req.params.id);
  if(id == '' || !id) {
    res.status(400).send('Invalid id');
    return;
  }

  // let foundTodo;

  // todoListData.forEach((todo) => {
  //   if(todo.id == id) {
  //     foundTodo = todo
  //   }
  // });

  // res.json(foundTodo);

  let foundTodo = todoListData.find((todo) => todo.id === id);
  res.json(foundTodo);

  // const { id } = req.params;
  // // here we're checking if todoItem.id from todoListData.js is strictly equal to our id variable and returning it if it is equal
  // const todoJSON = todoListData.filter((todoItem) => todoItem.id === Number(id));
  // res.json(todoJSON);

});

// POST /todos
app.post('/todos', (req, res) => {
  let content = req.body.content;

  if(!content || content == '') {
    res.status(400).send('Expected content on body');
    return;
  }

  todoIndex = todoIndex + 1;
  const todoItem = {
    id: todoIndex,
    content: content
  };

  todoListData.push(todoItem);
  res.status(201).json(todoListData);
})

// PUT /todos/:id
app.put('/todos/:id', (req, res) => {
  let id = parseInt(req.params.id);
  const content = req.body.content;

  // this happens if our content is null
  if(!content || content == '') {
    return res.status(400).send('Expected content on body');
  }

  // this is the success condition
  let i = todoListData.findIndex((todo) => todo.id === id);
  if(i >= 0) {
    todoListData[i].content = content;
    return res.status(201).json(todoListData);
  }

  // this handles if we dont find any ID
  return res.status(404).send('Nothing found');
})


// DELETE /todos/:id
app.delete('/todos/:id', (req, res) => {
  let id = parseInt(req.params.id);
  if(!id) {
    res.status(400).send('Invalid id');
    return;
  }

  let i = todoListData.findIndex((todo) => todo.id === id);
  if (i >= 0) {
    todoListData.splice(i, 1);
    return res.status(201).send('Todo Deleted');
  }

  return res.status(404).send('Nothing found');
});

app.listen(3000, function () {
  console.log('Todo List App is now listening on port 3000...');
});
