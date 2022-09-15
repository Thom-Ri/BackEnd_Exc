const {ProdService} = require('../Service/UserService')

class ProdController {
    constructor(){
        this.service = ProdService
    } 
    
    GetProducts(){
        this.service.findProduct()
        .then(products => {res.render("home", {products})})
    }
    

}

module.exports = {
    ProdController
 }
 