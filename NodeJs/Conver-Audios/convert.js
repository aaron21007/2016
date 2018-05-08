var sox = require('sox-stream')
var fs = require('fs')

fs.createReadStream('input.ogg')
  .pipe(sox({
		output: {

        type: 'mp3'
    }
  }))
  .pipe(fs.createWriteStream('salida_convert.mp3'))
