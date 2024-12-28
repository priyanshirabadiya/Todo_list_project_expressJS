const express = require('express');
let Todo = require('../model/todo.model');
const passport = require('passport');
const userRoutes = express.Router();
const {
    registerUser,
    getloginUser,
    userProfile,
    successUser,
    logoutUser,
    getRegister,
    postLogin
} = require('../controller/user.controller');

const {
    otpVerificationalEmail,
    verifyOTProute,
    enterEmail,
    resetPasswordFinally,
    setNewPassword,
    getotp
} = require('../controller/otpverify.controller');

const {
    createTodo,
    updatedTodo,
    deleteTodo,
    successTodoAll
} = require('../controller/todo.controller');

const isAuthenticated = require('../helpers/auth.middleware');

userRoutes.get('/register', getRegister);

userRoutes.get('/login', getloginUser);

userRoutes.get('/success', successUser);

userRoutes.get('/profile', userProfile);

userRoutes.get('/logout', logoutUser);

userRoutes.get("/all-otps", getotp);

// sent otp and compare 
userRoutes.get('/enter-email', enterEmail);

userRoutes.post('/enter-otp', otpVerificationalEmail);

userRoutes.post('/verify-otp', verifyOTProute);

// reset-password
userRoutes.get('/reset-password', resetPasswordFinally);

userRoutes.post('/set-new', setNewPassword);

// register and login
userRoutes.post('/register', registerUser);

userRoutes.post('/login', postLogin);

// todo list
userRoutes.post('/addtask', isAuthenticated, createTodo);

userRoutes.get('/successM', isAuthenticated, successTodoAll);

userRoutes.post('/delete/:_id', deleteTodo);

userRoutes.put('/update-task/:id', updatedTodo);

module.exports = userRoutes;
