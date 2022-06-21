const express = require (`express`)
const app = express()
const { Server: HttpServer } = require('http') 
const { Server: IOServer } = require('socket.io') 
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const {options} = require('./options/mariaDB')
const knexModule = require('knex')
const knex = require ('knex')(options)
const PORT = process.env.PORT || 8080
const { Router } = express
const routerProduct = Router()
const routerCart = Router()
app.use(`/api/productos`, routerProduct)
app.use(`/api/carrito`, routerCart)
app.set(`view engine`, `ejs`)
app.set("views","views")
app.use(express.json())
app.use(express.urlencoded({ extended: true }))




const server = app.listen(PORT, ()=> {
    console.log("escuchando en el puerto 8080")
});

let productos = []

let CartContainer=[
    {   id : 1,
        creation : 15-6-22,
        productos: [
            {
                "title": "Pizarron comercial",
                "price": 1600,
                "text":"Pizarron de dos aguas para uso comercial",
                "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
                "id": 1,
                "code":"OASFR67",
                "Stock":"Disponible",
                "timestamp": "3/4/16"
              },
              {
                "title": "Estanteria",
                "price": 7500,
                "text":"Estanteria de 5 pisos para almacenar variedad de productos",
                "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
                "id": 2,
                "code":"LKA6SE4",
                "Stock":"Disponible",
                "timestamp": "4/6/16"
              }
        ]
    }
]
let admin = false

app.get("",(req,res)=>{
    res.render(`pages/login`)
})
app.post("",(req,res)=>{
    admin = req.params.UserPosition
    res.redirect(`/api/productos`)
})




// PRODUCTO
routerProduct.get('', (req, res) => {

    knex.from('productos').select('*')
    .then(products =>{
        productos.push(products)
        console.log(products)
        res.render(`pages/productos`, {products})
    }).catch(err => console.log("hubo un error"))
})

routerProduct.get('/:id', (req, res) => {
    const myId = Number(req.params.id)
    knex.from('productos').select('*')
    .where({id: myId} )
    .then(product =>{
        res.render(`pages/producto.ejs`, {product})
    }).catch(err => console.log("hubo un error"))
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
    productos.push(newProduct)
    console.log(newProduct)
    return res.redirect(`/api/productos`);
})

routerProduct.put('/:id', (req, res) => {
    const id = Number(req.params.id)
    const productIndex = productos.findIndex(producto => producto.id === id)
    if(productIndex === -1){
        return alert ("Producto no encontrado")
    }
    productos[productIndex].title= req.params.title
    productos[productIndex].price= req.params.price
    productos[productIndex].text= req.params.text
    productos[productIndex].code= req.params.code 
    productos[productIndex].Stock= req.params.Stock

    res.redirect(`/api/productos/${id}`)
})

routerProduct.delete('/:id', (req, res) => {
    const id = Number(req.params.id)
    const productIndex = productos.findIndex(producto => producto.id === id)
    if(productIndex === -1){
        return alert ("Producto no encontrado")
    }

    productos = productos.filter(producto => producto.id !== id)

    console.log(productos)
})

// CARRITO
routerCart.get('', (req, res) => {
    res.render(`pages/cartsList.ejs`, {CartContainer})
})

routerCart.get('/:id/productos', (req, res) => {
    const id = Number(req.params.id)
    const cartIndex = CartContainer.findIndex(cart => cart.id === id)
    console.log (CartContainer[cartIndex].productos)
    const Products =  CartContainer[cartIndex].productos
    res.render(`pages/cartProducts.ejs`, {Products, id})
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
    CartContainer.push(newCarrito)
    return res.redirect(`/api/carrito`);
})

routerCart.post('/:id/productos', (req, res) => {
    console.log("se ha hecho un post")
    const id = Number(req.params.id)
    const newProductId = req.params.addProduct.value
    console.log("este es el producto nuevo: " + newProductId)
    const newProduct = productos.find(producto => producto.id === newProductId)
    const cartIndex = CartContainer.findIndex(cart => cart.id === id)
    CartContainer[cartIndex].push(newProduct)
    return res.redirect(`api/carrito/${id}/productos`);
})

routerCart.delete('/:id', (req, res) => {
    const id = Number(req.params.id)
    const cartIndex = CartContainer.findIndex(cart => cart.id === id)
    if(cartIndex === -1){
        return console.log("Producto no encontrado")
    }
    CartContainer = CartContainer.filter(cart => cart.id !== id)

    console.log(CartContainer)
})
routerCart.delete('/:id/productos/:id_prod', (req, res) => {
    const id = Number(req.params.id)
    const id_prod = Number(req.params.id_prod)
    const cartIndex = CartContainer.findIndex(cart => cart.id === id)
    if(cartIndex === -1){
        return console.log("Carrito no encontrado")
    }
    if(Delproduct === -1){
        return console.log("Producto no encontrado")
    }
    CartContainer[cartIndex] = CartContainer[cartIndex].filter(product => product.id !== id_prod )
    console.log(CartContainer[cartIndex])
})


// CHAT

app.get('/chat', (req, res) => {
    res.render('pages/helpChat')
})

io.on(`connection`, function (socket){
    console.log(`Se ha conectaco el usuario ${socket.it}`);
    socket.emit(`Bienvenida`, `Bienvenido ${socket.id}`);

    socket.on('new-message',data => {
        const now = new Date()
        knex('chat')
        .insert([
            {text: data.text},
            {user: data.author}
        ])
        .then(
            knex.from(chat).select('*')
            .then(mensajes =>{
                io.sockets.emit('mensajes', mensajes);
            })
        ).catch("hubo un error con el chat")
    });
});


server.on(`error`, error =>{
    console.log(error)
});
