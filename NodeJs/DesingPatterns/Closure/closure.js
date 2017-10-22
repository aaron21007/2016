'use strict'

function beta(dato){
    let propiedad =dato
    return function imprime(){
        console.log(`La funcion beta tiene la propiedad : ${propiedad}`);
    }
}

let gamma = beta('azul-chicle')
gamma()
