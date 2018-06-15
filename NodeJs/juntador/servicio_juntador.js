const express = require('express')
const app = express()
const sox = require('sox-stream')
const fs  = require('fs')
var moment = require('moment');
var cmd = require('node-cmd');

let año =moment().format('YYYY');




const PATH_VALIDATION =`/Users/aaronluna/Documents/Audios_domer/`
const PATH_CALL =`/Users/aaronluna/Documents/Audios_domer/`
const PATH_CONCAT ='/Users/aaronluna/Documents/Audios_domer/concat_mp3/'

app.get('/audio', (req, res) => {

    let file_name  = req.query.audio
    let datos_file = file_name.split('_')
    let datos_file_fecha = datos_file[0]
    let datos_file_dialplan = datos_file[1]
    let datos_file_caller = datos_file[2]
    let dia_llamada = datos_file_fecha.split('-')[2]
    let mes_llamada = datos_file_fecha.split('-')[1]
    let call_path = `${mes_llamada}/${dia_llamada}/${file_name}`
    let valid_path = `${mes_llamada}/${dia_llamada}/*${datos_file_dialplan}_${datos_file_caller}*`



    function cmd_promise(path) {
        return new Promise((resolve, reject)=>{
            cmd.get(
                `ls ${path}`,
                function(err, data, stderr){
                    if (err) {
                        resolve({code:404, data:err})
                    }else{
                        resolve({code:200, data:data})
                    }
                })
        })  
    }

    function cmd_promise_sox(comando) {
        return new Promise((resolve, reject)=>{
            cmd.get(
                `${comando}`,
                function(err, data, stderr){
                    if (err) {
                        resolve({code:404, data:err})
                    }else{
                        resolve({code:200, data:data})
                    }
                })
        })  
    }

    async function recorre(){
        let path_validacion_juntar = 'no hay'
        let path_call_juntar = 'nohay'
        let completo

        /** Segmento de Venta**/
        let array_escenarios_call = [`fs1/domexp/MC01/DOMER_${año}/`, `fs2/domexp/MC01/DOMER_${año}/`,`fs3/domexp/MC01/DOMER_${año}/`,`st1/f1/domexp/MC01/DOMER_${año}/`,`st1/f2/domexp/MC01/DOMER_${año}/`,`st1/f3/domexp/MC01/DOMER_${año}/`]
        for (let index = 0; index < array_escenarios_call.length; index++) {
            let segmento = array_escenarios_call[index];
            completo = `${PATH_CALL}${segmento}${call_path}`
            let resultado_busqueda = await cmd_promise(completo)
            
            if (resultado_busqueda.code == 200) {
                path_call_juntar = resultado_busqueda.data.replace(/\n/g, '')
                break
            }
        }
        console.log(`Llamada de la venta ${path_call_juntar}`);
        /**************************/

        /** Segmento de Validacion**/
        let array_escenarios_valid = [`fs1/domexp/MC01/VALID_${año}/`, `fs2/domexp/MC01/VALID_${año}/`,`fs3/domexp/MC01/VALID_${año}/`,`st1/f1/domexp/MC01/VALID_${año}/`,`st1/f2/domexp/MC01/VALID_${año}/`,`st1/f3/domexp/MC01/VALID_${año}/`]
        for (let index = 0; index < array_escenarios_valid.length; index++) {
            let segmento = array_escenarios_valid[index];
            completo = `${PATH_VALIDATION}${segmento}${valid_path}`
            let resultado_busqueda = await cmd_promise(completo)
            if (resultado_busqueda.code == 200) {
                path_validacion_juntar = resultado_busqueda.data.replace(/\n/g, '')
                break
            }
        }
        console.log(`Llamada de la validacion ${path_validacion_juntar}`);
        /**************************/

        /** Junta los audios en un solo mp3 **/
        let resultado_sox = await cmd_promise_sox(`sox ${path_call_juntar} ${path_validacion_juntar} ${PATH_CONCAT}${file_name}`)

        res.setHeader('Content-Disposition', 'attachment; filename=' + file_name);
        res.setHeader('Content-Type', 'audio/mpeg');
        fs.createReadStream(`${PATH_CONCAT}${file_name}`)
        .pipe(res)

        /******************/
    }


    recorre()

    
    
    // // busca_validacion('', '')
    
    // // console.log(`Despues de buscar`);
    

    // res.setHeader('Content-Disposition', 'attachment; filename=' + file_name);
    // res.setHeader('Content-Type', 'audio/mpeg');
    // fs.createReadStream(`${PATH_CONCAT}${file_name}`)
    // .pipe(res)
    
})

app.listen(3030, () => console.log('Example app listening on port 3030!'))