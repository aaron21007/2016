/************* Variables del entorno del servicio *************/
const http = require('http');
const hostname = '192.168.40.74';
const port = 3000;

/************Variables de modulos ***************/
var MongoClient = require('mongodb').MongoClient;
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var fs = require('fs-extra');
var JSONStream = require('JSONStream');
var es = require('event-stream');
var assert = require('assert');
var json2csv = require('json2csv');
var url = 'mongodb://69.42.101.137:27017/mecca';

var objeto= new Array();
var filasTotales = 0;
/***************Variables de Funciones  ***********/

var findTraffict = function(db, callback) {
    console.log("Antes de  FIND");
    objeto = [];
   var cursorTraffict =db.collection('trafficLog').find( ).limit(2);
    console.log("Despues del FIND");
    var i=1;
    var wstream = fs.createWriteStream("salida.txt");

    wstream.once('open', function(fd) {
       cursorTraffict.each(function(err, doc) {
          assert.equal(err, null);
          if (doc != null) {

            objeto.push(doc);
             //console.log(doc);
          } else {
             wstream.end();
             callback();
          }
       });

    });

};


var findTraffictByDate= function(db, callback) {
    console.log("Antes de  FIND Date");
    objeto = [];
    var cursorTraffict = db.collection('trafficLog').find({"BillingDate": "2015-12-07 00:00:00"}).limit(100000);
    var cursorVendor = db.collection('vendorBroker').find();
    var cursorCustomer = db.collection('customerBroker').find();


    console.log("Despues del FIND Date");


     cursorTraffict.each(function(err, trafficDoc) {
        assert.equal(err, null);
        if (trafficDoc != null) {

          objeto.push(trafficDoc);

        } else {
           callback();
        }
     });




};

var findCustomer = function(db, callback) {
    console.log("Antes de  FIND");
    objeto = [];

   var cursorCustomer =db.collection('customerBroker').find( );
    console.log("Despues del FIND");
    var i=1;
    var wstream = fs.createWriteStream("salida.txt");


    wstream.once('open', function(fd) {
       cursorCustomer.each(function(err, doc) {
          assert.equal(err, null);
          if (doc != null) {

            objeto.push(doc);
             //console.log(doc);
          } else {
             wstream.end();
             callback();
          }
       });

    });

};

var findVendor = function(db, callback) {
    console.log("Antes de  FIND");
    objeto = [];

   var cursorVendor =db.collection('vendorBroker').find( );

    console.log("Despues del FIND");
    var i=1;
    var wstream = fs.createWriteStream("salida.txt");

    wstream.once('open', function(fd) {
       cursorVendor.each(function(err, doc) {
          assert.equal(err, null);
          if (doc != null) {

            objeto.push(doc);

             //console.log(doc);
          } else {
             wstream.end();
             callback();
          }
       });

    });

};

