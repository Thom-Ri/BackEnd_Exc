const axios = require('axios')

axios.get('http://localhost:8080/productos')
.then(response =>{
    console.log({
        status: response.status,
        data: response.data
    })
})