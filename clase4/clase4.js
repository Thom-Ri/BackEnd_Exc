const fs = require('fs');
const { json } = require('stream/consumers');

class Contenedor{
    constructor(objeto){
        this.archivo = './archivo.txt'
        this.objeto = objeto
    }
    save(){ 
        let contador = 0
        this.objeto.forEach(element => {
            element = { ...element, "id": contador }
            contador ++
            fs.appendFile(this.archivo, JSON.stringify(element), err =>{
                if(err){
                    console.log("Problemas escribiendo el archivo")
                }else{
                    return console.log(`Se guardo el elemento ${element.id}`)
                }
            })
        });
    }
    getById(id){
        let archivoCompleto = []
        fs.readFile(this.archivo, "utf-8", (err,contenido) =>{
            if(err){
                console.log("Problemas en el getByID")
            }else{
                const content = JSON.parse(contenido)
                archivoCompleto.push(content)
                let FoundItem = archivoCompleto.find((item) => item.id != id);
                console.log(`Este es el archivo encontrado`)
                console.log(FoundItem)
            }
        })
        
    }
    getAll(){
       const data = fs.readFile(this.archivo, "utf-8", (err,contenido) =>{
           if (err){
               console.log(`error de lectura: ` + err)
           }
           else{
               console.log(contenido)
               console.log("Se leyó el archivo con exito")
           }
       })
    } 
    deleteById(id){
        fs.readFile(this.archivo, "utf-8",(err, contenido) =>{
            let archivoCompleto = []
            if(err){
                console.log("Problemas deleting by ID")
            }else{
                const content = JSON.parse(contenido)
                console.log('type is: ' + typeof(content))
                console.log('befpre:' + content)
                archivoCompleto.push(content)
                var newArchivo = archivoCompleto.filter((item) => item.id != id);
                console.log('after:' + newArchivo)
                fs.writeFileSync(this.archivo, JSON.stringify(newArchivo))

            }
        })
        
    }
    deleteAll(){
        fs.unlinkSync(this.archivo)
        console.log("archivo eliminado")
    }
}

let jazmin = new Contenedor([{titulo:"Regla Flexible",precio: 550, url:"lorem"},{titulo:"tijera",precio: 250, url:"lorem"},{titulo:"Lapiz",precio: 150, url:"lorem"}])
jazmin.save()
jazmin.getAll()
jazmin.getById(2)
jazmin.deleteById(0)
jazmin.deleteAll()
