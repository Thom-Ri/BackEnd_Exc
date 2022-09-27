const Product = require('../models/products')
const {productDaoMongo} = require('../DAO/userDaoMongo')

class ProdService {
    constructor (){
        this.dao = new productDaoMongo
    }
    
    getAll() {
        return this.dao.getAll()
    }

    
    create(data) {
        return this.dao.create(data)
    }

    
    getOne(id) {
        return this.dao.getOne()
    }

    
    update(id,data) {
        return this.dao.update(id,data)
    }


    delete(id) {
        return this.dao.delete(id)
    }

}
module.exports = {
    ProdService
}