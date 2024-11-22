let Todo = require('../model/todo.model');

exports.successTodoAll = async (req, res) => {
    try {
        const todos = await Todo.find({});
        // console.log(todos);
        res.render('success', { todos });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error.");
    }
};

exports.createTodo = async (req, res) => {
    try {
        await Todo.create({ name: req.body.name });
        res.redirect('/user/successM');
    } catch (error) {
        console.log(error);
        res.send("Internal server error...");
    }
}

exports.updatedTodo = async (req, res) => {
    console.log("PUT route hit");
    const { id } = req.params;
    const { name } = req.body;
    console.log("Params:", req.params);
    console.log("Body:", req.body);
    try {
        const updatedTask = await Todo.findByIdAndUpdate(id, { name: name }, { new: true });
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

exports.updateTodo = async (req, res) => {
    try {
        let todoId = req.params._id;
        console.log(todoId, "ID IS THIS");
        let updatedTodo = await Todo.findByIdAndUpdate(todoId, { name: req.body.name }, { new: true });
        if (!updatedTodo) {
            return res.status(404).send('Todo not found..');
        }
        return res.redirect('/successM');
        // return res.send("Updated successfully...");

    } catch (error) {
        console.log(error);
        res.send("Internal server error..");
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
