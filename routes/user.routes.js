const express = require('express');
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

userRoutes.get('/register', getRegister);

userRoutes.get('/login', getloginUser);

userRoutes.get('/success', successUser);

userRoutes.get('/profile', userProfile);

userRoutes.get('/logout', logoutUser);

// f1 
// sent otp on email route
userRoutes.post('/enter-otp', otpVerificationalEmail);

userRoutes.get('/enter-email', enterEmail);

userRoutes.post('/verify-otp', verifyOTProute);



userRoutes.get("/all-otps" , getotp )
// f2
userRoutes.get('/reset-password', resetPasswordFinally);

userRoutes.post('/set-new', setNewPassword);

userRoutes.post('/register', registerUser);

userRoutes.post('/login', postLogin);

module.exports = userRoutes;
