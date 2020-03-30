const bayes = require('classificator')
const classifier = bayes()


classifier.learn('LE BRINDA DESCUENTO ADICIONAL A LO YA OTORGADO COMUNÍQUESE AL', 'cobranza')
classifier.learn('es importante que realice los pagos', 'cobranza')
classifier.learn('Es importante pase a abonar el día de hoy para no afectar su crédito', 'cobranza')
classifier.learn('No detengas tu futuro laboral estudiando una Lic. Ejecutiva en UNITEC', 'publicidad') 
classifier.learn('Usa este codigo para recuperar tu usuario Principal Digital.', 'alertas') 
classifier.learn('Disfruta en KFC 8 pzs con pure, ensalada fam y 3 bisquets por $199 ', 'publicidad')

console.log(classifier.categorize("DIANA, disfruta en KFC 8 pzs con pure, ensalada fam y 3 bisquets por $199 + Cobro por envio Marca al 9616124477 vig:15/04/20"));
