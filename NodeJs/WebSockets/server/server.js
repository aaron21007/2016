var express = require('express')
var app = express()
var server = require('http').Server(app)
var io = require('socket.io')(server)


app.use(express.static('public'))

app.get('/Hello', function(req, res) {
    res.send('Hola Mundo , de, ewqeqw1231231, sdadas')
})

io.on('connection', function(socket) {
    console.log('Alguien se conecto al socket');
    socket.emit('messages', {
      id:1,
      texto: 'Hola soy del back',
      author: 'Aaron Luna'
    })

    socket.on('new-message', function(data){
      console.log('Recibi del Front: '+data.navegador);
    })
})

server.listen(7000, function() {
    console.log('Servidor Online');
})
