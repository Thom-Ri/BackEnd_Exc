const axios = require('axios')

axios.delete('http://localhost:8080/productos/:id')
.then(response =>{
    console.log({
        status: response.status,
        data: response.data
    })
})