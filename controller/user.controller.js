const User = require('../model/user.model')
const Todo = require('../model/todo.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

exports.loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email, isDelete: false });
        if (!user) {
            res.send({ message: "User not found..." });
        }
        let comparepassword = await bcrypt.compare(req.body.password, user.password)
        console.log(comparepassword);
        if (!comparepassword) {
            res.send("Email or password does not match...");
        }

        const todos = await Todo.find({});
        res.render('success', { todos });

    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error ..." })
    }
}

exports.userProfile = async (req, res) => {
    if (!req.user) {
        return res.redirect('/user/login');
    }
    try {
        let user = await User.findOne({ userId: req.query._id, isDelete: false })
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.redirect('profile', { user });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
    }
};

// ------------------------------------------------------- all about todo list -------------------------------------------------------

// create todo list
exports.createTodo = async (req, res) => {
    try {
        await Todo.create(req.body);
        res.redirect('/user/success');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while adding a new todo.');
    }
}

// get all data from Todo database
exports.alltodoTasks = async (req, res) => {
    try {
        const todos = await Todo.find({});
        res.render('success', { todos }); // passing todos to the ejs
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching todos.');
    }
}

// update todo list
exports.updateTodo = async (req, res) => {
    try {
        const todoId = req.params.id;
        const updatedTodo = await Todo.findByIdAndUpdate(todoId, { name: req.body.name }, { new: true });
        if (!updatedTodo) {
            return res.status(404).send('Todo item not found.');
        }
        res.redirect('/user/success');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while updating the todo.');
    }
};


// delete todo list
exports.deleteTodo = async (req, res) => {
    try {
        const todoId = req.params.id;
        const deletedTodo = await Todo.findByIdAndDelete(todoId);
        if (!deletedTodo) {
            return res.status(404).send('Todo item not found.');
        }
        res.status(200).send('Todo item deleted successfully.');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while deleting the todo.');
    }
}


