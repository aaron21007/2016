
const speech = require('@google-cloud/speech');
const fs = require('fs');
const client = new speech.SpeechClient();

exports.transcribe = (fileName) => {
  return new Promise(async (resolve, reject)=>{

      const file = fs.readFileSync(fileName);
      const audioBytes = file.toString('base64');

      const audio = {
        content: audioBytes,
      };

      let tipo = 'MP3'
      let sampleRate = 48000
      if (fileName.includes("wav")) {
        tipo = 'LINEAR16'
        sampleRate = 8000
      }
      const config = {
        encoding: tipo,
        sampleRateHertz: sampleRate,
        languageCode: 'es-MX',
      };
      const request = {
        audio: audio,
        config: config,
      };

      const [response] = await client.recognize(request);
      const transcription = response.results
        .map(result => result.alternatives[0].transcript)
        .join('\n');

        resolve(transcription)
      
  })
}