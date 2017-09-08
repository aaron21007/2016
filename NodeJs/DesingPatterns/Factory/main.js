const pizza = require('./pizza')


let pedido_pizza = new pizza()
let tipo_pizza = 'hawaiana'
let pizza_lista = pedido_pizza.CrearPizza(tipo_pizza)

console.log(`Pizza hasta el momento:`);
console.log(pizza_lista);

// Agregamos el refresco

pizza_lista = pedido_pizza.AgregarRefresco(pizza_lista, 'Coca-Cola')

console.log(`Pizza con refresco de mas:`);

console.log(pizza_lista);
