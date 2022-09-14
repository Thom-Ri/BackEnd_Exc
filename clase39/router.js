const express = require('express')
const app = express()
const {Router} = express
const cluster = require('cluster')
const MODO = process.argv[3] || "fork"
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set("views","views")
app.set(`view engine`, `ejs`)
const {findCart, findProduct, findCartbyId} = require('./Persistencia')
const { passSingin, passLogin } = require('./Servicio')
const apiRouter = new Router()

if(MODO === "cluster"){
    logInfo.info(`----Número de procesadores: ${numCPUs}`)
    logInfo.info(`----PID MASTER ${process.pid}`)
 
    for (i=0; i< numCPUs; i++){
        cluster.fork()
    }
    cluster.on('exit',(worker,code,signal)=>{
        logInfo.info(`---worker ${worker.process.pid} died`)
    })
}else{
    
    apiRouter.get("/login",(req, res)=>{
        res.render("login", {message: req.flash('error')})
    })
    
    apiRouter.post("/login", passLogin())  

    apiRouter.get("/cart",(req, res)=>{
        findCart()
        .then(carts => res.render("cartsList", {carts}))
    })
    
    apiRouter.get("/signin",(req, res)=>{
        res.render("signin")
    })
    
    apiRouter.post("/signin", passSingin())
  
    apiRouter.get("/home",(req, res, next)=>{
    //     if(req.isAuthenticated()){
    //         return next()
    //     }
    //     return res.redirect("/login")
    // }, (req, res) => {
            findProduct()
            .then(products => {res.render("home", {products})})
    })

    apiRouter.get("/carrito/:id/productos",(req, res, next)=>{
        findCartbyId(req.body.id)
        .then(products =>{ 
            res.render("cartProducts.ejs", {products})
        })
    })

    apiRouter.get("/logout",(req, res)=>{
        req.session.destroy(err =>{
          if(err){
            logError.error(err)
            res.send("se ha producido el siguiente error" + err)
          }else{
            logInfo.info("Se ha cerrado la sesion")
            res.redirect("/login")
          }
        })
    })
}

module.export = {
    apiRouter
}