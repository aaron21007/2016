const AWS = require('aws-sdk')
const Fs = require('fs')

// Create an Polly client
const Polly = new AWS.Polly({
  signatureVersion: 'v4',
  region: 'us-east-2'
})

/**

 var params = {
   OutputFormat: json | mp3 | ogg_vorbis | pcm,

   Text: 'STRING_VALUE',

   VoiceId: Aditi | Amy | Astrid | Bianca | Brian | Camila | Carla | Carmen | Celine | Chantal | Conchita | Cristiano | Dora | Emma | Enrique | Ewa | Filiz | Geraint | Giorgio | Gwyneth | Hans | Ines | Ivy | Jacek | Jan | Joanna | Joey | Justin | Karl | Kendra | Kevin | Kimberly | Lea | Liv | Lotte | Lucia | Lupe | Mads | Maja | Marlene | Mathieu | Matthew | Maxim | Mia | Miguel | Mizuki | Naja | Nicole | Penelope | Raveena | Ricardo | Ruben | Russell | Salli | Seoyeon | Takumi | Tatyana | Vicki | Vitoria | Zeina | Zhiyu,

   Engine: standard | neural,
   LanguageCode: arb | cmn - CN | cy - GB | da - DK | de - DE | en - AU | en - GB | en - GB - WLS | en - IN | en - US | es - ES | es - MX | es - US | fr - CA | fr - FR | is - IS | it - IT | ja - JP | hi - IN | ko - KR | nb - NO | nl - NL | pl - PL | pt - BR | pt - PT | ro - RO | ru - RU | sv - SE | tr - TR,
   LexiconNames: [
     'STRING_VALUE',
  
   ],
   SampleRate: 'STRING_VALUE',
   SpeechMarkTypes: [
     sentence | ssml | viseme | word,

   ],
   TextType: ssml | text
 };
 polly.synthesizeSpeech(params, function (err, data) {
   if (err) console.log(err, err.stack); // an error occurred
   else console.log(data); // successful response
 });
 * 
 */


let params = {
  'Text': '<speak>Su código de activación es :  <prosody rate="x-slow"> 32 24 16 </prosody>, desea que se le repita el código?, presione 2.</speak>',
  'OutputFormat': 'mp3',
  'VoiceId': 'Mia',
  'SampleRate': "8000",
  'TextType' : "ssml"
}

Polly.synthesizeSpeech(params, (err, data) => {
  if (err) {
    console.log(err.code)
  } else if (data) {
    if (data.AudioStream instanceof Buffer) {
      Fs.writeFile("./activacion.mp3", data.AudioStream, function (err) {
        if (err) {
          return console.log(err)
        }
        console.log("The file was saved!")
      })
    }
  }
})