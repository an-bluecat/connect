<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>Right now this will be used for experimenting vuetify features</p>
    <h3 v-if="userIsAuthenticated">
      Welcome, you are logged in
    </h3>
    <p v-else>
      no user in logged in
    </p>
    <Signup/>
    <Signin/>


  </div>
</template>

<script>
import Signup from './User/Signup'
import Signin from './User/Signin'

export default {
  components: {
    Signup,
    Signin
  },
  computed: {
      userIsAuthenticated () {
        if(this.$store.getters.user !== null && this.$store.getters.user !== undefined){
          console.log(this.$store.getters.user)
        }
        
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      }
  },
}


</script>

<style scoped>

</style>