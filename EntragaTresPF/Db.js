const mongoose = require('mongoose')
const URL= 'mongodb+srv://Thom:coder123@herokuproject.5gh2g8h.mongodb.net/?retryWrites=true&w=majority'

const connection = mongoose.connect(URL,{
}).then(_ => console.log('aplicación conectada a MongoDB Atlas'))

module.exports = connection