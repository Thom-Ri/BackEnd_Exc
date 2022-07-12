const socket = io.connect();

const {username} = qs.parse(window.location.search,{
    ignoreQueryPrefix : true
})

socket.emit('joinchat', {username})

function render(data) {
    const html = data.map((elem, index) => {
        return(`<div>
            <em style = "color:blue">${elem.author.id}</em> </div>:
            <strong>${elem.author.alias}</strong>
            <em style = "color:blue">(${elem.author.edad})</em> </div>:
            <em>${elem.text}</em> </div>`)
    }).join(" ");
    document.getElementById('mensajes').innerHTML = html;
}

socket.on('mensajes', function(data) { render(data); });


// socket.emit("joinchat", {username})


function addMessage(e) {
    const mensaje = {
        author: {
            id: document.getElementById('userId').value, 
            nombre: document.getElementById('username').value, 
            apellido: document.getElementById('userLastName').value, 
            edad: document.getElementById('userAge').value, 
            alias: document.getElementById('user').value
            // avatar: document.getElementById('username').value
        },
        text: document.getElementById('UserMsg').value
    };
    socket.emit('new-message', mensaje);
    return false;
}



// {
//     author: {
//         id: "Nando@gmail.com", 
//         nombre: "Fernando", 
//         apellido: "Acosta", 
//         edad: 28, 
//         alias: "Nando"
//     },
//     text: "lisbfljkasbvejkfbavjlfbal"
// }