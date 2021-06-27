<template>

  <v-app id="inspire">
    <div>
      <TopPanel v-show="showPath"/>
    </div>
    
    <main>
      <router-view></router-view>

    </main>
          <!-- <v-footer
      color="primary lighten-1"
      padless
      bottom fixed
    >
    <v-row
        justify="center"
        no-gutters
      >
        <v-btn
          color="white"
          text
          rounded
          class="my-2"
          href="mailto:j@gmail.com"
        >Contact Us
          
        </v-btn>
    </v-row>
    </v-footer> -->
    

  </v-app>
</template>

<script>
import TopPanel from './components/TopPanel'

export default {
  name: 'App',
  components: {
    TopPanel,
  },
  data() {
    return {
      path: '',
      showPath: true,
    }
  },
  computed: {
    userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      }
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
