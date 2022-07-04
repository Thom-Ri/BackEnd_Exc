const fs = require('fs')


class ProductosArchivo {

    constructor(objeto){
        this.archivo = './Productos.txt'
    }

    getallProducts(){
        const data = fs.readFileSync(this.archivo, "utf-8")
        return data
    }
    getOneProduct(id){
        const idProduct = id

        fs.readFile(this.archivo, "utf-8", (err,contenido) =>{
            if(err){
                console.log("Problemas en el getByID")
            }else{
                const content = JSON.parse(contenido)
                const Producto = content.find(Product => Product.id === idProduct)
                return Producto
            }
        })
    }

    CreateProduct(titulo,precio,codigo,stock){
        fs.readFile(this.archivo, "utf-8", (err,contenido) =>{
            if(err){
                console.log("Problemas en el getByID")
            }else{
                const content = JSON.parse(contenido)
                const newProduct = {
                    title : titulo,
                    price : precio,
                    id : content.lenght + 1,
                    code : codigo,
                    Stock : stock,
                    timestamp: Date.now()
                }
                fs.appendFile(this.archivo, JSON.stringify(newProduct), err =>{
                    if(err){
                        console.log("Problemas escribiendo el archivo")
                    }else{
                        return console.log(`Se guardo el nuevo producto`)
                    }
                })
            }
        })
    }
    deleteProduct(id){
        const ProductId = id
        fs.readFile(this.archivo, "utf-8", (err,contenido) =>{
            if(err){
                console.log("Problemas en el getByID")
            }else{
                const content = JSON.parse(contenido)
                newContent = content.filter(Product => Product.id !== ProductId )
                fs.writeFileSync(this.archivo, JSON.stringify(newContent))
            }
        })
    
    }
}