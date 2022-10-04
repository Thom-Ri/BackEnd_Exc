const Cart = require('../models/cart')
const {cartDaoMongo} = require('../DAO/userDaoMongo')

class CartService {
    constructor (){
        this.dao = new cartDaoMongo
        
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
    CartService
}





