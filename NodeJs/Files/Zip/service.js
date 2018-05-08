'use strict'

var fs = require('fs');
var archiver = require('archiver');
var output = fs.createWriteStream('./example.zip');
var archive = archiver('zip', {
    gzip: true,
    zlib: { level: 9 } // Sets the compression level.
});

archive.on('error', function(err) {
  throw err;
});

// pipe archive data to the output file
archive.pipe(output);

// append files
archive.file('./m1.wav', {name: 'm1.wav'});
archive.file('./m2.wav', {name: 'm2.wav'});
archive.file('./m3.wav', {name: 'm3.wav'});
//
archive.finalize();
