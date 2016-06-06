var http = require('http');
var uuid = require('shortid');
var uuid2 = require('simple-unique-id');


http.createServer(function (req, res) {


  res.writeHead(200, {'Content-Type': 'text/plain'});
  //res.end('UUID : '+uuid.generate());

  var d = new Date();
  var n = d.getTime();
  res.end('UUID2 : '+uuid2.generate(n));

}).listen(1666, "127.0.0.1");

console.log('Server running :D');
