const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://validateemailaddress.org', {
    waitUntil: 'domcontentloaded'
  });

  await page.waitFor('input[name=email]');

  await page.$eval('input[name=email]', el => el.value = 'aaronluna2223@gmail.com');
  
  await page.click('input[type="submit"]');

  await page.waitForSelector('#middle');

  let datos = await page.$eval('#middle', el => el.innerText)

  console.log(`-- -- -- -- -- -- --`);
  console.log(datos);

  await browser.close();
})();

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