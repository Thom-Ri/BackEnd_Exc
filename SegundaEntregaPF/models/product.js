const {Schema, model} = require ('mongoose')

const productSchema = new Schema({
    title: {type: String, required: true, max: 100},
    price: {type: Number, required: true},
    text: {type: String, required: true, max: 400},
    code: {type: String, required: true, max: 10},
    stock:{type: Number, required: true} 
})

 

module.exports = model('Product', productSchema)