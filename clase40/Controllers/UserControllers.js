const express = require('express')
const app = express()
const passport = require(`passport`);
const flash = require('connect-flash')
const {sendSMS} = require('./tools/twilio') 
const localStrategy = require(`passport-local`).Strategy
const { createHash, isValidPassword } = require('./tools/utils')
const { logInfo } = require ('./tools/log4js-Config')
const cookieParser = require('cookie-parser')
app.use(cookieParser())
const session = require('express-session')
app.use(session({
    secret: 'shhh',
    rolling: true,
    resave: true,
    saveUninitialized: false,
    ttl: 100000
}))
app.use(passport.session())
app.use(passport.initialize())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const {UserService} = require('../Service/UserService')

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


class UserController {

    constructor(){
        this.service = UserController 
    } 

    passLogin () {
        new localStrategy((email, password, done) =>{ 
            return this.service.findUser(email) 
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
        }
    )} 

    passSingin () {
        new localStrategy({
        passReqToCallback: true  
      },(req,username,password,done) =>{
          return this.service.findUserbyName(username)
          .then(user =>{
              if(user.name == username) {
                  return done(null, false, {message : 'nombre de usuario ya existente'})
              }
              const newUser = {
                  name: username,      
                  password : createHash(password),    
                  email : req.body.email,   
                  adress : req.body.adress,    
                  age : req.body.age,   
                  phone : req.body.phone
              }
              this.service.createNewUser (newUser)   
              sendSMS(req.body.phone)
              .then(_ => {
                  logInfo.info("funciono el save")  
              })
          })
          .then(user =>(null,user))
          .catch(err => {
              done(err)
          })
      })
    }  
}

module.exports = {
    UserController
}













