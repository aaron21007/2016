'use strict'

var mysql = require('mysql');

exports.conectar = async () => {

  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'bolsa2',
    password: 'escom123',
    database: 'Bolsa_Mxn'
  });

  return new Promise((resolve, reject)=>{
    connection.connect(function (err) {
      if (err) {
        return reject(`Error en la coenxion de la BD`)
      }else{
        return resolve(connection)
      }
    });
  })

}


exports.consultar = (query)=>{

  return new Promise(async (resolve,reject)=>{
    try {
       let conexion = await this.conectar().then(data=>{ return data}).catch(err=>{ throw err})

       conexion.query(query, (err, results)=>{
            conexion.end();
            return resolve(results)
       })
    } catch (error) {
      console.error(error);
      return reject(err)
    }
  })
}