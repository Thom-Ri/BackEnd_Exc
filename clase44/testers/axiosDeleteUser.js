const axios = require('axios')

axios.delete('http://localhost:8080/usuarios/:id')
.then(response =>{
    console.log({
        status: response.status,
        data: response.data
    })
})