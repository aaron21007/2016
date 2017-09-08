var sox = require('sox-stream')
var fs  = require('fs')

fs.createReadStream('output.wav')
	.pipe( sox({ output: { type: 'ogg' } }) )
	.pipe( fs.createWriteStream('song.ogg') )
