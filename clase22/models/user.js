const mongoose = require('mongoose')

const UserSchema = new Schema({ 
    author: {
        id: {type: String, required: true, max: 100}, 
        nombre: {type: String, required: true, max: 100}, 
        apellido: {type: String, required: true, max: 100}, 
        edad: {type: Number, required: true}, 
        alias: {type: String, required: true, max: 100},
    }
})

const user = mongoose.model('usuarios', UserSchema)

module.export = user