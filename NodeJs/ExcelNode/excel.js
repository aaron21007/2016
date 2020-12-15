const ExcelJS = require('exceljs')
const workbook = new ExcelJS.Workbook();
workbook.creator = 'Voices Comunicaciones';
workbook.lastModifiedBy = 'Her';
workbook.created = new Date(1985, 8, 30);
workbook.modified = new Date();
workbook.lastPrinted = new Date(2016, 9, 27);

let data = [{
  campo1:"Hola soy cmapo 1",
  numero: "5580307902",
  campo2: "Aqui campo 2",
  campo3: "Soy campo 3 , señor",
  campo4: "Andale andale",
  campo5: "Que pasa brother",
  estatus: "Entregado"

}, {
  campo1: "Hola soy cmapo 1",
  numero: "5580307902",
  campo2: "Aqui campo 2",
  campo3: "Soy campo 3 , señor",
  campo4: "Andale andale",
  campo5: "Que pasa brother",
  estatus: "Fallido"

}]

let demo = {
  campo1: "Hola soy cmapo 1",
  numero: "5580307902",
  campo2: "Aqui campo 2",
  campo3: "Soy campo 3 , señor",
  campo4: "Andale andale",
  campo5: "Que pasa brother",
  estatus: "Fallido"

}

const hoja1 = workbook.addWorksheet('ENVIADOS');

hoja1.columns = [{
    header: 'Campo 1',
    key: 'campo1'
  },
  {
    header: 'Numero',
    key: 'numero'
  },
  {
    header: 'Campo 2',
    key: 'campo2'
  },
  {
    header: 'Campo 3',
    key: 'campo3'
  },
  {
    header: 'Campo 4',
    key: 'campo4'
  },
  {
    header: 'Campo 5',
    key: 'campo5'
  }, {
    header: 'Estatus',
    key: 'estatus'
  }
]

// create new sheet with pageSetup settings for A4 - landscape
const hoja2 = workbook.addWorksheet('NO ENVIADOS');
hoja2.columns = [{
    header: 'Campo 1',
    key: 'campo1'
  },
  {
    header: 'Numero',
    key: 'numero'
  },
  {
    header: 'Campo 2',
    key: 'campo2'
  },
  {
    header: 'Campo 3',
    key: 'campo3'
  },
  {
    header: 'Campo 4',
    key: 'campo4'
  },
  {
    header: 'Campo 5',
    key: 'campo5'
  }, {
    header: 'Estatus',
    key: 'estatus'
  }
]


data.forEach(e => {
   hoja1.addRow({...e})
});

hoja2.addRow(demo)

workbook.xlsx.writeFile('Debtors.xlsx')