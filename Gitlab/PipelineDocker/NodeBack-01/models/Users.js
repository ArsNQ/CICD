const Joi = require('joi');
const mongoose = require('mongoose');

const Users = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        maxlength: 50,
        unique: false
    },
    lastName: {
        type: String,
        required: true,
        maxlength: 50,
        unique: true
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    level: {
        type: String,
        required: false
    },
    age: {
        type: Number,
        required: false
    },
    occupation: {
        type: String,
        required: false
    },
    hobbies: {
        type: String,
        required: false
    },
    wishes: {
        type: String,
        required: false
    },
    accountType: {
        type: String,
        default: 'Student',
        required: true
    },
    pictureTeacher: {
        type: String,
        required: false
    }
});

function validateUser(user) {
    const schema = Joi.object({
        firstName: Joi.string().max(50).required(),
        lastName: Joi.string().max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });
    return schema.validate(user);
}

module.exports = mongoose.model('users', Users);
