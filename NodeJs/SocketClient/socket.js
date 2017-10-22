var net = require('net');
var client = new net.Socket();

var arreglo_numeros = ["5540781354", "5540781354"]


client.connect(6000, '192.168.40.13', function() {
    console.log('Connected');

    client.write(arreglo_numeros[1] + ',,Hola Aaron es es el mensaje numero:' + 1 + '');

    //client.destroy()
});


client.on('data', function(data) {
    console.log('Received: ' + data);
    client.destroy(); // kill client after server's response
});

client.on('close', function() {
    console.log('Connection closed');
});
