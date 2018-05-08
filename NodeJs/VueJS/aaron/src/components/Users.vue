<template>
  <div class="users">
       <h1> USERS </h1>

       <ul>
         <li v-for="user in users">
           <span>
            {{user.name}} : {{user.email}}
            <input type="button" v-on:click="deleteUser(user)" value="Eliminar"></button>
           </span>

         </li>
       </ul>
       <br/>
       <form v-on:submit.prevent="addUser">
           <p>
              Name : <input  v-model="newUser.name" placeholder="name"/>
           </p>

          <br/>
          <p>
            Email : <input  v-model="newUser.email" placeholder="email"/>
          </p>
          <input type="submit" value="Agregar"/>

       </form>



  </div>
</template>

<script>
  export default {
    name: 'users',
    data() {
      return {
        newUser: {},
        users: [{
          name: 'Aaron',
          email: 'aaron@luna.com',
          estatus: true
        }, {
          name: 'Gaby',
          email: 'gabs@luna.com',
          estatus: true
        }, {
          name: 'Fer',
          email: 'fer@luna.com',
          estatus: true
        }]
      }
    },
    methods: {
      addUser: function(e) {
          this.users.push({
            name: this.newUser.name,
            email: this.newUser.email,
            estatus: true
          })
      },
      deleteUser: function(user){
          this.users.splice(this.users.indexOf(user), 1)
      }
    },
    created : function(){
      console.log(`Inicio de creacion`);
      this.$http.get('https://jsonplaceholder.typicode.com/users')
      .then(function(response){
          console.log(response.data);
          let usersRemote = response.data
          for (var i = 0; i < usersRemote.length; i++) {
            this.users.push({
              name : usersRemote[i].name,
              email : usersRemote[i].email
            })
          }
      })
    }
  }
</script>

<style scoped>

</style>
