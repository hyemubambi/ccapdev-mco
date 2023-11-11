const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    review: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        required: true,
    },
    dislikes: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('Comment', CommentSchema);