    //var limiteHora = new Date("2016-05-23 11:00");
    var actualHora =  new Date()
    var limiteHora = new Date( actualHora.getFullYear()+"-"+(actualHora.getMonth()+1)+"-"+actualHora.getDate()+" "+"16:00")
    console.log(actualHora.getFullYear()+"-"+actualHora.getMonth()+"-"+actualHora.getDate()+" "+"16:00")
    console.log("Ahora: "+actualHora);
    console.log("Obtenida: "+limiteHora);

    if(actualHora<=limiteHora){
	console.log("Es menor a la fecha actual")
    }else{
 	console.log("Ya no hacemos nada , por que la fecha se paso");
      //Ya no hace nada por que esta fuera de horario
    }
