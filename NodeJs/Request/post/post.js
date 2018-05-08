'use strict'
const request = require('request')

var options = {
  method: 'POST',
  url: 'http://148.243.86.45/doLogin.action?useVerify=0',
  headers: {
    Cookie: 'JSESSIONID=446C815A24C1D2146CF1B6A7DF450BA9',
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  form: {
    vendorId: '1',
    domain: '-',
    userName: 'root',
    password: '',
    verification: '',
    serial: 'BK3WJ3ZvfMmBpZCxi5MtIg=='
  }
};

request(options, function(error, response, body) {
  if (error) throw new Error(error);
  console.log(response);
});
