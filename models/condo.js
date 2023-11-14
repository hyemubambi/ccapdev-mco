const mongoose = require('mongoose');

const CondoSchema = new mongoose.Schema({
    cName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    lRange: {
        type: Number,
        required: true,
    },
    hRange: {
        type: Number,
        required: true,
    },
    nReviews: {
        type: Number,
        default: 0,
    },
    rating: {
        type: Number,
        default: 0,
    },
    photo: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Condo', CondoSchema);