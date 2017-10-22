'use strict'
const fs = require('fs')


var escritura = function() {
    return new Promise((resolve, reject) => {
        var file_name = 'file_jc_2.txt'
        //var writter_stream = fs.createWriteStream(file_name, 'utf8')
        //writter_stream.write('Hola')
        return resolve(file_name)
        console.log('Deberia de imprimir');
    })
}

var lectura = function(file_name) {
    console.log('Parametro de Pasado: ' + file_name);
    return new Promise((resolve, reject) => {
        try {
            fs.readFile(file_name, 'utf8', function(err, data) {
                if (err) {
                     reject(err)
                     
                }else{
                    return resolve(data)
                }
            });
        } catch (e) {
             reject('Valio:' + e)
        }
    })
}


escritura()
    .then(lectura)
    .then((data) => {
        console.log(`Resultado Final: ${data}`);
    })
    .catch((error) => {
        console.error(`ERROR: ${error}`);
    })