/*************Servicio en si  ***************/
http.createServer((req, res) => {

	if(req.url =="/traffic"){

        MongoClient.connect(url, function(err, db) {
           assert.equal(null, err);
           findTraffict(db, function() {
             db.close();
             res.writeHead(200, { 'Content-Type': 'application/json'});
             res.end('{\"resp\": \"200\",\"desc\": \"ok\", \"resultset\":'+JSON.stringify(objeto)+' }');
           });
        });

	}else if(req.url =="/Customer"){
        MongoClient.connect(url, function(err, db) {
           assert.equal(null, err);
           findCustomer(db, function() {
             db.close();
             res.writeHead(200, { 'Content-Type': 'application/json'});
             res.end('{\"resp\": \"200\",\"desc\": \"ok\", \"resultset\":'+JSON.stringify(objeto)+' }');
           });
        });
  }else if(req.url =="/Vendor"){
        MongoClient.connect(url, function(err, db) {
           assert.equal(null, err);
           findVendor(db, function() {
             db.close();
             res.writeHead(200, { 'Content-Type': 'application/json'});
             res.end('{\"resp\": \"200\",\"desc\": \"ok\", \"resultset\":'+JSON.stringify(objeto)+' }');
           });
        });
  }else if(req.url =="/bydate"){
        MongoClient.connect(url, function(err, db) {
           assert.equal(null, err);
           findTraffictByDate(db, function() {
             db.close();
             res.writeHead(200, { 'Content-Type': 'application/json'});
             res.end('{\"resp\": \"200\",\"desc\": \"ok\", \"resultset\":'+JSON.stringify(objeto)+' }');
           });
        });
  }else if(req.url =="/report1"){

      var db = new Db('mecca', new Server('69.42.101.137', 27017));
      db.open(function(err, db){
          var cursorTraffict = db.collection('trafficLog').find({"BillingDate": "2015-12-07 00:00:00"}).limit(100000);



          cursorTraffict.toArray(function(err, traffictDocs){
                  db.close();
                  res.writeHead(200, { 'Content-Type': 'application/json'});
                  res.end('{\"resp\": \"200\",\"desc\": \"ok\" , \"size\": '+traffictDocs.length+', \"resultset\":'+JSON.stringify(traffictDocs)+' }');
          });
      });

  }else if(req.url =="/report2"){

      var db = new Db('mecca', new Server('69.42.101.137', 27017));
      db.open(function(err, db){
          var cursorTraffict = db.collection('trafficLog').find({"BillingDate": "2016-01-05 00:00:00"}).limit(10000);
          var cursorVendor = db.collection('vendorBroker').find();
          var cursorCustomer = db.collection('customerBroker').find();

          var centinela = 0;

          cursorTraffict.toArray(function(err, traffictDocs){
                cursorVendor.toArray(function(err, vendorDocs){
                  var data = new Array();
                  for(var i=0 ;i<traffictDocs.length;i++){
                    var vendorBroker = "Sin vendorBroker";

                    for (var j = 0; j < vendorDocs.length; j++) {
                      if(traffictDocs[i].Vendor == vendorDocs[j].Vendor){
                          vendorBroker = vendorDocs[j].VendorBroker;
                      }
                    }
                    var cosa = {Vendor:traffictDocs[i].Vendor, VendorBroker: vendorBroker};
                    data[i] = cosa;

                  }
                  db.close();
                  res.writeHead(200, { 'Content-Type': 'application/json'});
                  res.end('{\"resp\": \"200\",\"desc\": \"ok\", \"resultset\":'+JSON.stringify(data)+' }');

                });
          });
      });

  }else if(req.url =="/report3"){

      var db = new Db('mecca', new Server('69.42.101.137', 27017));
      db.open(function(err, db){
          var cursorTraffict = db.collection('trafficLog').find({"BillingDate": "2016-01-05 00:00:00"}).limit(10000);
          var cursorVendor = db.collection('vendorBroker').find();
          var cursorCustomer = db.collection('customerBroker').find();

          var centinela = 0;

          cursorTraffict.toArray(function(err, traffictDocs){
                cursorVendor.toArray(function(err, vendorDocs){
                      cursorCustomer.toArray(function(err, customerDocs){
                            var data = new Array();
                            for(var i=0 ;i<traffictDocs.length;i++){
                              var vendorBroker = "Sin vendorBroker";
                              var customerBroker = "Sin customerBroker";


                              for (var j = 0; j < vendorDocs.length; j++) {
                                if(traffictDocs[i].Vendor == vendorDocs[j].Vendor){
                                    vendorBroker = vendorDocs[j].VendorBroker;
                                }
                              }

                              for (var j = 0; j < customerDocs.length; j++) {
                                if(traffictDocs[i].Vendor == customerDocs[j].Customer){
                                    customerBroker = customerDocs[j].Customer;
                                }
                              }

                              var cosa = {Vendor:traffictDocs[i].Vendor, VendorBroker: vendorBroker, Customer:traffictDocs[i].Customer, CustomerBroker:customerBroker};
                              data[i] = cosa;

                            }
                            db.close();
                            res.writeHead(200, { 'Content-Type': 'application/json'});
                            res.end('{\"resp\": \"200\",\"desc\": \"ok\", \"resultset\":'+JSON.stringify(data)+' }');
                      });
                });
          });
      });

  }else if(req.url =="/reportExcel"){

      var db = new Db('mecca', new Server('69.42.101.137', 27017));
      db.open(function(err, db){
          var cursorTraffict = db.collection('trafficLog').find({"BillingDate": "2016-01-05 00:00:00"});
          var cursorVendor = db.collection('vendorBroker').find();
          var cursorCustomer = db.collection('customerBroker').find();

          var centinela = 0;

          cursorTraffict.toArray(function(err, traffictDocs){
                cursorVendor.toArray(function(err, vendorDocs){
                      cursorCustomer.toArray(function(err, customerDocs){
                            var data = new Array();
                            var wstream = fs.createWriteStream("complete_report.csv");
                            wstream.once('open', function(fd) {
                              wstream.write("\"Vendor\",\"VendorBroker\",\"Customer\",\"CustomerBroker\" ");
                                for(var i=0 ;i<traffictDocs.length;i++){
                                      var vendorBroker = "Sin vendorBroker";
                                      var customerBroker = "Sin customerBroker";


                                      for (var j = 0; j < vendorDocs.length; j++) {
                                        if(traffictDocs[i].Vendor == vendorDocs[j].Vendor){
                                            vendorBroker = vendorDocs[j].VendorBroker;
                                        }
                                      }

                                      for (var j = 0; j < customerDocs.length; j++) {
                                        if(traffictDocs[i].Vendor == customerDocs[j].Customer){
                                            customerBroker = customerDocs[j].Customer;
                                        }
                                      }

                                      var cosa = {Vendor:traffictDocs[i].Vendor, VendorBroker: vendorBroker, Customer:traffictDocs[i].Customer, CustomerBroker:customerBroker};
                                      data[i] = cosa;
                                      wstream.write("\""+traffictDocs[i].Vendor+"\",\""+vendorBroker+"\",\""+traffictDocs[i].Customer+"\",\""+customerBroker+"\" ");
                                }
                                wstream.end();
                            });
                            db.close();
                            res.writeHead(200, { 'Content-Type': 'application/json'});
                            res.end('{\"resp\": \"200\",\"desc\": \"ok\", \"resultset\":'+JSON.stringify(data)+' }');
                      });
                });
          });
      });

  }else if(req.url =="/reportExcel2"){

      var db = new Db('mecca', new Server('69.42.101.137', 27017));
      db.open(function(err, db){
          var cursorTraffict = db.collection('trafficLog').find({"BillingDate": "2016-01-05 00:00:00"}).limit(200000);
          var cursorVendor = db.collection('vendorBroker').find();
          var cursorCustomer = db.collection('customerBroker').find();

          var centinela = 0;
          console.log("Traffict")
          cursorTraffict.toArray(function(err, traffictDocs){
                console.log("Vendor")
                cursorVendor.toArray(function(err, vendorDocs){
                      console.log("Customer")
                      cursorCustomer.toArray(function(err, customerDocs){
                            var data = new Array();
                            var fields = ['Vendor', 'VendorBroker', 'Customer', 'CustomerBroker'];

                                console.log("Antes del For")
                                for(var i=0 ;i<traffictDocs.length;i++){
                                      var vendorBroker = "Sin vendorBroker";
                                      var customerBroker = "Sin customerBroker";


                                      for (var j = 0; j < vendorDocs.length; j++) {
                                        if(traffictDocs[i].Vendor == vendorDocs[j].Vendor){
                                            vendorBroker = vendorDocs[j].VendorBroker;
                                        }
                                      }

                                      for (var j = 0; j < customerDocs.length; j++) {
                                        if(traffictDocs[i].Vendor == customerDocs[j].Customer){
                                            customerBroker = customerDocs[j].Customer;
                                        }
                                      }

                                      var cosa = {Vendor:traffictDocs[i].Vendor, VendorBroker: vendorBroker, Customer:traffictDocs[i].Customer, CustomerBroker:customerBroker};
                                      data[i] = cosa;

                                }
                                console.log("Despues del FOR")

                                json2csv({ data: data, fields: fields }, function(err, csv) {
                                  if (err) console.log(err);
                                  fs.writeFile('file.csv', csv, function(err) {
                                    if (err) throw err;
                                    console.log('file saved');
                                    db.close();
                                    res.writeHead(200, { 'Content-Type': 'application/json'});
                                    res.end('{\"resp\": \"200\",\"desc\": \"ok\" }');
                                  });
                                });


                      });
                });
          });
      });

  }else if(req.url =="/reportExcel3"){



    var Schema  = mongoose.Schema;

    var trafficLogSchema = new Schema({
      TotalCost: String,
      RegionPrefix: String,
      BillableCalls: String,
      price: String,
      cost: String,
      CustPrefix: String,
      tCalls: String,
      Type: String,
      Week: String,
      TotalPrice: String,
      Vendor: String,
      RA: String,
      VendorMinutes: String,
      Class: String,
      Customer: String,
      Country: String,
      Region: String,
      VendorPrefix: String,
      BillingDate: String,
      Month: String,
      CustMinutes: String,
      Year: String,
      LMC: String
    });

    var Model = mongoose.model('trafficLog', trafficLogSchema);


    Model.find({}, function (err, docs) {
      console.log(docs);
      res.writeHead(200, { 'Content-Type': 'application/json'});
      res.end('{\"resp\": \"200\",\"desc\": \"ok\" }');
    });


  }else if(req.url =="/stream"){
    var db = new Db('mecca', new Server('69.42.101.137', 27017));
    db.open(function(err, db){
        var cursorTraffict = db.collection('trafficLog').find({"BillingDate": "2015-12-07 00:00:00"}).limit(20000);
        var cursorVendor = db.collection('vendorBroker').find();
        var cursorCustomer = db.collection('customerBroker').find();

        console.log("Paso Cursor Traffict")


        var algo;
        cursorTraffict.stream().pipe(JSONStream.stringify()).pipe(algo);
        res.writeHead(200, { 'Content-Type': 'application/json'});
        res.end('{\"resp\": \"200\",\"desc\": \"ok\", \"resultset\":'+algo+' }');



        // var stream = cursorTraffict.stream({
        //   transform: function(doc) {
        //     return JSON.stringify(doc);
        //   }
        // });
        //
        // stream.on('data', function(doc) {
        //   console.log("Documento Cargado");
        // });
        //
        // stream.once('end', function() {
        //   console.log("Acabo");
        //   db.close();
        // });


    });
  }else{
		  res.writeHead(200, { 'Content-Type': 'text/plain' });
   		res.end('Home Mecca 2.0\n');
	}

}).listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
