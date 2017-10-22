'use strict'
var firstMethod = function(cadena) {
    var promise = new Promise(function(resolve, reject) {
        setTimeout(function() {
            console.log(cadena);
            resolve(cadena);
        }, 2000);
    });
    return promise;
};

var secondMethod = function(cadena) {
    var promise = new Promise(function(resolve, reject) {
        setTimeout(function() {
            cadena = cadena + ' - segundo metodo'
            console.log(cadena);
            resolve(cadena);
        }, 2000);
    });
    return promise;
};

var thirdMethod = function(cadena) {
    var promise = new Promise(function(resolve, reject) {
        setTimeout(function() {

            cadena = cadena + ' - tercero metodo'
            console.log(cadena);
            resolve(cadena);
        }, 3000);
    });
    return promise;
};


    firstMethod('primer metodo ')
        .then(secondMethod)
        .then(thirdMethod)
        .catch((err) => {
            console.error('Error XXXX32312XXX \n')
            console.error(err);
        })
