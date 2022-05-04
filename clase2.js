class Usuario{
    
    constructor(nombre,apellido,libros,mascotas){
        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros,
        this.mascotas = mascotas   
    };
    getFullName(){
        console.log(`El nombre completo del usuario es ${this.nombre} ${this.apellido}`) 
    };
    addMascotas(){
        let pets_array = []    
        this.mascotas.forEach(mascota => {
            pets_array.push(mascota)
        });
        console.log(pets_array)
    };
    countMascotas(){
        console.log(`Este usuario tiene ${this.mascotas.length} mascota`)
    };
    addBooks(){
        let librero = []
        this.libros.forEach(libro => {
            librero.push({autor : libro.autor, libro: libro.libro})
        });
        console.log(librero)
    };
    getBooks(){
        let books= []
        this.libros.forEach(libro => {
            books.push(libro.libro)
        });
        console.log(`Su libro favorito es "${books}"`)
    };
}

let luis = new Usuario("Luis", "Rojas",[{autor: "Yamal Itau", libro: "100 Dias"}],["SrGato","SrPerro","SrLoro"])

console.log(luis.getFullName())
console.log(luis.countMascotas())
console.log(luis.getBooks())

