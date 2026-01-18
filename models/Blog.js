const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    body: {
        type: String,
        required: [true, 'Body is required']
    },
    author: {
        type: String,
        default: 'Anonymous',
        trim: true
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt
});

module.exports = mongoose.model('Blog', blogSchema);