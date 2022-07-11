const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
    summary: String,
    description: String,
    dueDate: Date,
    isCompleted: {type: Boolean, default: false},
    priority: Number
})

const Todo  = mongoose.model('todos', TodoSchema);

module.exports = Todo;