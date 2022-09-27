const { Router } = require('express')

const productDaoMongo = require('../DAO/productDaoMongo')
const  ProdService = require('../Service/prodService')
const   ProdController = require('../Controllers/prodControllers')

const prodDao = new productDaoMongo()
const ProductService = new ProdService(prodDao)
const ProductController = new ProdController(ProductService)

const ProductRouter = new Router()

class ProdRouter{    
  constructor(){
    this.controller = ProductController
  }

  start(){
    ProductRouter.get('/:id', this.controller.getOne.bind(this.controller))
    ProductRouter.post('/product', this.controller.create.bind(this.controller))
    ProductRouter.put('/:id', this.controller.update.bind(this.controller))
    ProductRouter.delete('/:id', this.controller.delete.bind(this.controller))

    return ProductRouter
  }  
}


module.exports = ProdRouter