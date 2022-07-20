const express = require('express')
const app = express()
const PORT = 8080

const {Router} = express
app.set("views","views")
app.set(`view engine`, `ejs`)
const cookieParser = require('cookie-parser')
const session = require('express-session')

const MongoStore = require('connect-mongo')
app.use(cookieParser())
app.use(session({
    store: MongoStore.create({
        mongoUrl:`mongodb://localhost:27017/sessions`
    }),
    secret: 'shhh',
    resave: false,
    saveUninitialized: false
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

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
    res.render("login")
})
app.post("/login",(req, res)=>{
    const {username,email,password} = req.body
    console.log(users)
    console.log(username)
    console.log(email)
    console.log(password)
    const user = users.find(user => user.username === username && user.password === password)
    console.log(user)
    if(!user){
        return res.send("Debe ingresar un cliente valido")
    }

    req.session.username = username

    return res.render("home", user)
})
app.get("/home",(req, res)=>{
    
    return res.render("home")
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