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
userRoutes.get('/successM', successTodoAll);

userRoutes.post('/addtask', createTodo);

userRoutes.post('/delete/:_id', deleteTodo);

userRoutes.put('/update-task/:id', updatedTodo);

module.exports = userRoutes;
