

var request = require('request');
var Converter = require('csvtojson').Converter;



const express = require('express')
const app = express()

app.get('/getfile', function(req, res) {

  req.pipe(request('https://sms.directo.com/filesCampaigns/CODE_31122016_69_PL1pv.csv', function(error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
  })).pipe(res)


  // request('https://sms.directo.com/filesCampaigns/CODE_31122016_69_PL1pv.csv').pipe(new Converter({
  //   constructResult: true
  // })).on('end_parsed', function(jsonObj) {
  //   console.dir(jsonObj);
  //   res.set({
  //     'content-type': 'text/csv; charset=utf-8'
  //   })
  //   res.send(jsonObj)
  // });
})

app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
})
