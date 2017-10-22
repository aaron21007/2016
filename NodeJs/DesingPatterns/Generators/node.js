'use strict'
const fs = require('fs')


let stream = fs.createWriteStream('texto.txt')

stream.write('Hola fila uno\n')
stream.write('Hola fila dos\n')
stream.write('Hola fila tres\n')
stream.write('Hola fila cuatro\n')
stream.write('Hola fila cinco\n')

let stream2 = fs.createWriteStream('texto2.txt')

stream2.write('Hola fila uno\n')
stream2.write('Hola fila dos\n')
stream2.write('Hola fila tres\n')
stream2.write('Hola fila cuatro\n')
stream2.write('Hola fila cinco\n')




function* validador() {
    yield(fs.open('texto.txt', 'wx', (err, fd) => {
        if (err) {
            if (err.code === 'EEXIST') {
                console.error('myfile already exists');
                return;
            } else {
                console.log('Error pero mi archivo no existe');
            }
            throw err;
        } else {
            console.log('Si errores');
        }
    }))
    
    yield(fs.open('texto2.txt', 'wx', (err, fd) => {
        if (err) {
            if (err.code === 'EEXIST') {
                console.error('myfile already exists 2');
                return;
            } else {
                console.log('Error pero mi archivo no existe 2');
            }
            throw err;
        } else {
            console.log('Si errores 2');
        }
    }))
}

var valida = validador()

valida.next()
valida.next()
// fs.open('texto.txt', 'wx', (err, fd) => {
//     if (err) {
//         if (err.code === 'EEXIST') {
//             console.error('myfile already exists');
//             fs.open('texto2.txt', 'wx', (err, fd) => {
//                 if (err) {
//                     if (err.code === 'EEXIST') {
//                         console.error('myfile already exists 2');
//                         return;
//                     } else {
//                         console.log('Error pero mi archivo no existe 2');
//                     }
//                     throw err;
//                 } else {
//                     console.log('Si errores 2');
//                 }
//             });
//             return;
//         } else {
//             console.log('Error pero mi archivo no existe');
//         }
//         throw err;
//     } else {
//         console.log('Si errores');
//     }
// });
