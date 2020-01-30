var soap = require('soap-server');

function MyTestService() {}
MyTestService.prototype.test1 = function (myArg1, myArg2) {
  return myArg1 + myArg2;
};

MyTestService.prototype.resta = function (myArg1, myArg2) {
  return myArg1 - myArg2;
};

MyTestService.prototype.multi = function (myArg1, myArg2) {
  return myArg1 * myArg2;
};

var soapServer = new soap.SoapServer();
var soapService = soapServer.addService('operaciones', new MyTestService());

soapServer.listen(1337, '127.0.0.1');