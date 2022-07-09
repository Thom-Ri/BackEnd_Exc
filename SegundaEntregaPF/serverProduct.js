const express = require (`express`)
const app = express()
const PORT = process.env.PORT || 8080
const { Router } = express
app.set(`view engine`, `ejs`)
app.set("views","views")
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const routerProduct = require('./routers/productRouter')
const routerCart = require('./routers/cartRouter')
app.use(`/api/productos`, routerProduct)
app.use(`/api/carrito`, routerCart)


const server = app.listen(PORT, ()=> {
    console.log("escuchando en el puerto 8080")
});

app.get("",(req,res)=>{
    res.render(`pages/login`)
})
app.post("",(req,res)=>{
    admin = req.params.UserPosition
    res.redirect(`/api/productos`)
})
