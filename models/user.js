const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    fName: {
        type: String,
        required: true,
    },
    lName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    uCondo: {
        type: String,
        required: false,
    },
    bio: {
        type: String,
        required: false,
    },
    pfp: {
        type: String,
        default: 'https://res.cloudinary.com/dzadlrvwt/image/upload/v1701759808/default-pfp_w4gylk.jpg',
    },
    admin: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model('User', UserSchema);