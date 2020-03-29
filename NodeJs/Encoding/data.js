var iconv = require('iconv-lite');


let buf = iconv.encode("Aarón ", 'utf-16be');

console.log(buf);



