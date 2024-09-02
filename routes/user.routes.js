const express = require('express');
const userRoutes = express.Router();
const Todo = require('../model/todo.model')
const {
    registerUser,
    loginUser,
    todolist,
    userProfile,
    updateTodo,
    createTodo,
    deleteTodo,
    alltodoTasks
} = require('../controller/user.controller');

const { verifyToken } = require('../helpers/user.verifyToken')

userRoutes.get('/register', (req, res) => {
    res.render('register', { user: {} });
});

userRoutes.get('/login', (req, res) => {
    res.render('login', { user: {} });
});

userRoutes.post('/register', registerUser);

userRoutes.post('/login', loginUser);

// error
userRoutes.get('/profile', verifyToken, userProfile);

// show todos when you reach at success page 
userRoutes.get('/success', alltodoTasks);

// create todo list
userRoutes.post('/todos', createTodo);

// update todo list
userRoutes.post('/todos/:id', updateTodo);

// delete todo list
userRoutes.delete('/todos/:id', deleteTodo);

module.exports = userRoutes;
