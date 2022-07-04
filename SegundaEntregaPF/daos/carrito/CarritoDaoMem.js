const fs = require('fs')

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


class CarritoMemoria {

    constructor(){
    }

    getallCarts(){
        return CartContainer
    }
    getOneCart(id){
        const idCart = id
        const cartIndex = CartContainer.findIndex(cart => cart.id === idCart)
        const ProductosCarrito = CartContainer[cartIndex].productos
        return ProductosCarrito
    }

    CreateCart(){
        const newCarrito = {
            id : CartContainer.length + 1,
            creation : new Date(),
            productos: [
                {
                    "title": "Mesa multifuncion",
                    "price": 6000,
                    "text":"Mesa multifuncion para taller",
                    "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
                    "id": 5,
                    "code":"ÑLQ14H",
                    "Stock":"Sin Stock",
                    "timestamp": "7/8/17"
                }
            ]
        }
        CartContainer.push(newCarrito)
    }
    deleteCart(id){
        const cartId = id
        CartContainer = CartContainer.filter(cart => cart.id !== cartId )
    }
}