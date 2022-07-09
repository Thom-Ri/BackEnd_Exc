const fs = require('fs')
class ContenedorArchivo {
    constructor(archivo){
        this.archivo = archivo
    }

    getAll(){ 
        return fs.promises.readFile(this.archivo, "utf-8")
        .then(itemsString => JSON.parse(itemsString))
    }
    getOne(id){
        const serchId = id
        fs.readFile(this.archivo, "utf-8", (err,contenido) =>{
            if(err){
                console.log("Problemas en el getByID")
            }else{
                const content = JSON.parse(contenido)
                const Item = content.find(unit => unit.id === serchId)
                return Item
            }
        })
    }

    create(data){
        return this.getall
        .then(items =>{
            items.push(data)
            const dataString = JSON.stringify(items)
            fs.promises.appendFile(this.archivo, dataString)
        })
    }
    delete(id){
        const cartId = id
        fs.readFile(this.archivo, "utf-8", (err,contenido) =>{
            if(err){
                console.log("Problemas en el getByID")
            }else{
                const content = JSON.parse(contenido)
                const newContent = content.filter(cart => cart.id !== cartId )
                const StringData = JSON.stringify(newContent)
                fs.promises.writeFileSync(this.archivo, StringData)
            }
        })
    
    }
}
module.exports = ContenedorArchivo