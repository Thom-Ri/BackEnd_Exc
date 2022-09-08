const express = require('express')
const cluster = require('cluster')
const passport = require(`passport`);
const PORT = process.argv[2] || 8080
const MODO = process.argv[3] || "fork"
const flash = require('connect-flash')
const {Router} = express
const { logInfo, logWarn, logError } = require ('./log4js-Config')
const app = express()
const cookieParser = require('cookie-parser')
const session = require('express-session')
app.use(cookieParser())
app.use(cookieParser())
app.use(session({
    secret: 'shhh',
    rolling: true,
    resave: true,
    saveUninitialized: false,
    ttl: 100000
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(flash())
app.set("views","views")
app.set(`view engine`, `ejs`)
const {findCart, findProduct, findCartbyId} = require('./controller')


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

    app.listen(PORT, (req,res)=>{
        logInfo.info(`escuchando0 al servidor ${PORT}`)
    })
    
    app.get("/login",(req, res)=>{
        res.render("login", {message: req.flash('error')})
    })
    
    app.post("/login", passport.authenticate("login", {
        successRedirect: "/home",
        failureRedirect: '/login',
        failureFlash: true
    }))  
    
    
    app.get("/cart",(req, res)=>{
        findCart()
        .then(carts => res.render("cartsList", {carts}))
    })
    
    app.get("/signin",(req, res)=>{
        res.render("signin")
    })
    
    app.post("/signin", passport.authenticate("signup", {
        successRedirect: "/home",
        failureRedirect: '/signin',
        failureFlash: true
    }))
    
    app.get("/home",(req, res, next)=>{
    //     if(req.isAuthenticated()){
    //         return next()
    //     }
    //     return res.redirect("/login")
    // }, (req, res) => {
            findProduct()
            .then(products => {res.render("home", {products})})
    })


    app.get("/carrito/:id/productos",(req, res, next)=>{
        findCartbyId(req.body.id)
        .then(products =>{ 
            res.render("cartProducts.ejs", {products})
        })
    })

    app.get("/logout",(req, res)=>{
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
