'use strict'

var find = require('findit')
var path = require('path');
let finder = find(__dirname)

let archivosArray = []

let directorio =  new Promise(async(resolve, reject)=>{
      finder.on('directory', function (dir, stat, stop) {
        var base = path.basename(dir);
        if (base === '.git' || base === 'node_modules') stop()
        else console.log('-->' + dir + '/')
        resolve('Listo')
      });
})

let archivos = new Promise((resolve, reject)=>{
      finder.file(function (file, stat) {
        resolve(file)
      });
})

Promise.all([directorio, archivos]).then(data=>{
  console.log(data);
}).catch(err=>{
  console.error(err);
})