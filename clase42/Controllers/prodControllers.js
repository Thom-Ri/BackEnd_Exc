const {ProdService} = require('../Service/UserService')

class ProdController {
    constructor(){
        this.service = ProdService
    } 

    getAll() {
        return this.service.getAll()
        .then(products => res.send(products))
    }

    
    create(data) {
        return this.service.create(data)
        .then(_ => res.send("product created succesfully"))
    }

    
    getOne(id) {
        return this.service.getOne()
        .then(product => res.send(product))
    }

    
    update(id,data) {
        return this.service.update(id,data)
        .then(_ => res.send("Update done successfully"))
    }


    delete(id) {
        return this.service.delete(id)
        .then(_ => res.send("Deletion complete"))
    }

}

module.exports = {
    ProdController
 }
 