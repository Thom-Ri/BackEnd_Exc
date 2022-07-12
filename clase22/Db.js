const mongoose = require('mongoose');
const URL = "mongodb://localhost:27017/clase22"

const connection = mongoose.connect(URL, {
    useNewUrlParser:true
})

module.export = connection
