const ContenedorMongo = require('../../contenedores/contenedorMongo.js')
const Product = require('models/product')

class ProductDaoMongo extends ContenedorMongo{
    constructor(){
        super(Product)
    }    
}

module.exports = ProductDaoMongo
