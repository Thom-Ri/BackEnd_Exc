const User = require('../models/user')
const Product = require('../models/products')
const Cart = require('../models/cart')
const db = require('../tools/Data')
const {userDaoMongo} = require('../DAO/userDaoMongo')

class UserService {
    constructor (){
        this.dao = new userDaoMongo
    }

    getAll() {
        return this.dao.getAll()
    }

    
    create(data) {
        return this.dao.create(data)
    }

    
    getOne(id) {
        return this.dao.getOne()
    }

    
    update(id,data) {
        return this.dao.update(id,data)
    }


    delete(id) {
        return this.dao.delete(id)
    }

}

module.exports = {
   UserService
}
