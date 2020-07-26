<template>

  <v-app id="inspire">
    <div>
      <TopPanel/>
    </div>
    <!-- <div id="container"> -->
    <main>
      <router-view></router-view>
    </main>
    <!-- </div> -->
  </v-app>
</template>

<script>
import TopPanel from './components/TopPanel'

export default {
  name: 'App',
  components: {
    TopPanel,
  },
  computed: {
    userIsAuthenticated () {
        if(this.$store.getters.user !== null && this.$store.getters.user !== undefined){
          console.log("logged in as: ")
        }else{
          console.log("No user")
        }
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,700');
.container {
  /* background-color: aqua; */
  /* height: 100vh; */
  /* width: 100vw; */
}
.inspire {
  height: 100vh;
  width: 100vw;
}
</style>
