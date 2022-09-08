const mongoose = require('mongoose')

const Cart = mongoose.model('Cart', mongoose.Schema({
    creation : String,
    products : Array 
}))

module.exports = Cart
