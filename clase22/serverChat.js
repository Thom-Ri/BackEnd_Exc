const express = require (`express`)
const app = express()
const { Server: HttpServer } = require('http') 
const { Server: IOServer } = require('socket.io') 
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const PORT = process.env.PORT || 8080
const { Router } = express
app.set(`view engine`, `ejs`)
app.set("views","views")
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const db = require('./Db')
const {Schema, model} = require ('mongoose')
const msg =  require('./models/msg')
const user = require('./models/user')

const normalizr = require('normalizr');
const normalize = normalizr.normalize;
const denormalize = normalizr.denormalize;
const schema = normalizr.schema;


const user = new schema.Entity('users');
const comment = new schema.Entity('comments',{
    commenter:user
})
const message = new schema.Entity('messages',{
    author: user,
    comments: [comment]
})
const posts = new schema.Entity('posts', {
    posts: [message]
})
const util = require ('util')


// CHAT
let users = []

app.get("/chatLogin", (req, res) => {
    res.send('pages/chatLogin.ejs')
})

app.post('/chatLogin', (req, res) => {
    const {username} = req.body.username
    const NewUser = new model.user(res)
    let userSave = await NewUser.save()
    .then(_ =>{
        let mensajes = await model.msg.find({})
        io.sockets.emit('mensajes', mensajes);
    })
    .catch("hubo un error con el chat")
    users.push(username)
    res.redirect(`/chat?username=${username}`)
})

app.get('/chat', (req, res) => {
    res.render('pages/helpChat')

    let mensajes = await model.msg.find({})

    JSON.stringify(mensajes)

    const normalizedData= normalize(mensajes)

    util.inspect(normalizedData,false,12,true)

    res.send (normalizedData)
})

io.on(`connection`, function (socket){
    console.log(`Se ha conectaco el usuario ${socket.it}`);
    socket.emit(`Bienvenida`, `Bienvenido ${socket.id}`);

    socket.on('joinchat', data =>{
        const username = data.username
        console.log(`Se ha conectado ${username}`)
        let mensajes = await model.msg.find({})
        .then(mensajes =>{
            JSON.stringify(mensajes)
            const normalizedData= normalize(mensajes)
            util.inspect(normalizedData,false,12,true)
            io.sockets.emit('mensajes', mensajes);
        })
    })

    socket.on('new-message',data => {
        const messageSaveModel = new model.msg(data)
        let msgSave = await messageSaveModel.save()
        .then(_ =>{
            let mensajes = await model.msg.find({})
            JSON.stringify(mensajes)

            const normalizedData= normalize(mensajes)

            util.inspect(normalizedData,false,12,true)

            const normalizedMsg = normalizedData

            io.sockets.emit('mensajes', normalizedMsg);
        })
        .catch("hubo un error con el chat")
    });
});

server.on(`error`, error =>{
    console.log(error.message)
});
