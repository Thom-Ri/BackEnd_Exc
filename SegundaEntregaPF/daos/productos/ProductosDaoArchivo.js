const ContenedorArchivo = require('../../contenedores/contenedorArchivo')


class ProductoArchivo extends ContenedorArchivo {
    constructor(){
        super('Productos.json')
    }
}

module.exports = ProductoArchivo