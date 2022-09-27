const axios = require('axios')

axios.post('http://localhost:8080/usuarios/user',{
    email : "testing@gmail.com",
    password : "code",
    name : "Jessi",
    adress: "land123",
    age: 33,
    phone: 0221345
})
.then(response =>{
    console.log({
        status: response.status,
        data: response.data
    })
})