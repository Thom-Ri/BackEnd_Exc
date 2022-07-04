const {Schema, model} = require ('mongoose')

const CartSchema = new Schema({
    title: {type: String, required: true, max: 100},
    creation :{type: Date, required: false, max: 100},
    productos:{type: Array, required: true}
})


module.exports = model('carritos', CartSchema)