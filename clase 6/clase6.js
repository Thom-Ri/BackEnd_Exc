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
    fs.readFile('./Productos.txt', "utf-8", (err,contenido) =>{
        if(err){
            console.log("Problemas en el getByID")
        }else{
            let rannum = Math.round(Math.random() * (2 - 0) + 0)
            console.log("esta pasando algo")
            const content = JSON.parse(contenido)
            let FoundItem = content.find((item) => item.id == rannum);
            console.log(FoundItem)
            typeof FoundItem
            res.send(FoundItem)
        }
    })
    
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
        fs.readFile(this.archivo, "utf-8", (err,contenido) =>{
            if(err){
                console.log("Problemas en el getByID")
            }else{
                let rannum = Math.round(Math.random() * (2 - 0) + 0)
                console.log("esta pasando algo")
                const content = JSON.parse(contenido)
                let FoundItem = content.find((item) => item.id == rannum);
                console.log(FoundItem)
                return FoundItem
            }
        })
    }          
}