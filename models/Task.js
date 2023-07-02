const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: [true, 'Title must be unique'],
        trim: true,
        required: [true,'Tilte is required']
    },

    description: {
        type: String,
        minlength: [30, 'should be atleast 30 characters']
    },

    status:{
        type: String,
        enum: {
            values: [
                'todo',
                'progress',
                'done',
            ], 
            message: 'Please select status from (todo, progress, done)'
        },
        default:'todo'
    },

    date: {
        type: Number,
    },

    user: {
        type: mongoose.Schema.ObjectId,
        required: true
    }
})

module.exports = mongoose.model('tasks',taskSchema)

