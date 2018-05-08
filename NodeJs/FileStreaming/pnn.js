var baby = require('babyparse')
var redis = require('redis')
var fs = require('fs')
var file = '/Users/aaronluna/Documents/Code-Library/NodeJs/FileStreaming/pnn.csv';
var parsed = baby.parseFiles(file, {
   skipEmptyLines: true,
   fastMode: false
})
var filas = parsed.data
var client = redis.createClient()
client.select(0, function() { /* ... */ });

console.log('Tam: ' + filas.length);

client.select(0, function() { /* ... */ });
for (var i = 0; i < filas.length; i++) {
   try {
      var operador = 'Sin asignar'
      var ido = '0'
      /* # [TELMEX] */
      if (filas[i][14].indexOf('TELEFONOS DE MEXICO') > -1) {
         operador = 'telmex'
         ido = 123
      }else if (filas[i][14].indexOf('TELEFONOS DEL NOROESTE') > -1) {
         operador = 'telmex'
         ido = 193
      }
      /* # [TELCEL] */
      else if (filas[i][14].indexOf('RADIOMOVIL') > -1) {
         operador = 'telcel'
         ido = 188
      }
      /* # [MOVISTAR] */
      else if (filas[i][14].indexOf('PEGASO') > -1) {
         operador = 'movistar'
         ido = 118
      } else if (filas[i][14].indexOf('CELULAR DE TELEFONIA') > -1) {
         operador = 'movistar'
         ido = 118
      } else if (filas[i][14].indexOf('BAJA CELULAR MEXICANA') > -1) {
         operador = 'movistar'
         ido = 118
      } else if (filas[i][14].indexOf('TELEFONIA CELULAR DEL NORTE') > -1) {
         operador = 'movistar'
         ido = 118
      }
      /* # [ATT] */
      else if (filas[i][14].indexOf('AT&T') > -1) {
         operador = 'att'
         ido = 131
      } else if (filas[i][14].indexOf('UNEFON') > -1) {
         operador = 'att'
         ido = 131
      } else if (filas[i][14].indexOf('IUSATEL') > -1) {
         operador = 'att'
         ido = 131
      } else if (filas[i][14].indexOf('IUSACELL') > -1) {
         operador = 'att'
         ido = 131
      }
      /* # [MAXCOM] */
      else if (filas[i][14].indexOf('MAXCOM') > -1) {
         operador = 'maxcom'
         ido = 144
      }
      /* # [MEGACABLE] */
      else if (filas[i][14].indexOf('MEGA CABLE') > -1) {
         operador = 'megacable'
         ido = 199
      } else if (filas[i][14].indexOf('MEGACABLE') > -1) {
         operador = 'megacable'
         ido = 150
      }
      /* # [TOTALPLAY] */
      else if (filas[i][14].indexOf('TOTAL PLAY') > -1) {
         operador = 'totalplay'
         ido = 133
      }
      /* # [AXTEL] */
      else if (filas[i][14].indexOf('AXTEL') > -1) {
         operador = 'axtel'
         ido = 155
      }
      /* # [CABLEMAS] */
      else if (filas[i][14].indexOf('CABLEMAS') > -1) {
         operador = 'cablemas'
         ido = 160
      }
      /* # [IZZI] */
      else if (filas[i][14].indexOf('CABLEVISION') > -1) {
         operador = 'izzi'
         ido = 180
      }
      /* # [AVANTEL] */
      else if (filas[i][14].indexOf('AVANTEL') > -1) {
         operador = 'avantel'
         ido = 156
      } /* # [ALESTRA] */
      else if (filas[i][14].indexOf('ALESTRA') > -1) {
         operador = 'alestra'
         ido = 189
      }

      client.hmset([filas[i][7] + filas[i][8], filas[i][7] + filas[i][8]+"-" + i, filas[i][9] + ':' + filas[i][10] + ':' + filas[i][12] + ':' + filas[i][13] + ':' + filas[i][14].replace(/\\/g, '') + ':' + operador + ':' + ido], function(err, res) {});
   } catch (err) {
      console.error(err);
   }
}
client.quit();

//process.exit()
