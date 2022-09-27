const axios = require('axios')

axios.post('http://localhost:8080/Carrito/cart',{
    creation : "26/9/22",
    products : {
        productoUno,
        ProductoDos
    } 
})
.then(response =>{
    console.log({
        status: response.status,
        data: response.data
    })
})