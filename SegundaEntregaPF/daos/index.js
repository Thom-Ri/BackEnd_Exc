const ProductoArchivo = require('../daos/productos/ProductosDaoArchivo')
const CarritoDAOArchivo = require('../daos/carrito/CarritoDaoArchivo.cjs')

const ProductoMemoria = require('../daos/productos/ProductosDaoMem')
const CarritoMemoria = require('../daos/carrito/CarritoDaoMem')

const ProductDaoMongo = require('../daos/productos/ProductosDaoMongo')
const CartDaoMongo = require('../daos/carrito/carritoDaoMongo')

const ProductDaoFirebase = require('../daos/productos/ProductosDaoFirebase')
const CartDaoFirebase = require('../daos/carrito/CarritoDaoFirebase')


const getStorage = () =>{
    const STORAGE = process.env.STORAGE || 'archivo'
    switch (storage) {
        case 'archivo': 
        return{
            product: new ProductoArchivo(),
            cart:  new CarritoDAOArchivo()
        }
        break
        case 'memoria': 
        return{
            product: new ProductoMemoria(),
            cart:  new CarritoMemoria()
        }
        break
        case 'mongo': 
        return{
            product: new ProductDaoMongo(),
            cart:  new CartDaoMongo()
        }
        break
        case 'firebase': 
        return{
            product: new ProductDaoFirebase(),
            cart:  new CartDaoFirebase()
        }
        break
        default: 
        return{
            product: new ProductoArchivo(),
            cart:  new CarritoDAOArchivo()
        }
        break
    }
}

module.exports = getStorage