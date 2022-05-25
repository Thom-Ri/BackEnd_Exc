const fs = require('fs')
const express = require (`express`)
const { Router } = express
const router = Router()
const productosRouter = Router()
const app = express()
const PORT = 8080

// app.use('',express.static(__dirname + '/public'))

const server = app.listen(PORT, ()=> {
    console.log("escuchando en el puerto 8080")
});

router.get('', (req, res) => {
    const data = fs.readFile('./productos.txt', "utf-8", (err,contenido) =>{
        if(!contenido){
            res.send({ error : 'producto no encontrado' })
        }
        console.log(contenido)
        res.json(contenido)
    }) 
})

router.post('', (req, res) => {
    const newProduct = req.body
    fs.readFile('./productos.txt', "utf-8", (error, contenido) =>{
        if(error){
            console.log("hay errores")
        }else{
            const content = JSON.parse(contenido)
            console.log(newProduct)
            fs.appendFileSync('./productos.txt', newProduct)
            res.status(200).json(newProduct);
        }
    })
})



router.get('/:id', (res,req)=>{
    fs.readFile('./productos.txt', "utf-8", (err,contenido) =>{
        if(err){
            console.log("Problemas en el getByID")
        }else{
            const content = JSON.parse(contenido)
            let FoundItem = content.find((item) => item.id == req.param.id);
            console.log(FoundItem)
            return FoundItem
        }
    })
})

router.put('/:id', (res,req)=>{
    fs.readFile('./Productos.txt', "utf-8", (err,contenido) =>{
        if(err){
            console.log("Problemas en el getByID")
        }else{
            const content = JSON.parse(contenido)
            let FoundItem = content.find((item) => item.id ==  req.params.id);
        }
    })
})
router.delete('/:id', (res,req)=>{
    fs.readFile('./Productos.txt', "utf-8",(err, contenido) =>{
        let archivoCompleto = []
        if(err){
            console.log("Problemas deleting by ID")
        }else{
            const content = JSON.parse(contenido)
            var newArchivo = content.filter((item) => item.id != req.params.id);
            archivoCompleto.push(newArchivo)
            fs.writeFileSync('./Productos.txt', JSON.stringify(archivoCompleto))
        }
    })
})

server.on(`error`, error =>{
    console.log(error)
});

app.use(`/api/productos`, router)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))