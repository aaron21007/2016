/* ****************************************************/
/* *********  Variables Globales del sistema   ********/
/* ****************************************************/

var http = require('http')
var fs = require('fs-extra')
var Papa = require('babyparse')

/* ****************************************************/
/* *******  Logica del sistema para las URL's  ********/
/* ****************************************************/

fs.readFile('/home/aaron/Documentos/Developer/2016/NodeJs/BigFiles/file_x.csv', 'utf8', function(error, data) {
        if (error) {
            console.log('Error al leer el archivo de entrada:' + error);
        }
        var columnaTelefono

        var filas = Papa.parse(data, {
            skipEmptyLines: true,
            fastMode: true
        }).data

        /* ************** Aqui se obtiene la columna en donde esta el # *************/

        if ('true' === 'true') {
            var headerCampos = filas[0].toString().split(',')

            for (var i = 0; i < headerCampos.length; i++) {
                var columnaLimpia = '{Telefono}'.replace('{', '').replace('}', '').replace(/\"/g, '')

                if (columnaLimpia === headerCampos[i].replace('\n', '').replace('\r', '').replace(/\"/g, '')) {
                    columnaTelefono = i
                }
            }
        } else {
            columnaTelefono = '{Telefono}'.replace('{Column', '').replace('}', '')
        }

        /* ******** Aqui se parsea el mensaje *********/
        var mensajeAenviar = ''
        var mensajeColumnas = []
        if ('{Mensaje}'.indexOf('{') > -1) {
            if ('true' === 'true') {
                var message_array = '{Mensaje}'.split(/{(.*?)}/)
                headerCampos = filas[0].toString().split(',')
                for (var k = 0; k < message_array.length; k++) {
                    var bandera = 'no'
                    for (var j = 0; j < headerCampos.length; j++) {

                        if (message_array[k].replace('\n', '').replace('\r', '') == headerCampos[j].replace('\n', '').replace('\r', '').replace(/\"/, '').replace(/\"/, '')) {
                            mensajeColumnas.push(j)
                            bandera = 'si'
                        }
                    }
                    if (bandera == 'no' && message_array[k] != '') {
                        mensajeColumnas.push(message_array[k])
                    }
                }
            } else {
                message_array = '{Mensaje}'.split(/{(.*?)}/)
                for (var x = 0; x < message_array.length; x++) {
                    if (message_array[x].indexOf('Column') > -1) {
                        var aux = message_array[x].replace('Column', '')
                        mensajeColumnas.push(aux)
                    } else {
                        if (message_array[x] !== '') {
                            mensajeColumnas.push(message_array[x])
                        }
                    }
                }
            }
        } else {
            mensajeAenviar = '{Mensaje}'
        }

        /* *****Envia el numero total de filas  *********/
        var total_rows_real = 50010

        /* ***************************************************/

        /* **********A qui realiza el envio de los sms ************/
        for (i = 0; i < filas.length; i++) {
            if (('true' === 'true') && i === 0) {
                // nada
            } else {
                if (filas[i].length > 0) {

                    var info2;
                    var info;
                    try {
                        info2 = Papa.parse(filas[i].toString(), {
                            delimiter: ",",
                            fastMode: false
                        }).data

                        //var info = filas[i].toString().split(',')
                        info = info2[0]
                    } catch (err) {
                        console.log("Algo paso pero sigue:" + err)
                    }


                    if (mensajeColumnas.length > 0) {
                        mensajeAenviar = ''
                        for (var h = 0; h < mensajeColumnas.length; h++) {
                            if (mensajeColumnas[h] <= 100) {
                                if (typeof info[mensajeColumnas[h]] !== 'undefined') {
                                    mensajeAenviar = mensajeAenviar + info[mensajeColumnas[h]]
                                } else {
                                    mensajeAenviar = mensajeAenviar + ' '
                                }
                            } else {
                                if (typeof mensajeColumnas[h] !== 'undefined') {
                                    mensajeAenviar = mensajeAenviar + mensajeColumnas[h]
                                } else {
                                    mensajeAenviar = mensajeAenviar + ' '
                                }
                            }
                        }
                    }

                    if (info[columnaTelefono]) {
                        console.log('Envia la info: ' + filas[i].toString() + ' ' + mensajeAenviar.replace('\r', '').replace('\n', ''));

                    } else {
                        console.log('Envia la info: ' + filas[i].toString() + ' ' + mensajeAenviar.replace('\r', '').replace('\n', ''));
                    }
                } else {
                    // No hay nada en la fila,  se manda en blanco
                }
            }
        }
    })
    /* *******************************************/
