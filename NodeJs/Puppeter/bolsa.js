const puppeteer = require('puppeteer');
const mysql = require('mysql')
const moment = require('moment')
const cron = require('node-cron');


var connection = mysql.createConnection({
  host: 'localhost',
  user: 'bolsa2',
  password: 'escom123',
  database: 'Bolsa_Mxn'
});

connection.connect();




const acciones = ['AAPL', 'MSFT', 'GCARSOA1.MX', 'ALPEKA.MX']

const dale = async (accion) =>{
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(`https://finance.yahoo.com/quote/${accion}?p=${accion}&.tsrc=fin-srch`, {
        waitUntil: 'domcontentloaded'
      });

      let datos = await page.$eval('#quote-header-info', el => el.innerText.split("\n"))
      datos = datos.filter(function (e) {
        return e
      });
      console.log(`-- -- -- -- -- -- --`);
      console.log(datos);

      let empresa = ''
      let precio=0

      for (let i = 0; i < datos.length; i++) {
        if (datos[i].includes("At close") || (datos[i].includes("Market open")) ) {
          empresa = datos[0]
          precio = datos[i-1].split(" ")[0]
          console.log(`A---> ${empresa}  ---->  ${precio}`);
          
          
          
          if (precio.match(/[0-9\.]*\+/g) != null) {
             precio = precio.match(/[0-9\.]*\+/g)[0].replace("+", "")
          }else{
            precio = precio.match(/[0-9\.]*\-/g)[0].replace("-", "")
          }
         console.log(`B---> ${empresa}  ---->  ${precio}`);

          let post = {
            fecha: moment().format("YYYY-MM-DD HH:mm:ss"),
            valor: precio,
            titulo: empresa
          }
          connection.query('INSERT INTO Datos SET ?', post, function (error, results, fields) {
            if (error) throw error;
            // Neat!
          });
        }
        
      }
      
      await browser.close();
}

cron.schedule('* * * * *', () => {
  acciones.forEach(async element => {
    await dale(element)
  });
});

