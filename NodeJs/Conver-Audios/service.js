const express = require('express')
const app = express()
var sox = require('sox-stream')
var fs  = require('fs')



app.get('/', (req, res) => {
  
  fs.createReadStream('output.wav')
  	.pipe( sox({ output: { type: 'mp3' } }) )
  	.pipe( fs.createWriteStream('song.mp3') ).pipe(res)
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
