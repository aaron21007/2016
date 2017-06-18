var socket = io.connect('http://localhost:7000', {
    'forceNew': true
})


socket.on('messages', function(data) {
    console.log(data);
    render(data)
})

/*Funciones del front*/
function render(data) {
    var html = `<div>
    <strong>${data.author}</strong>: <em>${data.texto} </em>
   </div>`;
    document.getElementById('chat').innerHTML = html
}

function addMessage(e) {
    console.log(document.getElementById('username').value);
    var payload = {
        author: document.getElementById('username').value,
        texto: document.getElementById('texto').value,
        navegador: navigator.userAgent
    }

    socket.emit('new-message', payload)
    return false
}
