const bayes = require('classificator')
const classifier = bayes()

classifier.learn('LE BRINDA DESCUENTO ADICIONAL A LO YA OTORGADO COMUNÍQUESE AL', 'cobranza')
classifier.learn('es importante que realice los pagos', 'cobranza')
classifier.learn('Es importante pase a abonar el día de hoy para no afectar su crédito', 'cobranza')
classifier.learn('No detengas tu futuro laboral estudiando una Lic. Ejecutiva en UNITEC', 'publicidad')
classifier.learn('Usa este codigo para recuperar tu usuario Principal Digital.', 'alertas')
classifier.learn('Disfruta en KFC 8 pzs con pure, ensalada fam y 3 bisquets por $199 ', 'publicidad')
classifier.learn('Gracias por aceptar La Tarjeta American Express, la visita sera el dia de hoy entre las 11 y 12 hrs', 'publicidad')
classifier.learn('Hola esto es una prueba', 'otro')
classifier.learn('prueba', 'otro')
classifier.learn('Low Server Space', 'alertas')
classifier.learn('Consorcio representante de Citibanamex', 'cobranza')
classifier.learn('estudia tu Licenciatura en Linea UNITEC', 'publicidad')
classifier.learn('Maestria OnLine la UNITEC', 'publicidad')


console.log(classifier.categorize("Hola BB como estas esto es una prueba de analisis de texto"));
