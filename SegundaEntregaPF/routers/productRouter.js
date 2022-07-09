const express = require (`express`)
const app = express()
const PORT = process.env.PORT || 8080
const { Router } = express
const routerProduct = Router()
app.set(`view engine`, `ejs`)
app.set("views","views")

const {product : productStorage} = require ('../daos')()


// PRODUCTO
routerProduct.get('', (req, res) => {
    return productStorage.getAll()
    .then(products =>{
        console.log(products)
        res.render(`pages/productos`, {products})
    })
})

routerProduct.get('/:id', (req, res) => {
    const myId = Number(req.params.id)
    return productStorage.getOne(myId)
    .then(product =>{
        console.log(product)
        res.render(`pages/productos`, {product})
    })
})

routerProduct.post('', (req, res) => {
    const newProduct = {
        title : req.params.title,
        price : req.params.price,
        text : req.params.text,
        id : productos.length + 1,
        code : req.params.code,
        Stock : req.params.Stock,
        timestamp: Date.now()
    }
    productStorage.create(newProduct)
    .then(_ =>{
        res.redirect(`/api/productos`);
    })
    
})

// routerProduct.put('/:id', (req, res) => {
//     const id = Number(req.params.id)
//     const productIndex = productos.findIndex(producto => producto.id === id)
//     if(productIndex === -1){
//         return alert ("Producto no encontrado")
//     }
//     productos[productIndex].title= req.params.title
//     productos[productIndex].price= req.params.price
//     productos[productIndex].text= req.params.text
//     productos[productIndex].code= req.params.code 
//     productos[productIndex].Stock= req.params.Stock

//     res.redirect(`/api/productos/${id}`)
// })

routerProduct.delete('/:id', (req, res) => {
    const id = Number(req.params.id)
    return productStorage.delete(myId)
    .then(product =>{
        console.log(product.title + " ha sido eliminado")
        
    })    
})

module.exports = routerProduct