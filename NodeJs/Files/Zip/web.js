'use strict'

const express = require('express')
const app = express()



app.get('/', (req, res) => {


  var fs = require('fs');
  var archiver = require('archiver');
  //var output = fs.createWriteStream('./example.zip');
  var archive = archiver('zip', {
      gzip: true,
      zlib: { level: 9 } // Sets the compression level.
  });


  archive.on('error', function(err) {
    throw err;
  });

  // pipe archive data to the output file
  res.setHeader("content-type", "application/octet-stream");
  res.setHeader('Content-disposition', 'attachment; filename=archivo222.zip');
  archive.pipe(res)

  // append files
  archive.file('./m1.wav', {name: 'm1.wav'});
  archive.file('./m2.wav', {name: 'm2.wav'});
  archive.file('./m3.wav', {name: 'm3.wav'});
  //
  archive.finalize();
})

app.listen(3003, () => console.log('Example app listening on port 3000!'))
