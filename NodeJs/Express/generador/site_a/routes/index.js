var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* other page */
router.get('/hola', function(req, res, next){
  res.render('hola', {title: 'Hola'})
})

module.exports = router;
