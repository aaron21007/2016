#!/bin/bash

echo "###########################################################################"
ruta='/Users/aaronluna/Documents/Code-Library/NodeJs/FileStreaming/'
CURL='curl'
URL='https://sns.ift.org.mx:8081/sns-frontend/planes-numeracion/descarga-publica.xhtml'
CURLARGS='-sD -'

echo "######### Se empieza a realizar la configuracion y peticion hacia la IFT  $(date) ############"
SEND_CURL="$($CURL $CURLARGS $URL)"
arr=($SEND_CURL)

i=0
for var in "${arr[@]}"
do
  if [[ $var == *"FRONTAPPID="* ]]; then
    FRONTAPPID=$(echo "$var" | sed 's/.*FRONTAPPID=\(.*\);.*/\1/')
  fi
  if [[ $var == *"id=\"javax.faces.ViewState\""* ]]; then
  	VIEWSTATE=$(echo ${arr[i+1]} | sed 's/.*"\(.*\)".*/\1/')
  fi
  ((i++))
done
DATE=`date +%Y-%m-%d`

$CURL -X POST -H "Cookie: primefaces.download=true;FRONTAPPID=$FRONTAPPID" -H "Content-Type: application/x-www-form-urlencoded" -H "Cache-Control: no-cache" -d 'FORM_planes=FORM_planes&FORM_planes:BTN_planPublico1=BTN_planPublico1&javax.faces.ViewState='$VIEWSTATE'' "https://sns.ift.org.mx:8081/sns-frontend/planes-numeracion/descarga-publica.xhtml" > ${ruta}pnn_enum_$DATE.zip

echo "######### Se obtiene el archivo y se descomprimen  $(date) ############"
echo "${ruta}pnn_enum_$DATE.zip"
cd ${ruta}
rm -f pnn.csv
unzip ${ruta}pnn_enum_$DATE.zip -d ${ruta}  && mv -f ${ruta}pnn_Publico*.csv ${ruta}pnn.csv && rm -f ${ruta}pnn_enum_$DATE.zip

if [ -s ${ruta}pnn.csv ]
then
        tam=$(wc -l ${ruta}pnn.csv)
        echo "$tam"
        conteo=$(echo $tam | tr " " "\n")

        for datoFilas in $conteo
         do
             echo "> [$datoFilas]"
             break;
        done
        if [[ $datoFilas>80000 ]] ##Se compara si tiene mas de 39 millones de registros el archivo
         then
            echo "#########  Cargando archivo a REDIS todo OK  $(date) ############"
            echo "######## Antes de cargarle, tenia: $(redis-cli -n 0 DBSIZE) registros ####  $(date)  ###############"
            cd ${ruta}
            node pnn.js
            echo "######## Despues de cargar en REDIS:  $(redis-cli -n 0 DBSIZE) rejistros ####  $(date)  ###############"
        else
           echo "--------- No se hace nada por que el archivo no tiene los registros necesarios ---------------"
        fi
else
        echo "######### El Archivo de RE estaba vacio y se dejo la que estaba $(date) ############"

fi
echo "###########################################################################"
