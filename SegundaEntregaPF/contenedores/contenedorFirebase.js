import db from "../../contenedores/firebaseServer.js"

class ContenedorFirebase {
    constructor(collection){
        this.collection = collection
    }        
    getAll(){
        try{
            const docs = await db.collection(`${this.collection}`).get()
            const carts = docs.docs.map(cart =>{
                return{
                    title: cart.title,
                    ...cart.data()
                }
                return carts
            })
        }catch(e){
            console.log(e)
        }

    }
    getOne(id){
        const doc =  db.collection(`${this.collection}`).doc(id)
        try{
            const response = await doc.get()
            const cart = {
                title : response.title,
                ... response.data()
            }
            return cart
        }catch(e){
            console.log(e)
        }
    }

    create(titulo,fecha,products){     
        try{
            const newCart = db.collection(`${this.collection}`).add({
                title : titulo,
                creation : fecha,
                productos: products
            })
        }catch(e){
            console.log(e)
        }
    }

    update(id,newTitle){
        const doc = db.collection(`${this.collection}`).doc(id)
        try{
            const updatedCart = await doc.update({title:newTitle})
            return updatedCart
        }catch(e){
            console.log(e)
        }
    }
      
    delete(id){
        const doc = db.collection(`${this.collection}`).doc(id)
        try{
            const deletedCart = await doc.delete()
            return console.log(deletedCart.title + "ha sido borrado")
        }catch(e){
            console.log(e)
        }
    }
}

module.exports = ContenedorFirebase