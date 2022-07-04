const db = require('.../Db.js')
const productModel = require('./models/product.js')

class ProductoMemoria {
    
    getallProducts(){
        db
        .then(_ =>{
            productModel.find({})
        })
        .then(users => {
            return users
        })
        .catch(err => console.log(`error : ${err.message}`))
        .finally(()=>{ process.exit()})

    }
    getOneProduct(titulo){
        db
        .then(_ =>{
            productModel.find({
                title: titulo
            })
        })
        .then(result => {
            return result
        })
        .catch(err => console.log(`error : ${err.message}`))
        .finally(()=>{ process.exit()})
    }

    CreateProduct(titulo,precio,texto,codigo,stock){     
        const Product = {
            title : titulo,
            price : precio,
            text: texto,
            code : codigo,
            Stock : stock,
        }
        const newProduct = new productModel(Product)
        db
        .then(_ =>{
            newProduct.save()
        })
        .then(console.log("producto guardado"))
        .catch(err => console.log(`error : ${err.message}`))
        .finally(()=>{ process.exit()})    
    }

    updateProduct(){
        db
        .then(_ =>{
            productModel.updateOne({
                stock: 'Disponible'
            },{
                $set: {stock: 55}
            })
        })
        .then(result => {
            console.log(result)
        })
        .catch(err => console.log(`error : ${err.message}`))
        .finally(()=>{ process.exit()})
    }
      
    deleteProduct(productTitle){
        db
        .then(_ =>{
            productModel.deleteOne({
                username: productTitle
            })
        })
        .then(result => {
            console.log(result)
        })
        .catch(err => console.log(`error : ${err.message}`))
        .finally(()=>{ process.exit()})
    }
}