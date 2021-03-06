const express = require (`express`)
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

// EJS
app.set(`view engine`, `ejs`)
app.set("views","views")

app.get('', (req, res) => {
    const contenido = { productos }
    res.render(`pages/productos`, contenido)
})

app.get('/NuevoProducto', (req, res) => {
    const contenido = { productos }
    res.render(`pages/index`, contenido)
})

app.post('/products', (req, res) => {
    const newProduct = {
        title : req.body.title,
        price : req.body.price,
        url : req.body.url
    }
    productos.push(newProduct)
    return res.redirect('/');
})
server.on(`error`, error =>{
    console.log(error)
});
