#!/bin/bash

resultado=$(netstat -tonp | grep CLOSE_WAIT | wc);

OIFS=" "
read -a info_close_wait <<< "${resultado}"


echo $info_close_wait;

  if [ $info_close_wait -ge 1  ]
   then
     echo "entro"
     echo $info_close_wait - $(date)>> /home/aaron/Documentos/Developer/Shell/log_close_wait.txt;
  fi

