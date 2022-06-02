const express = require('express') ;
const { Server: HttpServer } = require('http') 
const { Server: IOServer } = require('socket.io') 

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const PORT = 8080

app.use(express.static('./public'))


// app.set(`view engine`, `ejs`)
// app.set("views","views")



const mensajes = []
const productos = []
const users = []

httpServer.listen(PORT, () => {
    console.log(`Escuchando puerto ${PORT}`)
}) 


// app.get('/', (req, res) => {
//     res.sendFile('login.html')
// })
// app.post("/",(req,res)=>{
//     const {username} = req.body
//     users.push(username)

//     return res.redirect(`/inicio?username=${username}`)
// })

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname })
})



io.on(`connection`, function (socket){
    console.log(`Se ha conectaco el usuario ${socket.it}`);
    socket.emit(`Bienvenida`, `Bienvenido ${socket.id}`);

    socket.on('new-message',data => {
        const now = new Date()
        const message = {
            text: data.text,
            time: `${now.getHours()}:${now.getMinutes()}`,
            user: data.author,
        }
        mensajes.push(message);
        io.sockets.emit('mensajes', mensajes);
    });
    socket.on('new-product', data => {
        productos.push(data);
        io.sockets.emit('Productos', productos);
    });
});

// httpServer.get('/', (req, res) => { // Esta ruta carga nuestro archivo index.html en la raíz de la misma
//     res.sendFile('index.html', {root: __dirname})
// })


// io.on('connection', (socket) => { //"connection" se ejecuta la primera vez que se abre una nueva conexión
//     console.log('Usuario conectado') // Se imprimirá solo la primera vez que se ha abierto la conexión    
//   })

