'use strict';
const nano = require('nano')('http://admin:admin@localhost:5984');


let sms_reports = nano.use('demo')

sms_reports.insert({happy: true, demo:"nososmos nosotros"}, 'conejo').then((body) => {
    console.log(body);
});

sms_reports.get('conejo').then((response) => {
    console.log(response);
}).catch((err) => {
    console.error(err);
})

sms_reports.list().then((body) => {
    body.rows.forEach((doc) => {
        console.log(doc);
    });
});


/* Definicion del sistema */
// nano.db.create('sms_reports').then((data) => {
//     // success - response is in 'data'
//     console.log(`Se creo la base de datos`);
// }).catch((err) => {
//     console.error(err);
//     // failure - error information is in 'err'
// })

// nano.db.get('demo').then((body) => {
//     console.log(body);
// })