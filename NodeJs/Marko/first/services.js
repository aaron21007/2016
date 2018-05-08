var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var sleep = require('sleep')
const Papa = require('papaparse');
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'escom123',
  database: 'WS'
});

http.createServer(function(req, res) {
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
      var oldpath = files.filetoupload.path;
      console.log(oldpath);
      console.log(fs.existsSync(oldpath));
      console.log(fs.statSync(oldpath));

      console.log(files.filetouploadimagen.path);
      console.log(fs.existsSync(files.filetouploadimagen.path));
      console.log(fs.statSync(files.filetouploadimagen.path));
      var image_file = fs.statSync(files.filetouploadimagen.path)

      console.log(image_file["size"]);
      var tipo = 'texto'
      var path_imagen = '-'
      if (parseInt(image_file["size"]) > 10) {
        tipo = 'imagen'
        path_imagen = './ws_images/' + files.filetouploadimagen.name
        fs.renameSync(files.filetouploadimagen.path, './ws_images/' + files.filetouploadimagen.name)
      }

      var newpath = './ws_images/' + files.filetoupload.name;
      fs.rename(oldpath, newpath, function(err) {
        if (err) throw err;

        var conten_file = fs.readFileSync(newpath, 'utf8')
        Papa.parse(conten_file, {
          header: true,
          skipEmptyLines: true,
          delimiter: "",
          newline: "",
          step: function(results, parser) {

            let numero = results.data[0].numero
            let mensaje = results.data[0].mensaje
            connection.query(`INSERT INTO messages set ?`, {
              number: numero,
              body: mensaje,
              type: tipo,
              path: path_imagen

            }, function(err, result) {
              if (err) {
                console.error(err);
              }

            })
          },
          complete: function(results, file) {
            console.log(`---- TERMINA  LEYENDO INFORMACION  -----`);
          }
        });
        sleep.sleep(2)
        res.writeHead(301, {
          Location: 'http://localhost:8080/'
        });
        res.end();
      });
    });
  } else {
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
}).listen(8181);
