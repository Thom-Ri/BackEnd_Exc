const express = require('express')
const {apiRouter} = require('./router')
const PORT = process.argv[2] || 8080
const MODO = process.argv[3] || "fork"
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', apiRouter)

app.listen(PORT, (req,res)=>{
    logInfo.info(`escuchando0 al servidor ${PORT}`)
})
    
    
