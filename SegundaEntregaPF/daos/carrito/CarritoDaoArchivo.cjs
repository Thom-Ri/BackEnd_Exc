const fs = require('fs')

const ContenedorArchivo = require('../../contenedores/contenedorArchivo')


class CarritoArchivo extends ContenedorArchivo {
    constructor(){
        super('Carritos.json')
    }
}

module.exports = CarritoArchivo