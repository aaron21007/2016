// var smpp = require('smpp');
// var session = smpp.connect('smpp://148.243.134.156:3030');
// session.bind_transceiver({
// 	system_id: 'dinstar',
// 	password: 'D1n5T4r'
// }, function(pdu) {
// 	if (pdu.command_status == 0) {
// 		// Successfully bound
// 		session.submit_sm({
// 			destination_addr: '5540781354',
// 			short_message: 'Hola desde SMPP'
// 		}, function(pdu) {
// 			if (pdu.command_status == 0) {
// 				// Message successfully sent
// 				console.log(pdu.message_id);
// 			}
// 		});
// 	}
// });


var smpp = require('smpp');
var session = smpp.connect('148.243.134.156', 2775);
session.bind_transceiver({
    system_id: 'DWG',
    password: 'D1n5T4r'
}, function(pdu) {
	 console.log(pdu);
	 console.log(pdu.command_status);
    if (pdu.command_status == 0) {
        // Successfully bound
        session.submit_sm({
            destination_addr: '5540781354',
            short_message: 'Hello'
        }, function(pdu) {
					console.log(pdu);
            if (pdu.command_status == 0) {
                // Message successfully sent
                console.log(pdu.message_id);
            }
        });
    }
});
