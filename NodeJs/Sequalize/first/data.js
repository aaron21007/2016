'use strict'
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
recorido(1, 10)




//
// let Usuario = sequelize.define('Usuario',{
//   nombre: Sequelize.STRING,
//   edad: Sequelize.INTEGER,
//   sexo: Sequelize.STRING,
//   puesto: Sequelize.STRING
// })
//
// Usuario.findAll().then(users => {
//   console.log(users)
// })
//sequelize.close()

//
// const User = sequelize.define('user', {
//   username: Sequelize.STRING,
//   birthday: Sequelize.DATE
// });
//
// sequelize.sync()
//   .then(() => User.create({
//     username: 'janedoe',
//     birthday: new Date(1980, 6, 20)
//   }))
//   .then(jane => {
//     console.log(jane.toJSON());
//   });
