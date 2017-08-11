var Buffer = require('buffer').Buffer;
var Iconv = require('iconv').Iconv;
var assert = require('assert');
var iconvLite = require('iconv-lite');

var iconv = new Iconv('UTF-8', 'UCS-2LE');
var buffer = iconv.convert('Crédito hola');
var buffer2 = iconv.convert(new Buffer('Crédito', 'utf8'));

console.log(buffer);
console.log(encodeURIComponent(buffer));
console.log('---------------------------');


var data = 'Gana un crédito de avión'

console.log(data.length);
var aux = ''
for (var i = 0; i < data.length; i++) {
  if (data.charAt(i) == ' ') { // Espacio
    aux = aux + '%20%00';
  } else if (data.charAt(i) == 'á') { // Espacioelse
    aux = aux + '%E1%00';
  } else if (data.charAt(i) == 'é') { // Espacioelse
    aux = aux + '%E9%00';
  } else if (data.charAt(i) == 'í') { // Espacioelse
    aux = aux + '%ED%00';
  } else if (data.charAt(i) == 'ó') { // Espacioelse
    aux = aux + '%F3%00';
  } else if (data.charAt(i) == 'ú') { // Espacioelse
    aux = aux + '%FA%00';
  } else if (data.charAt(i) == 'Á') { // Espacioelse
    aux = aux + '%C1%00';
  } else if (data.charAt(i) == 'É') { // Espacioelse
    aux = aux + '%C9%00';
  } else if (data.charAt(i) == 'Í') { // Espacioelse
    aux = aux + '%CD%00';
  } else if (data.charAt(i) == 'Ó') { // Espacioelse
    aux = aux + '%D3%00';
  } else if (data.charAt(i) == 'Ú') { // Espacioelse
    aux = aux + '%DA%00';
  } else {
    aux = aux + encodeURIComponent(data.charAt(i)) + '%00';
  }
}
console.log(aux);
