const {UserService} = require('../Service/UserService')
const crypto = require('crypto')
const {User} = require('../models/user')

class UserGraphController{    
    constructor(){
        this.service = UserService 
    }

    getAll() {
        return this.service.getAll()
        .then(users => {
            if(campo && valor){
                return users.filter(user => user[campo] === valor)
            }
            return users
        })
    }

    
    create(data) {        
        const id = crypto.randomBytes(10).toString('hex')
        const newUser = new User(id, data.nombre,data.edad,data.email,data.password,data.adress,data.phone)
        return this.service.create(newUser)
        .then(_ => res.send("User created succesfully"))
    }

    
    getOne(id) {
        return this.service.getOne()
        .then(user => {
            if(!user){
                throw new Error ('user not found')
            }
            return user
        })
    }

    
    update(id,data) {
        return this.service.update(id,data)
        .then(_ => res.send("Update done successfully"))
    }


    Userdelete(id) {
        return this.service.delete(id)
        .then(_ => res.send("Deletion complete"))
    }

}

module.exports = {
    UserGraphController
}


