'use strict'
const recorder = require('node-record-lpcm16')
const fs = require('fs')

const file = fs.createWriteStream('grabador.wav', {
  encoding: 'binary'
})

const recording = recorder.record()
recording.stream({
        sampleRateHertz: 160000,
        threshold:0,
        silence: (10000*2)/1000,
        keepSilence: true,
        recordProgram: 'rec'
      }).on('error',(err)=>{
          console.error(err);
      }).pipe(file)

// Pause recording after one second
setTimeout(() => {
  recording.pause()
}, 1000)

// Resume another second later
setTimeout(() => {
  recording.resume()
}, 2000)

// Stop recording after three seconds
setTimeout(() => {
  recording.stop()
}, 3000)