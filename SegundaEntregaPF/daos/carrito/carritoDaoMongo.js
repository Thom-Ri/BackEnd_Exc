const db = require('.../Db.js')
const ContenedorMongo = require('../../contenedores/contenedorMongo.js')
const cartModel = require('./models/cart.js')

class CartDaoMongo extends ContenedorMongo{
    constructor(){
        super(cartModel)
    }    
}

module.exports = CartDaoMongo