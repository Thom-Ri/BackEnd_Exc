const axios = require('axios')

axios.put('http://localhost:8080/productos/:id',{
    title : "Probando",
    price : 123423,
    text : "Una hermosa prueba de update",
    code : "jkwaefffg",
    stock : "Sin Stock"
})
.then(response =>{
    console.log({
        status: response.status,
        data: response.data
    })
})