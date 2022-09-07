const mongoose = require('mongoose')
const URL= 'mongodb+srv://Thom:coder123@herokuproject.5gh2g8h.mongodb.net/?retryWrites=true&w=majority'
const { logInfo } = require ('./log4js-Config')

const connection = mongoose.connect(URL,{
}).then(_ => logInfo.info('aplicación conectada a MongoDB Atlas'))

module.exports = connection