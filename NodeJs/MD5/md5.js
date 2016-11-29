/************* Definiciaon de Variables *********************/
var http = require('http');
var mysql = require('mysql');
var parser = require('qs');
var request = require('request');
var md5 = require('md5');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'escom123',
    database: 'tokens',
    multipleStatements: true
});
var ipService = "127.0.0.1";
var puerto = 1337;

/*ATOM */



/********* Metodo que levanat el servicio ************/
http.createServer(function(req, res) {

    var metodo = req.method;
    var urlRequest = req.url;
    var ipOrigen = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    var key = req.headers['key'];
    var clienId = req.headers['client-id'];
    var oauthToken = md5(key + clienId + ipOrigen);

    log_luci(urlRequest);
    log_luci(metodo);
    log_luci(ipOrigen);
    log_luci(clienId);
    log_luci(key);
    log_luci(oauthToken);


    connection.query('SELECT * FROM target WHERE auth_key=\'' + oauthToken + '\'', function(err, result, fields) {
        if (err) {

            res.writeHead(400, {
                'Content-Type': 'application/json'
            });
            res.end('{\"resp\": \"400\",\"desc\": \"Problemas de conexion\"}');
            throw err;
            log_luci(err);
        } else {

            if (result.length > 0) {
                metodos(metodo, urlRequest, res);
                log_luci(" ");
                log_luci("-------------------------------------");
            } else {
                res.writeHead(404, {
                    'Content-Type': 'application/json'
                });
                res.end('{\"resp\": \"400\",\"desc\": \"Auth not correct\"}');
                log_luci(" ");
                log_luci("-------------------------------------");
            }

        }


    });

}).listen(puerto, ipService);

/****** Funciones dentro del API ***********/

function log_luci(description) {

    var currentDate = new Date();
    console.log("->" + description + " - " + currentDate);
}

function metodos(metodo, urlRequest, res) {
    if (urlRequest.indexOf("/luci/reus/phone") != -1) {

        if (metodo == 'GET') {

            /*request('http://69.195.197.50:4045/callInProcess?do={"ag":"'+numeroAgencia+'","mc":"'+numerMiniCall+'","phone":"'+parametros.numero+'"}', function (error, response, body) {


              if (!error) {

                var respuesta = JSON.stringify(eval("(" + body + ")"));

                var json = JSON.parse(body);
                if(json.resp == '400'){
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.end('{\"resp\": \"400\",\"desc\": \"Número INVALIDO\"}');
                }else{
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.end('{\"resp\": \"200\",\"desc\": \"Número valido\"}');
                }
              }
            });*/

            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end('{\"response\": \"200\",\"description\": \"Success\", \"phone\":\"55############\"}');




        } else if (metodo == 'POST') {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end('{\"response\": \"200\",\"description\": \"Success\", \"phone\":\"55############\"}');


        } else if (metodo == 'DELETE') {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end('{\"response\": \"200\",\"description\": \"Success\", \"phone\":\"55############\"}');


        } else {
            res.writeHead(404, {
                'Content-Type': 'text/plain'
            });
            res.end('\t\t\t\t\t\tProtocolo RESTFULL no valido\n');
        }


    } else if (urlRequest.indexOf("/luci/callinprogress/phone") != -1) {

        if (metodo == 'GET') {

            /*request('http://69.195.197.50:4045/callInProcess?do={"ag":"'+numeroAgencia+'","mc":"'+numerMiniCall+'","phone":"'+parametros.numero+'"}', function (error, response, body) {


              if (!error) {

                var respuesta = JSON.stringify(eval("(" + body + ")"));

                var json = JSON.parse(body);
                if(json.resp == '400'){
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.end('{\"resp\": \"400\",\"desc\": \"Número INVALIDO\"}');
                }else{
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.end('{\"resp\": \"200\",\"desc\": \"Número valido\"}');
                }
              }
            });*/

            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end('{\"response\": \"200\",\"inprogress\": \"T\", \"extension\":\"2001343455\"}');




        } else {
            res.writeHead(404, {
                'Content-Type': 'text/plain'
            });
            res.end('\t\t\t\t\t\tProtocolo RESTFULL no valido\n');
        }

    } else if (urlRequest.indexOf("/luci/setFolio") != -1) {
        if (metodo == 'POST') {

            /*request('http://69.195.197.50:4045/callInProcess?do={"ag":"'+numeroAgencia+'","mc":"'+numerMiniCall+'","phone":"'+parametros.numero+'"}', function (error, response, body) {


              if (!error) {

                var respuesta = JSON.stringify(eval("(" + body + ")"));

                var json = JSON.parse(body);
                if(json.resp == '400'){
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.end('{\"resp\": \"400\",\"desc\": \"Número INVALIDO\"}');
                }else{
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.end('{\"resp\": \"200\",\"desc\": \"Número valido\"}');
                }
              }
            });*/

            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end('{\"response\": \"200\",\"description\": \"Success\", \"phone\":\"55###########\"}');




        } else {
            res.writeHead(404, {
                'Content-Type': 'text/plain'
            });
            res.end('\t\t\t\t\t\tProtocolo RESTFULL no valido\n');
        }

    } else if (urlRequest.indexOf("/luci/whitelist/trusted/phone") != -1) {

        if (metodo == 'GET') {

            /*request('http://69.195.197.50:4045/callInProcess?do={"ag":"'+numeroAgencia+'","mc":"'+numerMiniCall+'","phone":"'+parametros.numero+'"}', function (error, response, body) {


              if (!error) {

                var respuesta = JSON.stringify(eval("(" + body + ")"));

                var json = JSON.parse(body);
                if(json.resp == '400'){
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.end('{\"resp\": \"400\",\"desc\": \"Número INVALIDO\"}');
                }else{
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.end('{\"resp\": \"200\",\"desc\": \"Número valido\"}');
                }
              }
            });*/

            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end('{\"response\": \"200\",\"description\": \"Success\", \"phone\":\"55############\"}');




        } else if (metodo == 'POST') {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end('{\"response\": \"200\",\"description\": \"Success\", \"phone\":\"55############\"}');


        } else if (metodo == 'DELETE') {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end('{\"response\": \"200\",\"description\": \"Success\", \"phone\":\"55############\"}');


        } else {
            res.writeHead(404, {
                'Content-Type': 'text/plain'
            });
            res.end('\t\t\t\t\t\tProtocolo RESTFULL no valido\n');
        }

    } else {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('\t\t\t\t\t\tMetodo NO valido dentro del API.\n');
    }
}



console.log('Server Luci-API running at ' + ipService + ' on port ' + puerto);
