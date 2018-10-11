'use strict'
const path = require(`path`)
const publicPath = path.join(__dirname, '../public')
const express = require('express')
const socketIO = require('socket.io')
const http = require('http')
const port = process.env.PORT || 3000;

const app = express()

var server = http.createServer(app)
var io = socketIO(server)
app.use(express.static(publicPath))

io.on('connection', (socket)=>{
    console.log(`New Use conected`);

    socket.on('disconnect', ()=>{
        console.log(`Desconectando desde el servidor`);
    })

    socket.emit('newEmail', {
        from:'aaon.lasd@asa.com'
    })
    
})

server.listen(port, () => {
    console.log(`Server started on  ${port}`);
});

console.log(__dirname);
console.log(publicPath);

