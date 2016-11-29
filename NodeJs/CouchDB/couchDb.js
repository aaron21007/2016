var nano = require('nano')('http://localhost:5984');


/* Definicion del sistema */


var db = nano.db.use('node_db');


var data = {
    name: 'pikachu',
    skills: ['thunder bolt', 'iron tail', 'quick attack', 'mega punch'],
    type: 'electric'
};


/* Lista las bases de datos que tenemos */

nano.db.list(function(err, body) {
    // body is an array
    body.forEach(function(db) {
        console.log(db);
    });
});


/* Se trae la informacion de la base de Datos */
nano.db.get('node_db', function(err, body) {
    if (!err) {
        console.log(body);
    }
});


/* Ve los cambios que se han hecho */

nano.db.changes('node_db', function(err, body) {
    if (!err) {
        console.log(body);
    }
});
