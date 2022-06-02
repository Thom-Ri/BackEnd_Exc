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

function pintar(data) {
    const html = data.map((elem, index) => {
        return(`<tr>
                    <th>#</th>
                    <td>${elem.title}</td>
                    <td>${elem.price}</td>
                    <td>${elem.url}</td>
                </tr>`)
    }).join(" ");
    document.getElementById('tabla').innerHTML = html;
}

socket.on('mensajes', function(data) { render(data); });
socket.on('Productos', function(data) { pintar(data); });


// socket.emit("joinchat", {username})


function addMessage(e) {
    const mensaje = {
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value
    };
    socket.emit('new-message', mensaje);
    return false;
}

function addproduct(e) {
    e.preventDefault()
    const product = {
        title: document.getElementById('urlTitle').value,
        price: document.getElementById('urlPrice').value,
        url: document.getElementById('urlInput').value
    };
    socket.emit('new-product', product);
    return false;
}



// socket.on("Bienvenida", data =>{
//     alert(data)
// })
