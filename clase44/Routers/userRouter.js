const { Router } = require('express')
const app = express()

const {graphqlHTTP} = require ('express-graphql')
const {buildSchema} = require('graphql')
const crypto = require('crypto')

const userDaoMongo = require('../DAO/userDaoMongo')
const UserService = require('../Service/UserService')
const UserGraphController = require('../Controllers/userGraphController')

const userDao = new userDaoMongo()
const userService = new UserService(userDao)
const userController = new UserGraphController(userService)


app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: {
    userController.getAll()
    userController.getOne(),
    userController.create(),
    userController.update(),
    userController.Userdelete()
  },
  graphiql: true
}))



module.exports = UserRouter