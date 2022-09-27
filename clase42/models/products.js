const mongoose = require('mongoose')

const Product = mongoose.model('Product', mongoose.Schema({
    title : String,
    price : Number,
    text : String,
    code : String,
    stock : String
}))

module.exports = Product
