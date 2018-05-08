'use strict';
var crypto = require('crypto'),
    algorithm = 'aes192',
    password = 'd6F3Efeq';

var fs = require('fs');
var zlib = require('zlib');

// input file
var r = fs.createReadStream('cdr_view.csv');
// zip content
var zip = zlib.createGzip();
// encrypt content
var encrypt = crypto.createCipher(algorithm, password);
// decrypt content
var decrypt = crypto.createDecipher(algorithm, password)
// unzip content
var unzip = zlib.createGunzip();
// write file
var w = fs.createWriteStream('file_out.csv');
var w_encrypt = fs.createWriteStream('file_out.gz');
// start pipe
r.pipe(zip).pipe(w_encrypt);

r.pipe(zip).pipe(encrypt).pipe(decrypt).pipe(unzip).pipe(w);
