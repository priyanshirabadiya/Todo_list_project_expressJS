let Todo = require('../model/todo.model');

exports.successTodoAll = async (req, res) => {
    try {
        console.log("login user is:", req.user._id);
        if (!req.user) {
            return res.status(401).send("Unauthorized: User not logged in");
        }
        const todos = await Todo.find({ userId: req.user._id });
        console.log("Todos are : ", todos);
        res.render('success', { todos, user: req.user }); // Pass user and todos

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error.");
    }
};

exports.createTodo = async (req, res) => {
    try {
        // console.log("what req.body get:", req.body);
        if (!req.user) {
            return res.status(401).send("Unauthorized: User not logged in");
        }
        const userId = req.user._id; // Get userId from req.user
        // Add userId to the task
        let todo = await Todo.create({ task: req.body.task, userId: userId });
        res.redirect('/user/successM'); // Redirect to success page
    } catch (error) {
        console.log(error);
        res.send("Internal server error...");
    }
};

exports.updatedTodo = async (req, res) => {
    console.log("PUT route hit");
    const { id } = req.params;
    const { name } = req.body;
    console.log("Params:", req.params);
    console.log("Body:", req.body);
    try {
        const updatedTask = await Todo.findByIdAndUpdate(id, { task: name }, { new: true });
        if (updatedTask) {
            console.log('task updated');
            res.status(200).json({ success: true, Todo: updatedTask });
        } else {
            res.status(404).json({ success: false, message: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update task', error });
    }
}

exports.deleteTodo = async (req, res) => {
    try {
        let todoId = req.params._id;
        let deltodo = await Todo.findByIdAndDelete(todoId);
        if (deltodo) {
            res.status(200).json({ success: true, message: 'Task deleted successfully' });
        } else {
            res.status(404).json({ success: false, message: 'Task not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error..." });
    }
};
