const { Router } = require('express')

const userDaoMongo = require('../DAO/userDaoMongo')
const UserService = require('../Service/UserService')
const UserControllers = require('../Controllers/UserControllers')

const userDao = new userDaoMongo()
const userService = new UserService(userDao)
const userController = new UserControllers(userService)

const userRouter = new Router()

class UserRouter {
  
  constructor(){
    this.controller = userController
  }

  start() {
    cartRouter.get('/:id', this.controller.getOne.bind(this.controller))
    cartRouter.post('/user', this.controller.create.bind(this.controller))
    cartRouter.put('/:id', this.controller.update.bind(this.controller))
    cartRouter.delete('/:id', this.controller.delete.bind(this.controller))

    return userRouter
  }


}

module.exports = UserRouter