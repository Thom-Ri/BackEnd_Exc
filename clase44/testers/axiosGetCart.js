const axios = require('axios')

axios.get('http://localhost:8080/Carrito')
.then(response =>{
    console.log({
        status: response.status,
        data: response.data
    })
})