var http = require('http');
var request = require('request');
var Sync = require('sync');

http.createServer(function (req, res) {


 if(req.url == '/manda'){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Mensajes enviados');
    for (var i = 0; i < 100; i++) {
      request.post({url:'http://sms.directo.com:1401/sendSms', form: {user:'prueba',password:'prueba',number: '5540781354', message: 'Mensaje de prueba numero '+i}}, function(err,httpResponse,body){
         var json = JSON.parse(body);
         console.log('Request ID '+i+': '+json.UID);
         if(json.resp == '200'){
           request.get('http://sms.directo.com:1401/statusSms/uid/'+json.UID, function(error, body){
             var json_response = JSON.parse(body.body);
             if(json_response.resp == '404'){
               consulta(json.UID);
             }else{
               console.log('Respuesta '+json.UID+': '+body.body);
             }
           });
         }else{
           console.log('No se pudo proporcionar un ID para esta petición.');
         }
      });
    }
 }else{
   res.writeHead(200, {'Content-Type': 'text/plain'});
   res.end('Home');
 }

}).listen(1666, "127.0.0.1");
function consulta(uid){
  request.get('http://sms.directo.com:1401/statusSms/uid/'+uid, function(error, body){

    var json_response = JSON.parse(body.body);
    if(json_response.resp == '404'){
      consulta(uid);
    }else{
      console.log('Respuesta '+uid+': '+body.body);
    }
  });
}
console.log('Server running :D');
