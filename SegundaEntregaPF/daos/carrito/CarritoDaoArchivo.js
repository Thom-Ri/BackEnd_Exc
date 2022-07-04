const fs = require('fs')


class CarritoArchivo {

    constructor(objeto){
        this.archivo = './Carritos.txt'
    }

    getallCarts(){
        const data = fs.readFileSync(this.archivo, "utf-8")
        return data
    }
    getOneCart(id){
        const idCart = id

        fs.readFile(this.archivo, "utf-8", (err,contenido) =>{
            if(err){
                console.log("Problemas en el getByID")
            }else{
                const content = JSON.parse(contenido)
                const cartIndex = content.findIndex(cart => cart.id === idCart)
                const ProductosCarrito = content[cartIndex].productos
                return ProductosCarrito
            }
        })
    }

    CreateCart(){
        fs.readFile(this.archivo, "utf-8", (err,contenido) =>{
            if(err){
                console.log("Problemas en el getByID")
            }else{
                const content = JSON.parse(contenido)
                const newCarrito = {
                    id : content.length + 1,
                    creation : new Date(),
                    productos: [
                        {
                            "title": "Mesa multifuncion",
                            "price": 6000,
                            "text":"Mesa multifuncion para taller",
                            "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
                            "id": 5,
                            "code":"ÑLQ14H",
                            "Stock":"Sin Stock",
                            "timestamp": "7/8/17"
                        }
                    ]
                }
                fs.appendFile(this.archivo, JSON.stringify(newCarrito), err =>{
                    if(err){
                        console.log("Problemas escribiendo el archivo")
                    }else{
                        return console.log(`Se guardo el nuevo carrito`)
                    }
                })
            }
        })
    }
    deleteCart(id){
        const cartId = id
        fs.readFile(this.archivo, "utf-8", (err,contenido) =>{
            if(err){
                console.log("Problemas en el getByID")
            }else{
                const content = JSON.parse(contenido)
                newContent = content.filter(cart => cart.id !== cartId )
                fs.writeFileSync(this.archivo, JSON.stringify(newContent))
            }
        })
    
    }
}