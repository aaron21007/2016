var wm = require('web-monitoring')
var options = 
{ 
  lapse: 5000,
  percentageDiff: 0.1
}
var wp = wm.monitor('http://www.google.com', options)
      .start()
      .on('start', (url) => console.log(`monitoring of '${url}' start`))
      .on('alert', (url,page) => {
             console.log('page changed')
             wp.stop()
           })
      .on('check', (oldPage, newPage) => {
           })
      .on('error', (err) => console.log(error))