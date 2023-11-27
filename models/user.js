const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");

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
        default: 'images/default-pfp.jpg',
    },
    admin: {
        type: Boolean,
        default: false,
    },
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);