const {CartService} = require('../Service/cartService')
const {Cart} = require ('../models/cart')

class CartController{    
    constructor(){
        this.service = CartService 
    }

    getAll() {
        return this.service.getAll()
        .then(carts => {
            if(campo && valor){
                return carts.filter(product => product[campo] === valor)
            }
            return carts
        })
    }

    create(data) {        
        const id = crypto.randomBytes(10).toString('hex')
        const newCart = new Cart(id, data.creation,data.products)
        return this.service.create(newCart)
        .then(_ => res.send("Cart created succesfully"))
    }

    
    getOne(id) {
        return this.service.getOne()
        .then(cart => {
            if(!cart){
                throw new Error ('cart not found')
            }
            return cart
        })
    }

    
    update(id,data) {
        return this.service.update(id,data)
        .then(_ => res.send("Update done successfully"))
    }


    Productdelete(id) {
        return this.service.delete(id)
        .then(_ => res.send("Deletion complete"))
    }

}

module.exports = {
    CartController
}