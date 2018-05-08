<template>
  <div>
    <h1> Register Component </h1>
    <input type="text"
    name="user"
    v-model="user"
    placeholder="usuario">
  </br>
    <input type="password"
    name="pass"
    v-model="pass"
    placeholder="contrasena">
    </br>
    <button @click="register"> Register </button>
  </div>


</template>

<script>
  import Autorizaciones from '@/services/Autorizaciones'
  export default {
    data () {
      return {
        user: 'patito',
        pass: 'xxxxxxxxxx'
      }
    },
    methods: {
      register () {
        Autorizaciones.register({
          user: this.user,
          pass: this.pass
        })
        console.log('Se apreto el boton ' + this.user + ' - ' + this.pass)
      }
    }
  }
</script>
