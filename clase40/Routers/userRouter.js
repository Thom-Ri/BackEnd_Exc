const { Router } = require('express')

const userDaoMongo = require('../DAO/CartDaoMongo')
const UserService = require('../Service/UserService')
const UserControllers = require('../Controllers/cartControllers')


const userRouter = () => {
  const userDao = new userDaoMongo()
  const userService = new UserService(userDao)
  const userController = new UserControllers(userService)
  
  const userRouter = new Router()
  userRouter.get('/login')
  userRouter.get('/signin')
  userRouter.post('/login', userController.passLogin.bind(userController))
  userRouter.post('/signin', userController.passSingin.bind(userController))
  userRouter.get('/logout')

  return userRouter

}

module.exports = userRouter