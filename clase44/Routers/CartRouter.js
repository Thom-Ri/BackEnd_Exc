const { Router } = require('express')

const cartDaoMongo = require('../DAO/CartDaoMongo')
const CartService = require('../Service/cartService')
const CartController = require('../Controllers/cartControllers')

const cartDao = new  cartDaoMongo()
const cartService = new CartService(cartDao)
const cartController = new  CartController(cartService)

const cartRouter = new Router()

class CartRouter{    
  constructor(){
    this.controller = cartController 
  }

  start(){
    cartRouter.get('/:id', this.controller.getOne.bind(this.controller))
    cartRouter.post('/cart', this.controller.create.bind(this.controller))
    cartRouter.put('/:id', this.controller. update.bind(this.controller))
    cartRouter.delete('/:id', this.controller.delete.bind(this.controller))

    return cartRouter
  }
  
}


module.exports = CartRouter