const express = require (`express`)
const app = express()
const pug = require('pug');
const PORT = 8080
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

const server = app.listen(PORT, ()=> {
    console.log("escuchando en el puerto 8080")
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }))   
app.set("views","views")
app.set("view engine", "pug")


app.get(`/`, (req,res)=>{
  const contenido = { productos }
  res.render(`productos.pug`, contenido)
})

app.get('/NuevoProducto', (req, res) => {
  const contenido = { productos }
  res.render(`index.pug`, contenido)
})

app.post('/producto', (req, res) => {
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
