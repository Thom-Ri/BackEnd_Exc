const Cart = require('./models/cart')

class cartDaoMongo {
    constructor(){
        this.model = userModel
    }
    
    async findCarts() {
        return this.model.find()
    }

    async findCartbyId (id) {
        this.model.find({_id : id})
        .then(Cart =>{
            const products = Cart.products 
            return products
        })
    }

}
module.export = {
    cartDaoMongo
}