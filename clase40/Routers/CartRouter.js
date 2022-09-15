const { Router } = require('express')

const cartDaoMongo = require('../DAO/CartDaoMongo')
const CartService = require('../Service/cartService')
const CartController = require('../Controllers/cartControllers')


const CartRouter = () => {
  const cartDao = new  cartDaoMongo()
  const cartService = new CartService(cartDao)
  const cartController = new  CartController(cartService)
  
  const cartRouter = new Router()
  
  cartRouter.get('/cart', cartController.getCarts.bind(cartController))
  cartRouter.get('/:id/productos', cartController.getCartById.bind(cartController))
    

  return cartRouter

}

module.exports = CartRouter