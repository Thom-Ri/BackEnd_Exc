const fs = require('fs')

class Contenedor{
    constructor(archivo,objeto){
        this.archivo = archivo
        this.objeto = objeto
    }
    save(){ 
        let contador = 0
        this.objeto.forEach(element => {
            element = { ...element, "id": contador }
            contador ++
            fs.appendFileSync(this.archivo, JSON.stringify(element))
            return console.log(element.id)    
        });
    }
    getById(){
        let archivoCompleto = []
        let data = fs.readFileSync(this.archivo, "utf-8")
        JSON.parse(JSON.stringify(data))
        archivoCompleto.push(data)
        let FoundItem = archivoCompleto.filter((item) => item.id == 1)
        console.log(FoundItem)
    }
     getAll(){
        const data = fs.promises.readFile(this.archivo, "utf-8")
        .then(contenido =>{
            console.log(contenido)
            console.log("Se leyó el archivo con exito")
        })
        .catch(err =>{
            console.log(`error de lectura: ` + err)
        })
     } 
    deleteById(){
        let archivoCompleto = []
        const data = fs.readFileSync(this.archivo, "utf-8")
        archivoCompleto.push(data)
        var newArchivo = archivoCompleto.filter((item) => item.id != 1);
        archivoCompleto = newArchivo
        fs.writeFileSync(this.archivo, JSON.stringify(archivoCompleto))
    
    }
    deleteAll(){
        fs.promises.unlink(this.archivo)
        .then(
            console.log("el archivo fue eliminidado")
        )
        .catch(
            console.log("el archivo no fue eliminado")
        )
    }
}

let jazmin = new Contenedor('./archivo.txt',[{titulo:"Regla Flexible",precio: 550, url:"lorem"},{titulo:"tijera",precio: 250, url:"lorem"},{titulo:"Lapiz",precio: 150, url:"lorem"}])
console.log(jazmin.save())
console.log(jazmin.getAll())
console.log(jazmin.getById())
console.log(jazmin.deleteById())
console.log(jazmin.deleteAll())
