var Papa = require('papaparse')
var fs = require('fs')

// var data = fs.readFileSync('prueba.txt', 'utf8');
// let data_file = PapaParse.parse(data)
// console.log('------------------------');
// console.log(data_file);
// console.log('------------------------');

// console.log(data_file['data'][0]);
// console.log(data_file['data'][0].indexOf(' Columna'));

// var fruits = ["Banana", "Orange", "Apple", "Mango", "Banana", "Orange", "Apple"];
// var a = fruits.indexOf("Apple", 4);
// console.log(a);

let info = [{
  dificultades_pago: [{
    columna: 'dificultades_pago',
    valor: 'No'
  }],
  durante_2021: [{
    columna: 'durante_2021',
    valor: 'Si'
  }],
  motivos_no_pago: [{
      columna: 'motivos_no_pago',
      valor: 'Desempleo'
    },
    {
      columna: 'motivos_no_pago',
      valor: 'Baja en ingreso'
    },
    {
      columna: 'motivos_no_pago',
      valor: 'Atraso en pagos'
    }
  ],
  si_opcion_utilidad: [{
    columna: 'si_opcion_utilidad',
    valor: 'Periodo de gracia'
  }],
  opcion_competencia: [{
      columna: 'opcion_competencia',
      valor: 'No'
    },
    {
      columna: 'opcion_competencia',
      valor: 'asd'
    }
  ]
}
]
let reporte = Papa.unparse(info, {
  quotes: false, //or array of booleans
  quoteChar: '"',
  escapeChar: '"',
  delimiter: "",
  header: false,
  newline: "\r\n",
  skipEmptyLines: true, //other option is 'greedy', meaning skip delimiters, quotes, and whitespace.
  columns: null //or array of strings
})
let file = `demo.csv`

fs.writeFile(file, reporte, function (err) {
  if (err) {
    console.error(err);
    
  } 
})