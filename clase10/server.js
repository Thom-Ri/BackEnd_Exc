const fs = require('fs')
const express = require (`express`)
const { Router } = express
const router= Router()
const app = express()
const PORT = 8080

const server = app.listen(PORT, ()=> {
    console.log("escuchando en el puerto 8080")
});
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const productos = [
    {
      "title": "Escuadra",
      "price": 123.45,
      "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
      "id": 1
    },
    {
      "title": "Calculadora",
      "price": 234.56,
      "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
      "id": 2
    },
    {
      "title": "Globo Terráqueo",
      "price": 345.67,
      "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
      "id": 3
    }
]
   

// PUG
// app.set("views","/views")
// app.set("view engine", "pug")
//  router.get(`/`, (res,req)=>{
//     res.render(`/productos.pug`,{ contenido : productos })
// })
// router.get('/NuevoProducto', (req, res) => {
//     res.render(`/index.pug`,{ contenido : productos})
// })                                                                                                 
// router.post('/NuevoProducto', (req, res) => {
//     const {newProduct} = req.body
//     productos.push(newProduct)
//     res.status(200).json(newProduct);
//     res.redirect('/productos');
// })


// EJS
app.set(`view engine`, `ejs`)

router.get('', (req, res) => {
    res.render(`pages/productos`,{
        contenido : productos
    })
})


router.get('/NuevoProducto', (req, res) => {
    res.render(`pages/index`,{
        contenido : productos
    })
})


router.post('/NuevoProducto', (req, res) => {
    const {newProduct} = req.body
    productos.push(newProduct)
    res.status(200).json(newProduct);
    res.redirect('/productos');
})


server.on(`error`, error =>{
    console.log(error)
});

app.use(`/productos`, router)
