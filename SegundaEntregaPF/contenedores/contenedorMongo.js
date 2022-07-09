const db = require('../Db')

class ContenedorMongo {
    
    constructor(model){
        this.model = model
    }


    getAll(){
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
    getOne(id){
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

    create(titulo,fecha,products){     
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

    update(titulo,newTitle){
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
      
    delete(cartTitle){
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

module.exports = ContenedorMongo