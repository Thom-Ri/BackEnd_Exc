let productos = [   
    {title: 'PizarronComercial',id:1, price: 1600, text: 'PizarroNDosAguasParaUsoComercial', code: 'OASFR67',stock: 'Disponible'},
    {title: 'Estanteria',id:2, price: 4500, text: 'Estanteria de 5 pisos para almacenar variedad de productos', code: 'LKA6SE4',stock: 'Disponible'},
    {title: 'Cajon huertero',id:3, price: 4600, text: 'Cajon huertero hecho con madera de Eucaliptus Saligna', code: 'BGSO86',stock: 'Disponible'},
    {title: 'Mesa exhibidora de Frutas',id:4, price: 4800, text: 'Exhibidor de frutas con 4 compartimientos mas almacenamiento inferior',code: 'PA9REG6',stock: 'Sin Stock'},
    {title: 'Mesa multifuncion',id:5, price: 3000, text: 'Mesa multifuncion para taller', code: 'ÑLQ14H', stock: 'Sin Stock'},
    {title: 'tituloUNO',id:6, price: 1500, text: 'textoUNO', code: 'codigoUNO',stock: 'Sin Stock'},
    {title: 'tituloDOS',id:7, price: 2500, text: 'textoDOS', code: 'codigoDOS',stock: 'Sin Stock'},
    {title: 'tituloTRES',id:8, price: 3500, text: 'textoTRES', code: 'codigoTRES',stock: 'Sin Stock'},
    {title: 'tituloCUATRO',id:9, price: 4500, text: 'textoCUATRO', code: 'codigoCUATRO',stock: 'Sin Stock'}
]
let CartContainer = [
    {   id : 1,
        creation : 15-6-22,
        productos: [
            {
                "title": "Pizarron comercial",
                "price": 1600,
                "text":"Pizarron de dos aguas para uso comercial",
                "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
                "id": 1,
                "code":"OASFR67",
                "Stock":"Disponible",
                "timestamp": "3/4/16"
              },
              {
                "title": "Estanteria",
                "price": 7500,
                "text":"Estanteria de 5 pisos para almacenar variedad de productos",
                "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
                "id": 2,
                "code":"LKA6SE4",
                "Stock":"Disponible",
                "timestamp": "4/6/16"
              }
        ]
    }
]

class ContenedorMemoria {
    constructor(ruta){
        this.ruta = ruta;
    }

    getAll(){
        return productos
    }
    getOne(id){
        const idProduct = id
        const Producto = productos.find(Product => Product.id === idProduct)
        return Producto
    }

    create(titulo,precio,codigo,stock){     
        const newProduct = {
            title : titulo,
            price : precio,
            id : productos.lenght + 1,
            code : codigo,
            Stock : stock,
            timestamp: Date.now()
        }
        productos.push(newProduct)
    }
      
    delete(id){
        const ProductId = id
        productos = productos.filter(Product => Product.id !== ProductId )
        return productos
    }
}

module.exports = ContenedorMemoria