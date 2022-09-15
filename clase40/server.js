const express = require('express')
const app = express()
const {userRouter} = require('./Routers/userRouter')
const {ProdRouter} = require('./Routers/prodRouter')
const {CartRouter} = require('./Routers/CartRouter')
const PORT = process.argv[2] || 8080
const MODO = process.argv[3] || "fork"
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set("views","views")
app.set(`view engine`, `ejs`)
const { logInfo } = require ('./tools/log4js-Config')

app.use('/apiUser', userRouter)
app.use('/apiProd', ProdRouter)
app.use('/apiCart', CartRouter)

app.listen(PORT, (req,res)=>{
    logInfo.info(`escuchando0 al servidor ${PORT}`)
})

    
    



