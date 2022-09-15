const { Router } = require('express')

const productDaoMongo = require('../DAO/productDaoMongo')
const  ProdService = require('../Service/prodService')
const   ProdController = require('../Controllers/prodControllers')


const ProdRouter = () => {
  const prodDao = new productDaoMongo()
  const ProductService = new ProdService(prodDao)
  const ProductController = new ProdController(ProductService)
  
  const ProductRouter = new Router()
  
  ProductRouter.get('/home', userController.getAll.bind(userController))

  return ProductRouter

}

module.exports = ProdRouter