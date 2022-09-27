const axios = require('axios')

axios.put('http://localhost:8080/usuarios/:id',{
    email : "testingUpdate@gmail.com",
    password : "code123",
    name : "Jessi123",
    adress: "land123321",
    age: 23,
    phone: 0221345
})
.then(response =>{
    console.log({
        status: response.status,
        data: response.data
    })
})