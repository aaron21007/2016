var dateFormat = require('dateformat');
var moment = require('moment')


var day = moment("29/09/2017", "DD/MM/YYYY");
console.log(dateFormat(day, "yyyy-mm-dd HH:MM:ss"));


/* Dia Inicio */
var dayI = moment("2017-10-13", "YYYY-MM-DD");
var horaI = moment("11:00:00", "HH:mm:ss")
var fechaInicio = dateFormat(dayI, "yyyy-mm-dd")
var horaInicio = dateFormat(horaI, "HH:MM:ss")

/* Dia Final */
var dayF = moment("2017-10-20", "YYYY-MM-DD");
var horaF = moment("21:00:00", "HH:mm:ss")
var fechaFinal = dateFormat(dayF, "yyyy-mm-dd")
var horaFinal = dateFormat(horaF, "HH:MM:ss")

/* Dia Actual */
var now = new Date();
var ahoraFecha = dateFormat(now, "yyyy-mm-dd");
var ahoraHora = dateFormat(now, "HH:MM:ss")

console.log("Ahora :" + ahoraFecha + " - " + ahoraHora);
console.log("Fecha :" + fechaInicio + " - " + horaInicio);
console.log("Fecha :" + fechaFinal + " - " + horaFinal);

if (ahoraFecha >= fechaInicio && ahoraFecha <= fechaFinal) {
    if (ahoraHora >= horaInicio && ahoraHora <= horaFinal) {
        console.log(`En rango BB`);
    } else {
        console.log(`Ya andas fuera de horario`);
    }

} else {
    console.log("Frezzeala");
}
