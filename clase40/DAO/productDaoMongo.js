const Product = require('./models/products')

class productDaoMongo {
    constructor(){
        this.model = userModel
    }
    
    async findProducts() {
        return this.model.find()
    }
    

}

module.export = {
    productDaoMongo
}