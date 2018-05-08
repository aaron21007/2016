/*
 * Check out the full guide at
 *   http://sipjs.com/guides/make-call/
 *
 * This sample uses
 *   http://sipjs.com/download/sip-0.9.0.min.js
 *
 * Login with your developer account to receive calls at
 *   http://sipjs.com/demo-phone
 */

//here you determine whether the call has video and audio

$(document).ready(function() {
  var options = {
    media: {
      local: {
        video: document.getElementById('localVideo')
      },
      remote: {
        video: document.getElementById('remoteVideo'),
        // This is necessary to do an audio/video call as opposed to just a video call
        audio: document.getElementById('remoteVideo')
      }
    },
    ua: {}
  };
  var simple = new SIP.WebRTC.Simple(options);

  // Eventos de SIP RTC //
  simple.on('registered', function() {
    console.log('========================================');
    console.log('======  Se Registro el usuario  ========');
    console.log('========================================');
  })
  simple.on('unregistered', function() {
    console.log('========================================');
    console.log('======  Se UnRegistro el usuario  ========');
    console.log('========================================');
  })
  simple.on('new', function() {
    console.log('========================================');
    console.log('======  Nueva llamada  ========');
    console.log('========================================');
  })
  simple.on('ringing', function() {
    console.log('========================================');
    console.log('======  Sonando ...  ========');
    console.log('========================================');
  })
  simple.on('connectiing', function() {
    console.log('========================================');
    console.log('======  Conectando  ========');
    console.log('========================================');
  })
  simple.on('connected', function() {
    console.log('========================================');
    console.log('======  Se Conecto la Llamada  ========');
    console.log('========================================');
  })
  simple.on('ended', function() {
      simple.hangup();
    console.log('========================================');
    console.log('======  Se Termino la llamada  ========');
    console.log('========================================');
  })
  simple.on('dtmf', function(tone) {
    console.log('========================================');
    console.log('======  Se Mando un tono  ========');
    console.log(tone);
    console.log('========================================');
  })

  simple.on('hold', function() {
    console.log('========================================');
    console.log('======  Se Puso en Hold  ========');

    console.log('========================================');
  })

  ////////////////////////


  $("#remoteVideo").hide()
  $("#localVideo").hide()

  var marcar = document.getElementById('Marcar');
  marcar.addEventListener("click", function() {
    console.log('Llamando a SIP de prueba');
    simple.call('welcome@onsip.com');

  }, false);

  var colgar = document.getElementById('Colgar');
  colgar.addEventListener("click", function() {
    console.log('Colgando llamada');
    simple.hangup();

  }, false);

  var p1 = document.getElementById('Press1');
  p1.addEventListener("click", function() {
    simple.sendDTMF('1');

  }, false);

  var p2 = document.getElementById('Press2');
  p2.addEventListener("click", function() {
    simple.sendDTMF('2');

  }, false);

  var p3 = document.getElementById('Press3');
  p3.addEventListener("click", function() {
    simple.sendDTMF('3');

  }, false);


});
