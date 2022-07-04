const db = require('.../Db.js')
const cartModel = require('./models/cart.js')

class ProductoMemoria {
    
    getallCarts(){
        db
        .then(_ =>{
            cartModel.find({})
        })
        .then(cart => {
            return cart
        })
        .catch(err => console.log(`error : ${err.message}`))
        .finally(()=>{ process.exit()})

    }
    getOneCart(id){
        db
        .then(_ =>{
            cartModel.find({
                id: id
            })
        })
        .then(result => {
            return result
        })
        .catch(err => console.log(`error : ${err.message}`))
        .finally(()=>{ process.exit()})
    }

    CreateCart(titulo,fecha,products){     
        const Cart = {
            title: titulo,
            creation : fecha,
            productos : products
        }
        const newCart = new cartModel(Cart)
        db
        .then(_ =>{
            newCart.save()
        })
        .then(console.log("Carrito guardado"))
        .catch(err => console.log(`error : ${err.message}`))
        .finally(()=>{ process.exit()})    
    }

    updateCart(titulo,newTitle){
        db
        .then(_ =>{
            cartModel.updateOne({
                title: titulo
            },{
                $set: {title: newTitle}
            })
        })
        .then(result => {
            console.log(result)
        })
        .catch(err => console.log(`error : ${err.message}`))
        .finally(()=>{ process.exit()})
    }
      
    deleteCart(cartTitle){
        db
        .then(_ =>{
            cartModel.deleteOne({
                title: cartTitle
            })
        })
        .then(result => {
            console.log(result)
        })
        .catch(err => console.log(`error : ${err.message}`))
        .finally(()=>{ process.exit()})
    }
}