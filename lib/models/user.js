const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        userName: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    }
)

//middleware

const User = mongoose.model('User', userSchema);

module.exports = User