const passport = require(`passport`)
const localStrategy = require(`passport-local`).Strategy
const { createHash, isValidPassword } = require('./utils')


const passLogin = new localStrategy((username, password, done) =>{
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
    
})

const passSign = new localStrategy({
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
})

module.exports = {
    passLogin,
    passSign
}