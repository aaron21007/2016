'use strict'

const express = require('express')
const app = express()
const mysql = require('mysql')
const limdu = require('limdu');
const LinearRegression = require('shaman').LinearRegression

// app.get('/api/data', (req, res) =>{
//     res.send('Hello World!')
// })
//
// app.listen(3000, () => console.log('Example app listening on port 3000!'))


/* Usando regresion lineal Normal */



var X = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
var Y = [10, 15, 10, 5, 10, 10, 10, 15, 7, 20, 100, 90, 5, 2, 20];
var lr = new LinearRegression(X, Y);
lr.train(function(err) {
  if (err) {
    throw err;
  }
  for (var i = 1; i < 30; i++) {
    console.log('x =' + i + ' ,  y =' + lr.predict(i));
  }

});

console.log('----------------------');
var lr = new LinearRegression(X, Y, {
  algorithm: 'GradientDescent'
});
lr.train(function(err) {
  if (err) {
    throw err;
  }
  for (var i = 1; i < 30; i++) {
    console.log('x =' + i + ' ,  y =' + lr.predict(i));
  }
});

console.log('----------------------');



// Data source: LinkedIn
const data = [
  {'company': 'Microsoft' , 'size': 391259, 'revenue': 90420},
  {'company': 'IBM' , 'size': 400000, 'revenue': 98787},
  {'company': 'Skype' , 'size': 700, 'revenue': 716},
  {'company': 'SAP' , 'size': 48000, 'revenue': 11567},
  {'company': 'Yahoo!' , 'size': 14000 , 'revenue': 6426 },
  {'company': 'eBay' , 'size': 15000, 'revenue': 8700},
];

// Create the data 2D-array (vectors) describing the data
let vectors = new Array();
for (let i = 0 ; i < data.length ; i++) {
  vectors[i] = [ data[i]['size'] , data[i]['revenue']];
}

const kmeans = require('node-kmeans');
kmeans.clusterize(vectors, {k: 2}, (err,res) => {
  if (err) console.error(err);
  else console.log('%o',res);
});


console.log('-------------------------');

var colorClassifier = new limdu.classifiers.Bayesian();

colorClassifier.trainBatch([
	{input: { r: 0.03, g: 0.7, b: 0.5 }, output: 'black'},
	{input: { r: 0.16, g: 0.09, b: 0.2 }, output: 'white'},
	{input: { r: 0.5, g: 0.5, b: 1.0 }, output: 'white2'},
	]);

console.log(colorClassifier.classify({ r: 1, g: 0.4, b: 0 },
		/* explanation level = */1));
