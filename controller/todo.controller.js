let Todo = require('../model/todo.model');

exports.getAllTodo = async (req, res) => {
    try {   
        let todos = await Todo.find({});
        return res.send(todos);
    } catch (error) {
        console.log(error);
        res.send("Internal server error..");
    }
}

exports.createTodo = async (req, res) => {
    try {
        await Todo.create(req.body);
        res.send("Added success...");
    } catch (error) {
        console.log(error);
        res.send("Internal server error...");
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
        return res.send("Updated successfully...");
    } catch (error) {
        console.log(error);
        res.send("Internal server error..");
    }
}

exports.deleteTodo = async (req, res) => {
    try {
        let todoId = req.params._id;
        let deltodo = await Todo.findByIdAndUpdate(todoId, { isCompleted: true }, { new: true });
        if (!deltodo) {
            return res.status(404).send("Todo task is not found...");
        }
        return res.send("Task deleted successfully..");
    } catch (error) {
        console.log(error);
        res.send("internal server error...");
    }
}

