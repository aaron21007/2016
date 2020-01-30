/*jslint node: true */
"use strict";

var soap = require('soap');
var http = require('http');

var service = {
  Voices: {
    VoicesSoap: {
      EnvioSms: function async (args) {
        var n = "El mensaje se ha enviado Correctamente"
        return {
          EnvioSmsResponse: n
        };
      }
    }
  }
};

var xml = require('fs').readFileSync('demo3.wsdl', 'utf8');

var server = http.createServer(function (request, response) {
  response.end("404: Not Found: " + request.url);
});

server.listen(8001);
soap.listen(server, '/voiceswsdl', service, xml);

 server.log = function (type, data) {
   console.log(data);
   
 };