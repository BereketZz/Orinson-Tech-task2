const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Task name is required!"]
    },
    description: {
        type: String,
        required: [true, "Task description is required!"]
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
    },
    // Reference to the user (Auth model) who created the task
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Auth',
        required: true
    }
}, { 
    timestamps: true  // Automatically handles createdAt and updatedAt
});

// Create and export the Task model
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
