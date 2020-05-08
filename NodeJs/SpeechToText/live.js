'use strict'
/** *
 * export GOOGLE_APPLICATION_CREDENTIALS="/Users/aaronluna/Documents/Code_Library_2/NodeJs/SpeechToText/speech-to-tex-233018-ca8edbbdcd0f.json"
*/
const chalk = require('chalk')
const {Transform} = require('stream')
const recorder = require('node-record-lpcm16')
const speech = require('@google-cloud/speech')

const client = new speech.SpeechClient();

const config = {
  encoding: 'LINEAR16',
  sampleRateHertz: 16000,
  languageCode: 'es-MX'
}

const request = {
  config,
  interimResults:true
}

const STREAMING_LIMIT = 10000;
let recognizeStream = null;
let restartCounter = 0
let audioArray = []
let lastAudioArray = []
let resultEndTime = 0
let isFinalEndTime = 0
let finalRequestEndTime = 0
let timeOffset = 0
let newStream = true
let bridgingOffset = 0
let lastTranscriptWasFinal = false

function startStream(){
  audioArray = []

  recognizeStream = client.streamingRecognize(request).on('error', (err)=>{

  }).on('data', speechCallback);

  //setTimeout(restartStream, STREAMING_LIMIT);
}

const audioStreamTransform = new Transform({
  transform: (chunk, encoding, callback)=>{
    if (newStream && (lastAudioArray.length != 0)) {
        let chunkTime =  STREAMING_LIMIT / lastAudioArray.length
        if (chunkTime != 0) {
          if (timeOffset < 0) {
            timeOffset = 0
          }
          if (timeOffset > finalRequestEndTime) {
            timeOffset = finalRequestEndTime
          }
          let chunksFromMS = Math.floor((finalRequestEndTime-timeOffset)/chunkTime)
          bridgingOffset = Math.floor((lastAudioArray.length - chunksFromMS)* chunkTime)
          timeOffset = (lastAudioArray.length -chunksFromMS) * chunkTime

          for (let i = chunksFromMS; i < lastAudioArray.length; i++) {
            recognizeStream.write(lastAudioArray[i])
          }
          
        }
        newStream = false
    }
    audioArray.push(chunk)
    if (recognizeStream != null) {
      recognizeStream.write(chunk)
    }
    callback()
  }
})

const speechCallback = (stream) =>{
    resultEndTime = stream.results[0].resultEndTime.seconds * 1000 + Math.round(stream.results[0].resultEndTime.nanos/1000000)
    let correctedTime = resultEndTime -bridgingOffset + (STREAMING_LIMIT * restartCounter)

    process.stdout.clearLine()
    process.stdout.cursorTo(0)
    let stdoutText = ` \n\n Reached transcription time limit, press Ctrl+C \n`
    if (stream.results[0] && stream.results[0].alternatives[0]) {
       stdoutText = correctedTime + ' : '+ stream.results[0].alternatives[0].transcript
    }

    if (stream.results[0].isFinal) {
      process.stdout.write(chalk.green(`${stdoutText}\n`))
      isFinalEndTime = resultEndTime
      lastTranscriptWasFinal = true      
    }else{
      if (stdoutText.length > process.stdout.columns) {
          stdoutText = stdoutText.substring(0, process.stdout.columns -4) + '...'
      }
      process.stdout.write(chalk.red(`${stdoutText}`))
      lastTranscriptWasFinal = false
    }
}

function restartStream (){

  if (recognizeStream) {
      recognizeStream.removeListener('data', speechCallback)
      recognizeStream = null
  }
  if (resultEndTime>0) {
      finalRequestEndTime = isFinalEndTime
  }
  resultEndTime = 0

  lastAudioArray = []
  lastAudioArray = audioArray
  restartCounter++

  if (!lastTranscriptWasFinal) {
    process.stdout.write(`\n`)
  }
  process.stdout.write(chalk.yellow(`${(STREAMING_LIMIT * restartCounter)} : RESTARTING REQUEST \n`))

  newStream = true
  startStream()
}

// const recording = recorder.record()
// recording.start({
//   sampleRateHertz: 160000,
//   threshold:0,
//   silence: (STREAMING_LIMIT*2)/1000,
//   keepSilence: true,
//   recordProgram: 'rec'
// }).on('error', (err)=>{
//   console.error('Error en el Audio'+err);
// }).pipe(audioStreamTransform)

const recording = recorder.record()
recording.stream({
  sampleRateHertz: 160000,
  threshold: 0,
  silence: (10000 * 2) / 1000,
  keepSilence: true,
  recordProgram: 'sox'
}).on('error', (err) => {
  console.error(err);
}).pipe(audioStreamTransform)

// const recording = recorder
// recording.stream().pipe(audioStreamTransform)

console.log(`Escuchando ...`);

startStream()




