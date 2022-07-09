import ContenedorFirebase from "../../contenedores/contenedorFirebase"


class CartDaoFirebase extends ContenedorFirebase {
    constructor(){
        super("carritos")
    }
}

module.exports = CartDaoFirebase