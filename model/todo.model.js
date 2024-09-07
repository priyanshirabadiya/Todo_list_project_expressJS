const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    name: {
        type: String
    },
    iscompleted: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('taskoftodo', todoSchema);
