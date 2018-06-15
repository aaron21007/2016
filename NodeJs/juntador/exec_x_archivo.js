var cmd = require('node-cmd');
var SoxCommand  = require('sox-audio')
const PATH ='/Users/aaronluna/Documents/Audios_domer/concat_mp3/' 

let file_to_union = '2018-05-09-12-14-25_460009251000001677627525556352793_5570990621_validation.mp3'


let datitos = file_to_union.split('_')
let key = datitos[1]+'_'+datitos[2]

cmd.get(
    'ls '+PATH+'*'+key+'*',
    function(err, data, stderr){
          console.log(data);
         let validacion_grabaciones =  new Array()

         let files = data.split('\n')
        
        for (let index = 0; index < files.length; index++) { //quitarle 1 mas si falla
            const path_audio = files[index];
            if (path_audio.indexOf('validation')>-1) {
                validacion_grabaciones.push(path_audio)
            }
        }

        for (let i = 0; i < validacion_grabaciones.length; i++) {
            let partes_grabacion_validacion = validacion_grabaciones[i].split('/')
            let archivo_validacion = partes_grabacion_validacion[partes_grabacion_validacion.length-1]
            let partes_archivo_validacion = archivo_validacion.split('_')
            let fecha_validacion = partes_archivo_validacion[0]
            let partes_fecha_validacion = fecha_validacion.split('-')
            let fecha_busqueda_validacion = partes_fecha_validacion[0]+'-'+partes_fecha_validacion[1]+'-'+partes_fecha_validacion[2]
            // console.log(fecha_busqueda_validacion);

            let grabacion_call='No tiene'
            for (let j = 0; j < files.length; j++) {
                let path_file = files[j];
                if (path_file.indexOf(fecha_busqueda_validacion)>-1 && path_file.indexOf('call')>-1 ) {
                    grabacion_call = path_file
                    break;
                }
            }

            if (grabacion_call != 'No tiene') {

                let final_concatenado = PATH+'Unidos_2/'+partes_grabacion_validacion[partes_grabacion_validacion.length-1].replace('validation', 'complete_call')
               
                cmd.run('sox -C 128.2 '+grabacion_call+ ' '+validacion_grabaciones[i]+' '+final_concatenado);

                console.log('sox -C 128.2 '+grabacion_call+ ' '+validacion_grabaciones[i]+' '+final_concatenado);
            }else{
                // console.error(`No tiene audio esta validacion ${validacion_grabaciones[i]}`);
                
            }
            
            
        }
        
    }
);