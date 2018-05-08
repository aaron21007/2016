<template>
  <div class="test">
    <h1 v-text="titulo"></h1>
    <p v-text="nombre"></p>
    <p v-text="info.edad"></p>
    <p v-text="info.puesto"></p>

    <input type="text" v-model="nombre">

    <button v-on:click="accion()"> ACCION </button>
  </div>
</template>

<script>
export default {
  name: 'test',
  data() {
    return {
      titulo :'Hola desde Componente TEST',
      nombre: 'Aaron Luna',
      info : {
        edad : 26,
        puesto: 'Software Enginner'
      }
    }
  },
  methods: {
    accion : function(){
      alert('Hola desde funcion VueJs')
    }
  }
}
</script>

<style scoped>

</style>
