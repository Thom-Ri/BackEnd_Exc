const express = require('express')
const cors = require('cors')
const {NODE_ENV, HOST, PORT} = require('./config')
const { logInfo } = require ('./tools/log4js-Config')
const UserRouter = require('./Routers/userRouter')
const ProdRouter = require('./Routers/prodRouter')
const CartRouter = require('./Routers/CartRouter')

const app = express()

 if (NODE_ENV === "Development"){app.use(cors())}
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const MODO = process.argv[3] || "fork"

const userRouter = new UserRouter 
const prodRouter = new ProdRouter
const cartRouter = new CartRouter
 


app.listen(PORT, (req,res)=>{
    logInfo.info(`escuchando0 al servidor ${PORT}`)
})

app.use('/usuarios', userRouter.start())

app.use('/productos', prodRouter.start())

app.use('/Carrito', cartRouter.start())   








// app.use('/apiUser', userRouter)
// app.use('/apiProd', ProdRouter)
// app.use('/apiCart', CartRouter)

    



