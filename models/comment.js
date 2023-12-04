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
        type: mongoose.Schema.Types.ObjectId,  // Change this line
        ref: 'review',
        required: true,
    },
    condo: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
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
    commentPfp: {
        type: String,
        required: true,
    },
    commentFirstName: {
        type: String,
        required: true,
    },
    commentLastName: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Comment', CommentSchema);