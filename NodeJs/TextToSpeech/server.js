const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const moment = require('moment')
const AWS = require('aws-sdk')
const Fs = require('fs')


const app = express();



// enable CORS
app.use(cors());

// add other middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// start the app 
const port = process.env.PORT || 3002;

app.get('/getConversation',async (req, res) => {
  try {

    const Polly = new AWS.Polly({
      signatureVersion: 'v4',
      region: 'us-east-2'
    })

    let text = req.query.texto
    let params = {
      'Text': text,
      'OutputFormat': 'mp3',
      'VoiceId': 'Mia'
    }

    Polly.synthesizeSpeech(params, (err, data) => {
      if (err) {
        console.log(err.code)
      } else if (data) {
        if (data.AudioStream instanceof Buffer) {
          let file_name = `${moment().format('YYYY-MM-DD_HH:mm:ss')}_speech.mp3`
          Fs.writeFile(file_name, data.AudioStream, function (err) {
            if (err) {
              return console.log(err)
            }
            console.log("The file was saved!")
             //res.status(200).send("Salvado");
             res.sendFile('/Users/aaronluna/Documents/Code_Library_2/NodeJs/TextToSpeech/' + file_name)
          })
        }
      }
    })

  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () =>
  console.log(`App is listening on port ${port}.`)
);