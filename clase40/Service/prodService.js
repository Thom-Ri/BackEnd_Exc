const Product = require('../models/products')
const {productDaoMongo} = require('../DAO/userDaoMongo')

class ProdService {
    constructor (){
        this.dao = new productDaoMongo
    }
    
    findProducts() {
        return this.dao.findProducts()
    }
    
}
module.exports = {
    ProdService
}