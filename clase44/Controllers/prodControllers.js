const {ProdService} = require('../Service/UserService')
const {Product} = require('../models/products')

class ProdController {
    constructor(){
        this.service = ProdService
    } 

    getAll() {
        return this.service.getAll()
        .then(products => {
            if(campo && valor){
                return products.filter(product => product[campo] === valor)
            }
            return users
        })
    }

    create(data) {        
        const id = crypto.randomBytes(10).toString('hex')
        const newProduct = new Product(id, data.title,data.price,data.text,data.code,data.stock)
        return this.service.create(newProduct)
        .then(_ => res.send("Cart created succesfully"))
    }

    
    getOne(id) {
        return this.service.getOne()
        .then(product => {
            if(!product){
                throw new Error ('user not found')
            }
            return product
        })
    }

    
    update(id,data) {
        return this.service.update(id,data)
        .then(_ => res.send("Update done successfully"))
    }


    Productdelete(id) {
        return this.service.delete(id)
        .then(_ => res.send("Deletion complete"))
    }

}

module.exports = {
    ProdController
 }
 