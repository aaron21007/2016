'use strict'

let bdd = require('../bdd/mysql')

exports.consultarEmpresa =  (empresa)=>{
    return new Promise((resolve, reject)=>{
      bdd.consultar(`select * from Datos WHERE titulo = '${empresa}' `).then(data=>{
        return resolve(data)
      }).catch(err=>{
        return reject(err)
      })
    })
}

this.agregar("Apple Inc. (AAPL)").then((result) => {
    console.log(result);
}).catch((err) => {
    console.error(err);
});