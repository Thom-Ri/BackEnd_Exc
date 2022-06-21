const socket = io.connect();
// const {username} = qs.parse(window.location.search,{
//     ignoreQueryPrefix: true
// })


function render(data) {
    const html = data.map((elem, index) => {
        return(`<div>
            <strong>${elem.author}</strong>
            <em style = "color:blue">${elem.time}</em> </div>:
            <em>${elem.text}</em> </div>`)
    }).join(" ");
    document.getElementById('mensajes').innerHTML = html;
}

socket.on('mensajes', function(data) { render(data); });


// socket.emit("joinchat", {username})


function addMessage(e) {
    const mensaje = {
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value
    };
    socket.emit('new-message', mensaje);
    return false;
}



// socket.on("Bienvenida", data =>{
//     alert(data)
// })
