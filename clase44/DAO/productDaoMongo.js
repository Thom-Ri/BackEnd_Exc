const Product = require('../models/products')
const db = require('../tools/Data')

class productDaoMongo {
    constructor(){
        this.model = Product
    }

    getAll(){
        return this.model.find()
    }

    async createNewUser (newUser) {
        newUser = new this.model()        
        this.model.save()
    }

    create(data){
        data = new this.model()
        this.model.save()
    }

    getOne(id){
        return this.model.find({id})
    }

    update(id,data) {
        newvalues = { "$set": { data } }

        const index = this.model.find({id})
        if(index === -1){
            return new Error('Item not found')
        }
        this.model.update_one(index, data)
    }

    delete(id) {
        const index = this.users.findIndex(user => user.id === id)
        if(index === -1){
            return promise.reject(new Error('Item not found'))
        }
        this.model.deleteOne(index).then(_ =>{ return true})
    }

}

module.export = {
    productDaoMongo
}