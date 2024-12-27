const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    task: {
        type: String
    },
    iscompleted: {
        type: Boolean,
        default: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        require: true
    }
},
    {
        timestamps: true,
        versionKey: false
    })

module.exports = mongoose.model('taskoftodo', todoSchema);
