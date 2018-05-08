'use strict'
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()


app.use(bodyParser.json())
app.use(cors())
app.use(morgan('combine'))

app.get('/', function (req, res) {
  res.send({dato: 'Hola mundo'})
})


app.post('/register', (req, res)=>{

    res.send({message:`Hola ${req.body.user} , tu acceso ha sido autorizado`})

})


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
