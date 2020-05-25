const puppeteer = require('puppeteer');
const express = require('express')
let bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json({
  limit: '50mb',
  extended: true
}))
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}))



const dale = async (emailData) => {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://validateemailaddress.org', {
    waitUntil: 'load'
  });

  await page.waitFor('input[name=email]');

  await page.type('input[name=email]', emailData)
  
  await page.click('input[type="submit"]');

  await page.waitForSelector('#middle');

  let datos = await page.$eval('#middle', el => el.innerText)

  let lineas = datos.split("\n")

  console.log(`................`);
  lineas = lineas.filter(function(e){
    return e
  })
  console.log(lineas);
  let resultado=''
  for (let i = 0; i < lineas.length; i++) {
    if (lineas[i].includes(emailData)) {
        resultado = lineas[i]
        break;
    }
  }
  await browser.close();

  return resultado;
}



app.get('/validaEmail', (req, res) => {
  let email = req.query.email
  dale(email).then((result) => {
    res.json({email: email, resultado: result})
  }).catch((err) => {
    console.error(err);
    res.json({
      email: email,
      resultado: 'Invalido'
    })
  });
});

app.listen(1331, () => console.log(`API en puerto :  HTTP!`))

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto('https://en.wikipedia.org', {
//     waitUntil: 'networkidle2'
//   });

//   await page.waitFor('input[name=search]');

//   // await page.type('input[name=search]', 'Adenosine triphosphate');
//   await page.$eval('input[name=search]', el => el.value = 'Adenosine triphosphate');

//   await page.click('input[type="submit"]');
//   await page.waitForSelector('#mw-content-text');
//   const text = await page.evaluate(() => {
//     const anchor = document.querySelector('#mw-content-text');
//     return anchor.textContent;
//   });
//   console.log(text);
//   await browser.close();
// })();