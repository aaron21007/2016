#!/bin/bash


for x in {1..254..1};do ping -c 1 1.1.1.$x | grep "64 b" | cut -d" " -f4 >> ips.txt; done 
