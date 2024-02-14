const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Email must be given"],
        unique: [true, "Email should be unique"],
    },
    password: {
        type: String,
        required: true,
    },
    balance: {type: Number,default: 1000}

});

const User = mongoose.model('User', userSchema);

module.exports = User;