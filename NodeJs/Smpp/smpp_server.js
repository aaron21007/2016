var smpp = require('smpp');
var request = require('requestretry');
let moment = require('moment');
let user
let pass

var server = smpp.createServer(function (session) {
  session.on('bind_transmitter', function (pdu) {
    console.log('-------------------TRANSMITTER---------------------------------');
    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}]`);

    console.log(pdu);

    session.pause();

    console.log('despues del pause');

    if (pdu.password == pass && pdu) {
      session.send(pdu.response({
        command_status: smpp.ESME_ROK
      }));
      console.log('----------------------------------------------------');
    } else {
      session.send(pdu.response({
        command_status: smpp.ESME_RINVPASWD //Here reject WRONG clients
      }));
      session.close();
      return;
      console.log('----------------------------------------------------');
    }
    // receive SMS...
    session.resume();
  });

  session.on('bind_transceiver', function (pdu) {
    console.log('-------------------TRANSCEIVER---------------------------------');
    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}]`);

    console.log(pdu);

    session.pause();

    console.log('despues del pause');

    if (pdu.password == "pass1" && pdu) {
      session.send(pdu.response({
        command_status: smpp.ESME_ROK
      }));
      console.log('----------------------------------------------------');
    } else {
      session.send(pdu.response({
        command_status: smpp.ESME_RINVPASWD //Here reject WRONG clients
      }));
      session.close();
      return;
      console.log('----------------------------------------------------');
    }
    // receive SMS...
    session.resume();
  });


  session.on('bind_receiver', function (pdu) {

    console.log('-------------------RECEIVER---------------------------------');
    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}]`);

    console.log(pdu);

    session.pause();

    console.log('despues del pause');

    if (pdu.password == 'Talk2Tel') {
      session.send(pdu.response({
        command_status: smpp.ESME_ROK //Here all are OK
      }));
      session.close();
      return;
    } else {
      session.send(pdu.response({
        command_status: smpp.ESME_RINVPASWD //Here reject WRONG clients
      }));
      session.close();
      return;
    }

  });

  session.on('bind_receiver_resp', function (pdu) {
    console.log('-------------------RECEIVER RESP---------------------------------');
    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}]`);

    console.log(pdu);

    session.pause();

    session.send(pdu.response({
      command_status: smpp.ESME_ROK //Here all are OK
    }));
    session.close();
    return;
  });

  session.on('bind_transmitter_resp', function (pdu) {
    console.log('-------------------TRANSMITTER RESP---------------------------------');
    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}]`);

    console.log(pdu);

    session.pause();

    session.send(pdu.response({
      command_status: smpp.ESME_ROK //Here all are OK
    }));
    session.close();
    return;
  });

  session.on('submit_sm', function (pdu) {
    console.log('-------------------SUBMIT  SMS---------------------------------');
    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}]`);

    console.log(pdu);

    let mensaje = pdu.short_message['message']
    let numero = pdu.destination_addr

    numero = numero.slice(-10)
    // request.post({
    //   url: 'http://sms.directo.com:1477/sendSms',
    //   form: {
    //     user: 'YUPIFON',
    //     password: 'T5C5Ig',
    //     message: mensaje,
    //     number: numero
    //   }
    // }, function (err, httpResponse, body) {
    //   /* ... */
    //   console.log(body);
    // })

    session.pause();
    var msgid = 2; // generate a message_id for this message.
    session.send(pdu.response());

    session.resume();
  });

  session.on('deliver_sm', function (pdu) {
    console.log('-------------------DELIVER  SMS---------------------------------');
    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}]`);

    console.log(pdu);


    var msgid = 2; // generate a message_id for this message.
    session.send(pdu.response({
      command_status: smpp.ESME_ROK //Here all are OK
    }));
  });

  session.on('unbind', function (pdu) {
    console.log('-------------------UNBIND  SMS---------------------------------');
    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}]`);

    console.log(pdu);

    session.send(pdu.response({
      command_status: smpp.ESME_ROK //Here all are OK
    }));
    session.close();
  });

  session.on('unbind_resp', function (pdu) {
    session.send(pdu.response());
    session.close();
  });

  session.on('enquire_link', function (pdu) {
    session.send(pdu.response());
  });
  
});
server.listen(2775);