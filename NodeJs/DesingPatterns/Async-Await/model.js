var mysql = require('mysql');
var connection = mysql.createConnection({
  host: '127.0.0.1',
  port: '8889',
  user: 'test',
  password: 'test123#',
  database: 'trato'
});

connection.connect();

/********** Con Nueva Version de Node ***********/


forci()

async function forci(){
  for (var i = 0; i < 10; i++) {
    await data(i)
  }
  connection.end();
}

async function data(position) {
  var data = await connection.query(`INSERT INTO data (nombre) VALUES ('nombre ${position}')`);
  console.log(`Inserta ${position}`);
  let aux  = (Math.random()*60)+15
  var data = await connection.query(`UPDATE data set edad = '${position} - ${aux}' WHERE nombre ='nombre ${position}'`);
  console.log(`Actualiza ${position}`);
}

/***************************************************/


/********** SIN Nueva Version de Node ***********/
// for (var i = 0; i < 10; i++) {
//   connection.query(`INSERT INTO data (nombre) VALUES ('nombre ${i}')`, function(err, result) {
//     let aux  = (Math.random()*60)+15
//     connection.query(`update data set edad = '${i} - ${aux}' WHERE nombre ='nombre ${i}'`, function(){
//     })
//   });
// }
//
// connection.end();
/***************************************************/
