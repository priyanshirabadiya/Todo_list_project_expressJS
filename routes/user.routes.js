const express = require('express');
const passport = require('passport');
const userRoutes = express.Router();
const {
    registerUser,
    getloginUser,
    userProfile,
    successUser,
    getRegister,
    postLogin
} = require('../controller/user.controller');

userRoutes.get('/register', getRegister);

userRoutes.get('/login', getloginUser);

userRoutes.get('/success', successUser);

userRoutes.get('/profile', userProfile);

userRoutes.post('/register', registerUser);

userRoutes.post('/login', postLogin);

module.exports = userRoutes;
