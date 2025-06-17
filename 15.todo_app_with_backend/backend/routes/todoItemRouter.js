const express = require('express');
const { addItem, getItem, deleteItem, markCompleted } = require('../controller/todoItemController');
const todoItemRouter = express.Router();


todoItemRouter.get('/', getItem);
todoItemRouter.post('/create', addItem);
todoItemRouter.delete('/delete/:id', deleteItem);
todoItemRouter.put('/:id/completed', markCompleted);

exports.todoItemRouter = todoItemRouter;