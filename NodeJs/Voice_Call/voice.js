const accountSid = 'AC62cab6432c5baec1fbd6e6f0ca4fbfe0';
const authToken = '73e947b8ea2d1ac8095340da6da7a112';
const client = require('twilio')(accountSid, authToken);

client.calls
  .create({
    url: 'http://demo.twilio.com/docs/voice.xml',
    to: '+525580307902',
    from: '+12242630762'
  })
  .then(call => console.log(call.sid));