/*** Modulos de Node.js ****/
var JSFtp = require("jsftp");
const http = require('http');
var cmd = require('node-cmd');
var mysql = require('mysql')

/*** Variables del sistema ***/
var connection = mysql.createConnection({
  host: '172.27.27.79',
  user: 'saludint-web',
  password: 'LIzZ4S=aX',
  database: 'saludint',
  multipleStatements: true
});


/** Arranque del Script ***/

var date = new Date();
var day = date.getDate();
var month = date.getMonth();
var year = date.getFullYear();

/*** Validacion de campos query ***/

if(day < 10){
  day ='0'+day
}

month =month+1
if(month < 10){
  month ='0'+month
}

connection.query('SELECT app_data, local_media_ip, sip_req_user FROM saludint.cdrs_currentDay where date_format(start_stamp, \'%Y-%m-%d\' ) = ? order by id desc;',[year+'-'+month+'-'+day] ,function(err, rows) {

    if (err) {
      console.log('Algo paso con el query: '+err);
    }

    for (var x = 0; x < rows.length; x++) {

      var numeroCliente = rows[x].sip_req_user
      var numeroCliente10 = numeroCliente.substring(numeroCliente.length-10, numeroCliente.length);
      console.log(numeroCliente10);
      var prefijoAudios = rows[x].local_media_ip.split(".")
      var data = rows[x].app_data.split("/")
      var path = rows[x].app_data.replace('/home/vrec/recordings/', '/var/wws/saludint/portal/assets/audios'+prefijoAudios[3]+'/').replace(data[(data.length)-1].toString(), '')
      convertToMp3(path,data[(data.length)-1].toString(), numeroCliente10)
    }

    connection.end();
});


/*** funciones del sistema ***/

function convertToMp3(path, filename, numeroCliente) {

  var mp3Name = '22'+year+month+day+numeroCliente + 'N.mp3';

  cmd.get(
    'lame -b 64 --resample 16 -a ' + path+filename + ' /home/aaron/saludInt_Mp3/' +mp3Name + '',
    function(data) {
      console.log('Listo se convirtio a MP3');
      console.log('--------------------------------');
      sendByFTP('/home/aaron/saludInt_Mp3/', mp3Name)
      console.log('--------------------------------');

    });
}

function removeMp3(filename) {

  cmd.get(
    'cd /home/aaron/saludInt_Mp3/ && rm ' + filename,
    function(data) {
      console.log('El archivo MP3 ' + filename + ' ha sido eliminado !');
    });

}

function sendByFTP(path, filename) {

  var Ftp = new JSFtp({
    host: "184.106.6.46",
    port: 21,
    user: "SIDirecto",
    pass: "S1d1r3ct0$2016",
    debugMode: true
  });

  var AUDIO_SRC_PATH = path
  var AUDIO_SRC_NAME = filename
  var AUDIO_DST_PATH = '/'
  var AUDIO_DST_NAME = filename

  console.log('Transfering.... ' +path+ AUDIO_SRC_NAME);

  Ftp.put(AUDIO_SRC_PATH + AUDIO_SRC_NAME, AUDIO_DST_PATH + AUDIO_DST_NAME, function(hadErr) {
    if (hadErr)
      console.error('There was an error copying the file. ' + hadErr);
    else
      console.log('File copied successfully!');

    Ftp.raw.quit(function(err, data) {
      if (err)
        return console.error(err)
      removeMp3(filename)
      console.log("Closing ftp session, Bye!");

    });

  });

}
