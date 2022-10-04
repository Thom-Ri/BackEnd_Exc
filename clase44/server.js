const express = require('express')
const cors = require('cors')
const {NODE_ENV, HOST, PORT} = require('./config')
const { logInfo } = require ('./tools/log4js-Config')
const UserRouter = require('./Routers/userRouter')
const ProdRouter = require('./Routers/prodRouter')
const CartRouter = require('./Routers/CartRouter')

const {graphqlHTTP} = require ('express-graphql')
const {buildSchema} = require('graphql')
const crypto = require('crypto')


const schema = buildSchema(`
    type User {
        id: ID!,
        nombre: String,
        edad: int,
        email : String,
        password : String,
        adress: String,
        phone: int
    }
    input UserInput{
        nombre: String,
        edad: int,
        email : String,
        password : String,
        adress: String,
        phone: int
    }

    type Query{
        getAll(campo:String, valor: String): [User]
        getOne(id: ID!): User

    }

    type Mutation{
        create(datos: UserInput):User,
        update(id: ID!, datos: UserInput):User,
        Userdelete(id: ID!): User,
    }
`)

class User{
    constructor(id,nombre,edad,email,password,adress,phone){
        this.id =id
        this.nombre= nombre
        this.edad= edad
        this.email= email
        this.password= password
        this.adress= adress
        this.phone= phone
    } 
}
const users= []

//Resolvers//

const getAll=({campo, valor})=>{
    if(campo && valor){
        return users.filter(user => user[campo] === valor)
    }
    return users
}
const getOne=({id})=>{
    const user = users.find(user => user.id === id)
    if(!user){
        throw new Error ('user not found')
    }
}

const create=({datos})=>{
    const id = crypto.randomBytes(10).toString('hex')
    const newUser = new User(id, datos.nombre,datos.edad,datos.email,datos.password,datos.adress,datos.phone)
    users.push (newUser)
    return newUser
}
const update=({id,datos})=>{
    const userIndex = users.findIndex(user => user.id === id)
    if(userIndex === -1){
        throw new Error ('user not found')
    }
    users[userIndex].nombre = datos.nombre
    users[userIndex].edad = datos.edad
    users[userIndex].email = datos.email
    users[userIndex].password = datos.password
    users[userIndex].adress = datos.adress
    users[userIndex].phone = datos.phone

    return users[userIndex]
}
const Userdelete=({id})=>{
    const userIndex = users.findIndex(user => user.id === id)
    if(userIndex === -1){
        throw new Error ('user not found')
    }
    const user = users[userIndex]
    users.splice(userIndex,1)
    return user
}


const app = express()

app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: {
        getAll,
        getOne,
        create,
        update,
        Userdelete
    },
    graphiql: true
}))

app.listen(PORT, (req,res)=>{
    logInfo.info(`escuchando0 al servidor graphql en el puerto ${PORT}`)
})

if (NODE_ENV === "Development"){app.use(cors())}
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const userRouter = new UserRouter 
const prodRouter = new ProdRouter
const cartRouter = new CartRouter
 

app.use('/usuarios', userRouter.start())

app.use('/productos', prodRouter.start())

app.use('/Carrito', cartRouter.start())   



    



