const express = require('express')
const flash = require('connect-flash')
const dotenv = require('dotenv')
dotenv.config()
const cookieParser = require('cookie-parser')
const session = require('express-session')
const mongoose = require(`mongoose`)
const User = require('./models/user')
const passport = require(`passport`)
const app = express()
const PORT = process.argv[2] || 8080
const {Router} = express


app.set("views","views")
app.set(`view engine`, `ejs`)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cookieParser())
app.use(session({
    secret: process.env.SECRET,
    rolling: process.env.ROLLING,
    resave: process.env.RESAVE,
    saveUninitialized: process.env.SAVEUNINITIALIZED,
    ttl: process.env.TTL
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
const { passLogin, passSign} = require('./passport')


mongoose.connect("mongodb://localhost:27017/clase25")


passport.use('login', passLogin)

passport.use('signup', passSign)

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


app.listen(PORT, (req,res)=>{
    console.log(`Escuchando al servidor ${PORT}`)
})
//  LOGIN
app.get("/login",(req, res)=>{
    res.render("login", {message: req.flash('error')})
})

app.post("/login", passport.authenticate("login", {
    successRedirect: "/home",
    failureRedirect: '/login',
    failureFlash: true
}))  

//  SIGNIN
app.get("/signin",(req, res)=>{
    res.render("signin")
})

app.post("/signin", passport.authenticate("signup", {
    successRedirect: "/home",
    failureRedirect: '/signin',
    failureFlash: true
}))

//  HOME
app.get("/home",(req, res, next)=>{
    return res.render("home")
})

//  INFO

app.get("/info",(req, res)=>{
    const info= {                                        
        path : process.execPath, 
        platform : process.platform,       
        processId : process.pid,
        nodeVer : process.version,                                              
        dir : process.cwd(),
        memory : JSON.stringify(process.memoryUsage())
    }
    res.render("info", info)
})

// API RANDOMS

app.get("/api/random",(req, res)=>{
    
    res.render("random")
})



//  LOGOUT

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






