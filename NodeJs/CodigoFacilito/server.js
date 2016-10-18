const http = require('http');
var fs = require('fs')

const hostname = '127.0.0.1';
const port = 8081;

const server = http.createServer((req, res) => {

  fs.readFile("./index.html", function(err, html) {

    var html_string = html.toString()
    var variables = html_string.match(/[^\{\}]+(?=\})/g)

    var nombre  = 'Aaron Luna'
    for (var i = 0; i < variables.length; i++) {
      var value = eval(variables[i])
      html_string = html_string.replace("{"+variables[i]+"}", value)
    }


    res.writeHead(200, {
      "Content-Type": "text/html"
    });
    res.write(html_string);
    res.end();
  })

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
