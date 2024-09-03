const User = require('../model/user.model')
const bcrypt = require('bcrypt');

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
        res.render('login');
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
        let hashpassword = await bcrypt.hash(req.body.password, 10); // Ensure this is correct
        user = await User.create({ ...req.body, password: hashpassword });
        return res.render('success', { user });
    } catch (error) {
        console.log(error);
        res.json({ message: "Internal server error..." });
    }
};


