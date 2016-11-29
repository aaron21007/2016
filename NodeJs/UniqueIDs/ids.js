var uuid = require('node-uuid');
var uuid2 = require('simple-unique-id');

for(var i=0; i<250;i++){
   var auxuuid = uuid.v1()
   var separado = auxuuid.split('-')
   
  console.log('Salida '+i+' -'+separado[0])
 
}
