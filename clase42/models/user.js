const mongoose = require('mongoose')

const User = mongoose.model('User', mongoose.Schema({
    email : String,
    password : String,
    name : String,
    adress: String,
    age: Number,
    phone: Number
}))

module.exports = User