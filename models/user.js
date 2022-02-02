
// 1. Required dependencies
const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

// 2. Create the schema 

const userSchema = new Scheme({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

//3. Create the model
const User = mongoose.model('User', userSchema);
module.exports = User;