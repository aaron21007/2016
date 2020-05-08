const AWS = require('aws-sdk')
const Fs = require('fs')

// Create an Polly client
const Polly = new AWS.Polly({
  signatureVersion: 'v4',
  region: 'us-east-2'
})

let params = {
  'Text': 'Hola buenas tardes, muchas gracias por contestar, hablamos de grupo citibanamex, para ofrecerle una tarjeta oro, esta interesado?',
  'OutputFormat': 'mp3',
  'VoiceId': 'Mia'
}

Polly.synthesizeSpeech(params, (err, data) => {
  if (err) {
    console.log(err.code)
  } else if (data) {
    if (data.AudioStream instanceof Buffer) {
      Fs.writeFile("./speech.mp3", data.AudioStream, function (err) {
        if (err) {
          return console.log(err)
        }
        console.log("The file was saved!")
      })
    }
  }
})