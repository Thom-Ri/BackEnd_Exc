const {CartService} = require('../Service/cartService')

class CartController{    
    constructor(){
        this.service = CartService 
    }

    getCarts(){
        return this.service.findCarts()
        .then(carts => res.render("cartsList", {carts}))
    }

    getCartById (req){
        this.service.findCartbyId(req.body.id)
        .then(products =>{
            res.render("cartProducts.ejs", {products})
        })
    }
     

}

module.exports = {
    CartController
}