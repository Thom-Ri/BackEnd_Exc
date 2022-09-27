const {CartService} = require('../Service/cartService')

class CartController{    
    constructor(){
        this.service = CartService 
    }

    getAll() {
        return this.service.getAll()
        .then(carts => res.send(carts))
    }

    
    create(data) {
        return this.service.create(data)
        .then(_ => res.send("Cart created succesfully"))
    }

    
    getOne(id) {
        return this.service.getOne()
        .then(user => res.send(user))
    }

    
    update(id,data) {
        return this.service.update(id,data)
        .then(_ => res.send("Update done successfully"))
    }


    delete(id) {
        return this.service.delete(id)
        .then(_ => res.send("Deletion complete"))
    }

}

module.exports = {
    CartController
}