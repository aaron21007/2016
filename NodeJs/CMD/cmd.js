var http = require('http');
var cmd = require('node-cmd');
var ip_f = require('ip')
var ip = ip_f.address()
var puerto = 1399;

http.createServer(function(req, res) {

  var ipOrigen = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log('[' + ipOrigen + '] ' + req.url + ' - ' + req.method + ' [' + Date() + ']');

  if (req.url == '/cmd') {


    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    res.end('\t\t\t\t\t\t\tListo a ver que tal \n');


    console.log('------------------------------');

    // cmd.get(
    //   'file -b ctc_test.csv',
    //   function(data) {
    //     var codificacion_data = data.replace(/\n/g, '').replace(/\r/g, '');
    //     var coding = codificacion_data.split(" ");
    //     console.log('...'+coding[0]+'...')
    //   }
    // );

    console.log('------------------------------');

    cmd.get(
      'iconv -f UTF-8 -t UTF-8 ctc_test.csv > ctc_test_SALIDA.csv ',
      function(data, err) {

        console.log('...' + data + '...')

        console.log('...' + err + '...')
        cmd.get(
          'wc -l ctc_test.csv && wc -l ctc_test_SALIDA.csv',
          function(data) {

            console.log('...' + data + '...')

          });

      });


  } else {
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    res.end('\t\t\t\t\t\t\tHome API Directo SMS\n');
  }
}).listen(puerto, ip);


console.log('Server running at ' + ip + ' on port ' + puerto);
