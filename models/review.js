const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    condo: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
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
    photos: {
        type: [String],
        validate: {
            validator: function (array) {
                return array.length <= 4;
            },
            message: 'Too many photos, maximum is 4.',
        },
    },
    reviewPfp: {
        type: String,
        required: true,
    },
    reviewFirstName: {
        type: String,
        required: true,
    },
    reviewLastName: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Review', ReviewSchema);