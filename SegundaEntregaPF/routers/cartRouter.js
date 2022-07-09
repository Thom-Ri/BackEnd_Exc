const express = require (`express`)
const app = express()
const PORT = process.env.PORT || 8080
const { Router } = express
const routerCart = Router()
app.set(`view engine`, `ejs`)
app.set("views","views")
const {cart : cartStorage} = require ('../daos')()

routerCart.get('', (req, res) => {
    return cartStorage.getAll()
    .then(carts =>{
        console.log(carts)
        res.render(`pages/cartsList.ejs`, {carts})
    })
})

routerCart.post('/', (req, res) => {
    const newCarrito = {
        id : CartContainer.length + 1,
        creation : new Date(),
        productos: [
            {
                "title": "Mesa multifuncion",
                "price": 6000,
                "text":"Mesa multifuncion para taller",
                "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
                "id": 5,
                "code":"ÑLQ14H",
                "Stock":"Sin Stock",
                "timestamp": "7/8/17"
            }
        ]
    }
    cartStorage.create(newCarrito)
    .then(_ =>{
        res.redirect(`/api/carrito`);;
    }) 
})


routerCart.get('/:id/productos', (req, res) => {
    const id = Number(req.params.id)
    return cartStorage.getOne(id)
    .then(cart =>{
        console.log(cart)
        res.render(`pages/cartProducts.ejs`, {cart, id})
    })
})


routerCart.delete('/:id', (req, res) => {
    const id = Number(req.params.id)
    return cartStorage.delete(id)
    .then(cart =>{
        console.log(cart.title + " ha sido eliminado")
        
    })   
})


module.export = routerCart