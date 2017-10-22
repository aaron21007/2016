var PapaParse = require('papaparse')
var fs = require('fs')

var data = fs.readFileSync('prueba.txt', 'utf8');
let data_file = PapaParse.parse(data)
console.log('------------------------');
console.log(data_file);
console.log('------------------------');

console.log(data_file['data'][0]);
console.log(data_file['data'][0].indexOf(' Columna'));

var fruits = ["Banana", "Orange", "Apple", "Mango", "Banana", "Orange", "Apple"];
var a = fruits.indexOf("Apple", 4);
console.log(a);
