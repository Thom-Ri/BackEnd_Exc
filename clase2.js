class Usuario{
    pets = []
    books = []
    constructor(nombre,apellido,libros,mascotas){
        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros,
        this.mascotas = mascotas   
    };
    getFullName(){
        alert(`El nombre completo del usuario es ${this.nombre} ${this.apellido}`)
        console.log("Se ejecuta 1") 
    };
    addMascotas(){
        pets_array = this.pets
        pets_array.push(mascotas.nombre)
        console.log("Se ejecuta 2")
    };
    countMascotas(){
        console.log(`Este usuario tiene ${this.pets.length} mascotas`)
        console.log("Se ejecuta 3")
    };
    addBooks(){
        book_array = this.books
        book_array.push(this.libros.autor)
        console.log("Se ejecuta 4")
    };
    getBooks(){
        console.log(`Su libro favorito es ${this.books}`)
        console.log("Se ejecuta 5")
    };
}

let luis = new Usuario("Luis", "Rojas", {autor: "Yamal Itau", libro: "100 Dias"},{especie:"Gato", nombre:"Robin"})

console.log(luis)
