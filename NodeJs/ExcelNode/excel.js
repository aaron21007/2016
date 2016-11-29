var express = require('express');
var app = express();



XLSX = require('xlsx');

var workbook = XLSX.readFile('REPORTE_CORTO_GENERADORES_TDC.xlsx');


var first_sheet_name = workbook.SheetNames[0];
var address_of_cell = 'A1';

/* Get worksheet */
var worksheet = workbook.Sheets[first_sheet_name];

/* Find desired cell */
var desired_cell = worksheet[address_of_cell];

//console.log('Tamaño: '+worksheet.length);

/* Get the value */
var desired_value = desired_cell.v;

var data = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[first_sheet_name]);
console.log(data);
console.log(data[0].Folio_MC);
