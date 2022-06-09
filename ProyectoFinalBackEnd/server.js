const express = require (`express`)
const app = express()
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

let productos = [
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
    },
    {
      "title": "Cajon huertero",
      "text":"Cajon huertero hecho con madera de Eucaliptus Saligna",
      "price": 2000,
      "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
      "id": 3,
      "code":"BGSO86",
      "Stock":"Disponible",
      "timestamp": "4/5/17"
    },
    {
        "title": "Mesa exhibidora de Frutas",
        "price": 7800,
        "text":"Exhibidor de frutas con 4 compartimientos mas almacenamiento inferior",
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
        "id": 4,
        "code":"PA9REG6",
        "Stock":"Sin Stock",
        "timestamp": "7/8/17"
    },
    {
        "title": "Mesa multifuncion",
        "price": 6000,
        "text":"Mesa multifuncion para taller",
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
        "id": 5,
        "code":"ÑLQ14H",
        "Stock":"Sin Stock",
        "timestamp": "7/8/17"
    },
    {
        "title": "Mesa parrillera",
        "price": 7500,
        "text":"Mesa parrillera de 150x50x90cm hecha con madera de Eucaliptus Saligna",
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
        "id": 6,
        "code":"P2F5G4",
        "Stock":"Sin Stock",
        "timestamp": "10/11/20"
    }

]

let CartContainer=[]
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
    const contenido = { productos }
    res.render(`pages/productos`, contenido)
})

routerProduct.get('/:id', (req, res) => {
    const id = Number(req.params.id)
    const product = productos.find(producto => producto.id === id)
    res.render(`pages/producto.ejs`, {product})

})

routerProduct.post('', (req, res) => {
    const newProduct = {
        title : req.params.title,
        price : req.params.price,
        text : req.params.text,
        id : req.params.id,
        code : req.params.code,
        Stock : req.params.Stock,
        timestamp: Date.now()
    }
    productos.push(newProduct)
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
routerCart.get('/:id/productos', (req, res) => {
    const id = Number(req.params.id)
    const cartIndex = CartContainer.findIndex(cart => cart.id === id)
    const {Product} = CartContainer[cartIndex]
    res.render(`pages/cartProducts.ejs`, {Product})
})

// CARRITO POST

routerCart.post('/:id/productos', (req, res) => {
    const id = Number(req.params.id)
    const cartIndex = CartContainer.findIndex(cart => cart.id === id)
    CartContainer[cartIndex]
    return res.redirect(`/${id}/productos`);
})
routerCart.post('', (req, res) => {
    const newCarrito = {
        id : req.body.id,
        creation : Date.Now(),
        productos: []
    }
    productos.push(CartContainer)
    return res.redirect('/');
})

// CARRITO DELETE

routerProduct.delete('/:id', (req, res) => {
    const id = Number(req.params.id)
    const cartIndex = CartContainer.findIndex(cart => cart.id === id)
    if(cartIndex === -1){
        return console.log("Producto no encontrado")
    }
    CartContainer = CartContainer.filter(cart => cart.id !== id)

    console.log(CartContainer)
})
routerProduct.delete('/:id/productos/:id_prod', (req, res) => {
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




server.on(`error`, error =>{
    console.log(error)
});


