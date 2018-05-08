'use strict'
const express = require('express')
const app = express()
const fs = require('fs')
const csv = require('fast-csv');
const redis = require('redis');
const async = require('async')

app.get('/generate', (req, res) => {
  res.setHeader("content-type", "text/csv");
  res.setHeader('Content-disposition', 'attachment; filename=data_dumped.csv');
  let wstream = fs.createWriteStream('myOutput.csv');
  wstream.write('id_leads,leads_name,phone_number,callerid,context,trunk,prefix,attempts,status,result,result_date,start_date,start_time,end_date,end_time,attempt_call,inuse,data1,data2,data3,uid,nir\n');
  var redis_connection = redis.createClient();
  redis_connection.select(0, function() { /* ... */ })


  res.send('Generando Archivo')

  var promesa1 = function(nir) {
    return new Promise(function(resolve, reject) {
      redis_connection.keys(nir + '*', function(err, reply) {
        if (err) {
          reject(err)
        } else {
          console.log(reply.length);
          resolve(reply)
        }
      })
    });
  }
  var promesa2 = function(data) {
    return new Promise((resolve, reject) => {
      let centinela = 1
      for (var i = 0; i < 1000; i++) {

        redis_connection.hgetall(data[i], function(err, obj) {
          if (err) {
            console.error('Fallo:' + err);
            reject(err)
          } else {
            let keys = Object.keys(obj)
            for (var j = 0; j < keys.length; j++) {
              let metaDataKey = keys[j].split('-')
              let metaData = obj[keys[j]].split(':')
              let nirSerie = metaDataKey[0]
              let inicio = parseInt(metaData[0])
              let fin = parseInt(metaData[1])
              for (var k = inicio; k < fin; k++) {
                let complemento = ''
                if (k.toString().length == 1) {
                  complemento = '000' + k.toString()
                } else if (k.toString().length == 2) {
                  complemento = '00' + k.toString()
                } else if (k.toString().length == 3) {
                  complemento = '0' + k.toString()
                } else {
                  complemento = k.toString()
                }
                wstream.write('86623001,ACAPULCO,' + nirSerie + complemento + ',5570991415,ENCUESTA-C,SANTANDER,3658521,1,0,,,11/17/2017,09:00:00,11/30/2017,21:00:00,1,0,ACAPULCO,NULL,NULL,"NULL",744' + nirSerie + complemento + ' \n')
                //res.send('1,2,3,4,' + nirSerie + complemento + ' \n')
              }
            }
            if (centinela == data.length) {
              resolve('Salio')
              console.log('SALIO ------------------------------------->');
            } else {
              console.log('Centinela: ' + centinela);
            }
          }
          centinela++
        })
      }
    })
  }
  console.log('Antes de las promesas');
  async.waterfall([
    function(callback) {
      console.log('Paso 1')
      promesa1('55')
        .then(promesa2)
        .then(callback(null, 'one', 'two'))
        .catch((err) => {
          console.error(err);
        })
    },
    function(arg1, arg2, callback) {
      // arg1 now equals 'one' and arg2 now equals 'two'
      setTimeout(function() {
        console.log('Paso 2');
        callback(null, 'three');
      }, 100);

    },
    function(arg1, callback) {
      // arg1 now equals 'three'
      setTimeout(function() {
        console.log('Paso 3');
        callback(null, 'done');
      }, 100);

    }
  ], function(err, result) {
    console.log('FINAL');

      wstream.end();

      // var csvStr = csv.createWriteStream({
      //   headers: true
      // });
       // fs.createReadStream("./myOutput.csv").pipe(res);
      console.log('Despues de las promesas');
  });





})


app.listen(3000, () => console.log('Example app listening on port 3000!'))
