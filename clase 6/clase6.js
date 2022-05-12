const http = require('http')
const fs = require('fs')
const express = require('express')
const app = express()

const PORT = 8080
app.listen(PORT,()=>{
    console.log(`Server corriendo en puerto ${PORT}`)
})

app.get(`/productos`, (req,res)=>{
    let ej = new Contenedor
    let resp = ej.getProduct()
    res.send(resp)
})

app.get(`/productoRandom`, (req,res)=>{
    let ej = new Contenedor
    let resp = ej.getRandomProduct()
    res.send(resp)
})


class Contenedor{
    constructor(objeto){
        this.archivo = './Productos.txt'
    }

    getProduct(){
        const data = fs.readFileSync(this.archivo, "utf-8")
        return data
    }
    getRandomProduct(id){
        let archivoCompleto = []
        fs.readFile(this.archivo, "utf-8", (err,contenido) =>{
            if(err){
                console.log("Problemas en el getByID")
            }else{
                const content = JSON.parse(contenido)
                archivoCompleto.push(content)
                let FoundItem = archivoCompleto.find((item) => item.id != id);
                return FoundItem
            }
        })
    }          
}