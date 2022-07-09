import ContenedorFirebase from "../../contenedores/contenedorFirebase"


class ProductDaoFirebase extends ContenedorFirebase {
    constructor(){
        super('productos')
    }
}

module.exports = ProductDaoFirebase