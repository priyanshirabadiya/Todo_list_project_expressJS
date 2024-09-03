const express = require('express');
const userRoutes = express.Router();
const {
    registerUser,
    getloginUser,
    userProfile,
    successUser,
    getRegister
} = require('../controller/user.controller');
const passport = require('passport');

userRoutes.get('/register', getRegister);

userRoutes.get('/login', getloginUser);

userRoutes.get('/success', successUser);

userRoutes.get('/profile', userProfile);

userRoutes.post('/register', registerUser);

// userRoutes.post('/login', passport.authenticate('local', {
//     failureRedirect: '/user/login',
//     failureFlash: 'Invalid email or password.',
//     successRedirect: '/user/success',
// }));


userRoutes.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.render('login', { errorMessage: info.message });
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.redirect('/user/success');
        });
    })(req, res, next);
});




module.exports = userRoutes;
