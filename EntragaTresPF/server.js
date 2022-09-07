const express = require('express')
const cluster = require('cluster')
const PORT = process.argv[2] || 8080
const MODO = process.argv[3] || "fork"
const passport = require(`passport`);
const flash = require('connect-flash')
const User = require('./models/user')
const Product = require('./models/products')
const Cart = require('./models/cart')
const localStrategy = require(`passport-local`).Strategy
const db = require('./Db')

const {Router} = express
const { createHash, isValidPassword } = require('./utils')
const { logInfo, logWarn, logError } = require ('./log4js-Config')
const {sendSMS} = require('./twilio')
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

passport.use('login', new localStrategy((email, password, done) =>{ 
    return User.findOne({ email })
    .then(user =>{
        if(!user) {
            return done(null, false, {message : 'nombre de usuario incorrecto'})
        }
        if(!isValidPassword(user.password, password)){
            return done (null, false, {message: 'contraseña incorrecta'})
        }
        return done(null,user)
    })
    .catch(err =>{
        done(err)
    })
    
}))

passport.use('signup', new localStrategy({
  passReqToCallback: true  
},(req,username,password,done) =>{
    return User.findOne({ username })
    .then(user =>{
        if(user.name == username) {
            return done(null, false, {message : 'nombre de usuario ya existente'})
        }
        const newUser= new User()        
        newUser.name = username      
        newUser.password = createHash(password)    
        newUser.email = req.body.email   
        newUser.adress = req.body.adress    
        newUser.age = req.body.age   
        newUser.phone = req.body.phone
        newUser.save(req.body.phone)
        sendSMS()
        .then(_ => {
            logInfo.info("funciono el save")
            
        })
    })
    .then(user =>(null,user))
    .catch(err => {
        done(err)
    })
}))

passport.serializeUser((user, done)=>{
    logInfo.info("searializeUser")
    done(null, user._id)
})

passport.deserializeUser((id, done)=>{
    logInfo.info("desearializeUser")
    User.findById(id, (err,user)=>{
        done(err, user)
    })
})


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
        db
        .then(_ => Cart.find({}))
        .then(carts => res.render("cartsList", {carts}))
        .catch(err => logWarn.warn(`Error: ${err.message}`))
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
            db
            .then(_ => Product.find({}))
            .then(products => res.render("home", {products}))
            .catch(err => logWarn.warn(`Error: ${err.message}`))
    })


    app.get("/carrito/:id/productos",(req, res, next)=>{
        db
        .then(_ => Cart.find({_id : req.body.id}))
        .then(Cart =>{
            const products = Cart.products 
            res.render("cartProducts.ejs", {products})
        })
        .catch(err => logWarn.warn(`Error: ${err.message}`))
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
