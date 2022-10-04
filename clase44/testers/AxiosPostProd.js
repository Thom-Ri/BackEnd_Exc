const axios = require('axios')

axios.post('http://localhost:8080/productos/product',{
    title : "Prueba",
    price : 1234,
    text : "Una hermosa prueba",
    code : "jkwaeg",
    stock : "Disponible"
})
.then(response =>{
    console.log({
        status: response.status,
        data: response.data
    })
})