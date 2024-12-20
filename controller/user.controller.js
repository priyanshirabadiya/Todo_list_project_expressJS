const User = require('../model/user.model')
const Todo = require('../model/todo.model');
const bcrypt = require('bcrypt');
const passport = require('passport');
const otpgenerator = require('otp-generator');

exports.getRegister = async (req, res) => {
    try {
        res.render('register');
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
    }
}

exports.getloginUser = async (req, res) => {
    try {
        let error_msg = "none"
        res.render('login', { error_msg });
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
    }
}

exports.successUser = async (req, res) => {
    try {
        res.render('success');
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
    }
}

exports.userProfile = async (req, res) => {
    if (!req.user) {
        return res.redirect('/user/login');
    }
    try {
        let user = await User.findOne({ _id: req.user._id, isDelete: false });
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.render('profile', { user });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
    }
};

exports.registerUser = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email, isDelete: false });
        if (user) {
            return res.json({ message: "User already exists..." });
        }
        let todos = await Todo.find({});
        let hashpassword = await bcrypt.hash(req.body.password, 10); // Ensure this is correct
        user = await User.create({ ...req.body, password: hashpassword });
        return res.render('success', { user }, { todos });
    } catch (error) {
        console.log(error);
        res.json({ message: "Internal server error..." });
    }
};

exports.logoutUser = async (req, res) => {
    try {
        res.redirect('/user/login');
    } catch (error) {
        console.log(error);
        res.json({ message: "Internal server error..." });
    }
}

// validation of email and password 
exports.postLogin = async (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return res.status(500).json({ success: false, message: 'An error occurred during authentication.' });
        if (!user) return res.status(400).json({ success: false, message: "Incorrect email Id or password" });

        req.logIn(user, (err) => {
            if (err) return res.status(500).json({ success: false, message: 'Login failed.' });
            return res.status(200).json({ success: true });
        });
    })(req, res, next);
}
