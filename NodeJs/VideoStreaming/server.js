var express = require('express');
var sox = require('sox-stream')
var fs = require('fs')
var app = express();
ms = require('mediaserver');

app.get('/', function(req, res) {
  res.send('Hello World!');
});


app.get('/video', function(req, res) {
  const path = './panky.mp4'
  const stat = fs.statSync(path)
  const fileSize = stat.size
  const range = req.headers.range
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-")
    const start = parseInt(parts[0], 10)
    const end = parts[1] ?
      parseInt(parts[1], 10) :
      fileSize - 1
    const chunksize = (end - start) + 1
    console.log(start);
    console.log(end);
    const file = fs.createReadStream(path, {
      start,
      end
    })
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
  }
});

app.get('/audio', function(req, res) {

  var file_name = req.query.name
  console.log(file_name);
  res.setHeader('Content-Disposition', 'attachment; filename='+file_name);
  res.setHeader('Content-Type', 'audio/mpeg');
  // const head = {
  //   'Content-Type': 'audio/mpeg',
  // }
  // res.writeHead(200, head);

  fs.createReadStream('output.wav')
    .pipe(sox({
      output: {
        type: 'mp3'
      }
    }))
    .pipe(res)

});


app.listen(4000, function() {
  console.log('Example app listening on port 3000!');
});
