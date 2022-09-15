const Cart = require('../models/cart')
const {cartDaoMongo} = require('../DAO/userDaoMongo')

class CartService {
    constructor (){
        this.dao = new cartDaoMongo
        
    }

    findCarts() {
        return this.dao.findCarts()
    }

    findCartbyId (id) {
        return this.dao.findCartbyId(id)
    }

}

module.exports = {
    CartService
}