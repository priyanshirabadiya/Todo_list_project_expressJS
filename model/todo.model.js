const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    name : {
        type : String
    },
    completed : {
        type : Boolean,
        default : false
    }
})

module.exports = mongoose.model('taskoftodo' , todoSchema);


