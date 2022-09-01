const express = require('express')
const app = express()
const PORT = 8080
const passport = require(`passport`);
const flash = require('connect-flash')
const User = require('./models/user')
const Product = require('./models/products')
const Cart = require('./models/cart')
const localStrategy = require(`passport-local`).Strategy
const db = require('./Db')
app.use(passport.session())

const {Router} = express
const { createHash, isValidPassword } = require('./utils')
const { logInfo, logWarn, logError } = require ('./log4js-Config')

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

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(flash())
 app.use(passport.initialize())


app.set("views","views")
app.set(`view engine`, `ejs`)

passport.use('login', new localStrategy((username, password, done) =>{
    return User.findOne({ username })
    .then(user =>{
        if(!user) {
            return done(null, false, {message : 'nombre de usuario incorrecto'})
        }
        return done(null,user)
        if(!isValidPassword(user.password, password)){
            return done (null, false, {message: 'contraseña incorrecta'})
        }
    })
    .catch(err =>done(err))
    
}))

passport.use('signup', new localStrategy({
  passReqToCallback: true  
},(req,username,password,done) =>{
    return User.findOne({ username })
    .then(user =>{
        if(user) {
            return done(null, false, {message : 'nombre de usuario ya existente'})
        }
        const newUser= new User()
        newUser.username = username
        newUser.password = createHash(password) 
        newUser.email = req.body.email

        return newUser.save()
    })
    .then(user =>(null,user))
    .catch(err =>done(err))
}))

passport.deserializeUser((user, done)=>{
    logInfo.info("searializeUser")
    done(null, user._id)
})

passport.deserializeUser((id, done)=>{
    logInfo.info("desearializeUser")
    User.findById(id, (err,user)=>{
        done(err, user)
    })
})


const users = [
    {
        username: "Tomas",
        email: "mune.thom2@gmail.com",
        password: "coder123",
        
    },
    {
        username: "Gonzalo",
        email: "coderTutor@gmail.com",
        password: "coder1234"
    }
]

app.listen(PORT, (req,res)=>{
    logInfo.info("servidor servido")
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
    if(req.isAuthenticated()){
        return next()
    }
    return res.redirect("/login")
}, (req, res) => {
        db
        .then(_ => Product.find({}))
        .then(products => res.render("home", {products}))
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
