const express = require (`express`)
const app = express()
const PORT = 8080
const { engine } = require('express-handlebars')
app.engine('hbs', engine({
    extname: '.hbs', // en lugar de .handlebars
    defaultLayout: `${__dirname}/views/index.hbs`,
    layoutsDir: `${__dirname}/views/layouts`,
    partialsDir: `${__dirname}/views/partials`
})) 


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


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set(`view engine`, `hbs`)
app.set("views","views")



const server = app.listen(PORT, ()=> {
    console.log("escuchando en el puerto 8080")
});


app.get('/', (req, res) => {
    const contenido = { productos }
    return res.render('index.hbs', contenido)
})

app.get('/NuevoProducto', (req, res) => {
    const contenido = { productos }
    return res.render('layouts/form',contenido)
})

app.post('/products', (req, res) => {
    const newProduct = {
        title : req.body.title,
        price : req.body.price,
        url : req.body.url
    }
    productos.push(newProduct)
    res.redirect('/');
})

server.on(`error`, error =>{
    console.log(error)
});
