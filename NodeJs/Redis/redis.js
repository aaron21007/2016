var redis = require("redis"),
    client = redis.createClient();
var actualHora = new Date()
var mes = actualHora.getMonth() + 1 //Se le aumenta 1 para ir con el orden normal de los meses 1 al 12
var mes_mas3 = actualHora.getMonth() + 4 //Se le aumenta 1 para ir con el orden normal de los meses 1 al 12
var dia = actualHora.getDate()
var año = actualHora.getFullYear()


if (mes < 10) {
    mes = '0' + mes
}
if (mes_mas3 < 10) {
    mes_mas3 = '0' + mes_mas3
}
if (dia < 10) {
    dia = '0' + dia
}

// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });

client.on("error", function(err) {
    console.log("Error " + err);
});

client.hmset("bl:5540781354", "sdate", año + "-" + mes + "-" + dia, "edate", año + "-" + mes_mas3 + "-" + dia, "idate", año + "-" + mes + "-" + dia, "btype", "tipi");
client.hgetall("bl:5540781354", function(err, obj) {
    console.dir(obj);
});
client.quit();
