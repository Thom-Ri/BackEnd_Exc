const mongoose = require('mongoose')

const msgSchema = new Schema({ 
    author: {
        id: {type: String, required: true, max: 100}, 
        nombre: {type: String, required: true, max: 100}, 
        apellido: {type: String, required: true, max: 100}, 
        edad: {type: Number, required: true}, 
        alias: {type: String, required: true, max: 100},
        
    },
    text: {type: String, required: true, max: 300}
})

export const msg = mongoose.model('mensajes', msgSchema)