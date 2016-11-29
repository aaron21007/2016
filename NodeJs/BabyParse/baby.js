var Papa = require('babyparse')
var fs = require('fs-extra')
var ruta = '/home/aaron/Documentos/Developer/2016/NodeJs/BabyParse/'


var results = Papa.parse(ruta + 'REPORTE_CORTO_GENERADORES_TDC.xlsx', {
    header: true
});
