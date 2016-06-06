const http = require('http');
var client = require('twilio')('AC42b8a3dd3ef152caf2eb0d4a3b3fa1e4', 'e9ea45c015e37b43100f022ab0dda9e4');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');

	client.sendMessage({

    to:'+525540781354', // Any number Twilio can deliver to
    from: '+525549999136', // A number you bought from Twilio and can use for outbound communication
    body: 'word to your mother.' // body of the SMS message

}, function(err, responseData) { //this function is executed when a response is received from Twilio

    if (!err) { // "err" is an error received during the request, if any

        // "responseData" is a JavaScript object containing data received from Twilio.
        // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
        // http://www.twilio.com/docs/api/rest/sending-sms#example-1

        console.log(responseData.from); // outputs "+14506667788"
        console.log(responseData.body); // outputs "word to your mother."

    }
});

})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
