var http = require('http');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

http.createServer(function (req, res) {

  console.log(req );

  console.log("request received from: " + req.connection.remoteAddress);

  var transporter = nodemailer.createTransport(smtpTransport({
    host: 'smtp.mandrillapp.com',
    port: 587,
    auth: {
        user: 'aaronluna222@gmail.com',
        pass: 'daRjnYru1FJ5NWz4Uowa0g'
    }
}));


var mailOptions = {
    from: 'Fred Foo ✔ <foo@blurdybloop.com>', // sender address
    to: 'aaronluna222@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ✔', // plaintext body
    html: '<b>Hello world ✔</b>' // html body
};

/*transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);

});*/

  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Mail enviado\n');

}).listen(8089, "192.168.20.249");

console.log('Server running at http://127.0.0.1:1337/');
