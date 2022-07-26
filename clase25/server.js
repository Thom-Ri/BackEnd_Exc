const express = require('express')
const app = express()
const PORT = 8080
const {Router} = express
app.set("views","views")
app.set(`view engine`, `ejs`)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const flash = require('connect-flash')


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

app.use(flash())

const mongoose = require(`mongoose`)
const passport = require(`passport`);
const localStrategy = require(`passport-local`).Strategy
const User = require('./models/user')
const { createHash, isValidPassword } = require('./utils')


mongoose.connect('mongodb://localhost:27017/clase25')

app.use(passport.initialize())
app.use(passport.session())

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
    console.log("searializeUser")
    done(null, user._id)
})

passport.deserializeUser((id, done)=>{
    console.log("desearializeUser")
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
    console.log("servidor servido")
})

app.get("/login",(req, res)=>{
    res.render("login", {message: req.flash('error')})
})

app.post("/login", passport.authenticate("login", {
    successRedirect: "/home",
    failureRedirect: '/login',
    failureFlash: true
}))  

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
    return res.render("home", {email: req.user.email})
})
app.get("/logout",(req, res)=>{
    req.session.destroy(err =>{
      if(err){
        res.send("se ha producido el siguiente error" + err)
      }else{
        console.log("Se ha cerrado la sesion")
        //console.log(`Hasta pronto ${req.session.user}`)
        res.redirect("/login")
      }
    })
})






// Además, se activará un espacio de sesión controlado por la sesión de passport.
// Esta estará activa por 10 minutos y en cada acceso se recargará este tiempo.



