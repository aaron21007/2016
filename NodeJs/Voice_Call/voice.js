const accountSid = '';
const authToken = '';
const client = require('twilio')(accountSid, authToken);

client.calls
  .create({
    url: 'http://demo.twilio.com/docs/voice.xml',
    to: '+525580307902',
    from: '+12242630762'
  })
  .then(call => console.log(call.sid));