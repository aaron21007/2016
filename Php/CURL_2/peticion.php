<?php

$clientID="rgrF0rID";

$key="6e122458bff99b0e213ad36dac1063ef";





$curl = curl_init();

curl_setopt($curl, CURLOPT_URL, "http://69.195.197.52:8094/ssantander/record");

curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);



curl_setopt($curl, CURLOPT_HTTPHEADER,array("Content-Type: application/x-www-form-urlencoded", "client-Id: $clientID","key: $key"));



$result = curl_exec($curl);

curl_close($curl);

print "$result\n";



?>
