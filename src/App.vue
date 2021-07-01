<template>

  <v-app>

    <div style="position: absolute;top:0;right:0;z-index: 11">
      <TopPanel/>
    </div>
    <!-- <v-app-bar app>
      <TopPanel/>
    </v-app-bar> -->
    <!-- <div id="container"> -->
    <main>
      <!-- <v-container fluid> -->
        <router-view></router-view>
      <!-- </v-container> -->
    </main>


    <!-- <v-footer
      app
      color="primary lighten-1"
      padless
      
    >
      <v-row
        justify="center"
        no-gutters
      >
        <v-btn
          v-for="link in links"
          :key="link"
          color="white"
          text
          rounded
        >
          {{ link }}
        </v-btn>
      </v-row>
    </v-footer> -->

    
  </v-app>
</template>

<script>
import TopPanel from './components/TopPanel'
// import Signup from './components/User/Signup'
// import Signin from './components/User/Signin'

export default {
  name: 'App',
  components: {
    TopPanel
  },
  data() {
    return {
      path: '',
      showPath: true,
      links: [
        'Contact Us',
      ],
    }
  },
  computed: {
    userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
    // localAttrs () {
    //   const attrs = {}
    //   // attrs['absolute'] = false
    //   attrs['fixed'] = true
    //   return attrs
    // },
  },
  // 判断路由
  mounted() {
    this.path = this.$route.path;
    // 要显示1./ 2.about 3.sources  其他不显示
    if(this.path == '/' || this.path == '/about' || this.path == '/courses') {
      this.showPath = true;
    }else {
      this.showPath = false;
    }
  },
  watch:{
      $route(to,from){
          this.path = to.path
          if(this.path == '/' || this.path == '/about' || this.path == '/courses') {
            this.showPath = true;
          }else {
            this.showPath = false;
          }
      }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,700');
.container {
  /* background-color: aqua; */
  height: 100vh;
  width: 100vw;
}
.inspire {
  height: 100vh;
  width: 100vw;
}
</style>
