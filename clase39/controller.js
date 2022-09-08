const User = require('./models/user')
const Product = require('./models/products')
const Cart = require('./models/cart')
const db = require('./Data')

const findUser = (email) =>{
    db
        .then(_ => User.find({ email }))
        .then(user => {
            return user
        })
}
const findUserbyName = (username) =>{
    db
        .then(_ => User.find({ username }))
        .then(user => {
            return user
        })
}

const createNewUser = (usernew) =>{
    const newUser= new User()        
    newUser.name = usernew.username      
    newUser.password = usernew.password    
    newUser.email = usernew.email   
    newUser.adress = usernew.adress    
    newUser.age = usernew.age   
    newUser.phone = usernew.phone
    newUser.save()
}




const findProduct = () =>{
    db
        .then(_ => Product.find({}))
        .then(products =>{
            return products
        })
}
const findCart = () =>{
    db
        .then(_ => Cart.find({}))
        .then(cart =>{
            return cart
        })
}

const findCartbyId = (id) =>{
    db
    .then(_ => Cart.find({_id : id}))
    .then(Cart =>{
        const products = Cart.products 
        return products
    })
    .catch(err => logWarn.warn(`Error: ${err.message}`))
}

module.exports = {
    findUser, findProduct, findCart, findUserbyName,createNewUser,findCartbyId
}