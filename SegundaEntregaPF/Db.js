import mongoose from 'mongoose';
const URL = "mongodb://localhost:27017/ecpf"

const connection = mongoose.connect(URL, {
    useNewUrlParser:true
})

module.export = connection