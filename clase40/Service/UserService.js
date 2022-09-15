const User = require('../models/user')
const Product = require('../models/products')
const Cart = require('../models/cart')
const db = require('../tools/Data')
const {userDaoMongo} = require('../DAO/userDaoMongo')

class UserService {
    constructor (){
        this.dao = new userDaoMongo
    }

    findUser() {
        return this.dao.findUser()
    } 
 
    findUser (email) {
         return this.dao.find(email)
    }
 
    findUserbyName(username) {
         return this.dao.findUserbyName(username)
    }
 
    createNewUser (newUser) {
        return this.dao.createNewUser(newUser)        
    }
}

module.exports = {
   UserService
}

// module.exports = {
//     findUser, findProduct, findCart, findUserbyName,createNewUser,findCartbyId
// }