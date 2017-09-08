module.exports = function Pizza() {
  this.CrearPizza = function(type) {
    switch (type) {
      case "hawaiana":
        return Hawaiana();
        break;
      case "mexicana":
        return Mexicana();
        break;

      case "vegetariana":
        return Vegetariana();
        break;

      default:
    }
  }
  this.AgregarRefresco = function(pizza, refresco) {
    return new PizzaRefresco(pizza.ingredientes, pizza.precio, refresco)
  }

  function Pizza(ingredientes, precio) {
    this.ingredientes = ingredientes
    this.precio = precio

  }

  function PizzaRefresco(ingredientes, precio, refresco) {
    this.ingredientes = ingredientes
    this.precio = precio
    this.refresco = refresco
  }

  function Hawaiana() {
    return new Pizza(['piña', 'jamon', 'tomate', 'queso'], 150)
  }

  function Mexicana() {
    return new Pizza(['chorizo', 'jamon', 'tomate', 'queso', 'chiles', 'cebolla'], 100)
  }

  function Vegetariana() {
    return new Pizza(['piña', 'vegetales', 'tomate', 'queso'], 90)
  }
}
