'use strict'
const express = require('express')
const app = express()
const Sequelize = require('sequelize');
const sequelize = new Sequelize('pruebas', 'pruebaSequalize', '123456', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 100
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
    process.exit;
  });
app.get('/inserta', (req, res) => {res.send('Insertando') ;recorido(1, 20)}
)

app.listen(3000, () => console.log('Example app listening on port 3000!'))


function recorido(inicio, fin) {

  if (inicio == fin) {
    return 1
  } else {
    inicio++
    console.log('Recorrido ' + inicio);
    sequelize
      .query(
        `INSERT INTO Usuario (nombre, edad, sexo, puersto) VALUES ('Insercion ${inicio} ', '23', 'masculino', 'Developer ${inicio}');`
      )
      .then(projects => {
        //console.log(projects)
      })
    console.log('Inserto ' + inicio);
    sequelize
      .query(
        'SELECT * FROM Usuario', {
          raw: true
        }
      )
      .then(projects => {
        //console.log(projects)
      })
    console.log('Select ' + inicio);
    recorido(inicio, fin)
  }
}
