<template>

  <v-app id="sprite">

    <div style="position: absolute;top:0;right:0;z-index: 11" class="my-2">
      <TopPanel></TopPanel>
      
    </div>
    <!-- <v-app-bar app>
      <TopPanel/>
    </v-app-bar> -->
    <!-- <div id="container"> -->
    <main>
      <!-- <v-container fluid> -->
        <router-view></router-view>
        <!-- <footer>this is the test Footer</footer> -->
      <!-- </v-container> -->
    </main>


    <v-row style="z-index:12">
      <v-col>
        <v-btn
          v-show="showContact"
          class="contact"
          color="primary"
          dark
          href="mailto:uofthub@gmail.com"
        >
          contact us
          <v-icon
            dark
            right
          >
            mdi-email
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>

    
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
      scroll: '',
      showContact: false,
      height: ''
    }
  },
  created() {
    this.$store.commit('reset');
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
    //监听滚动高度
    window.addEventListener('scroll',this.handleScroll)
  },
  methods: {
    handleScroll(){
        this.scroll = document.documentElement.scrollTop || document.body.scrollTop
        if(this.scroll >　100) {
          this.showContact = true;
        }else {
          this.showContact = false;
        }
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
.contact {
  position:fixed;
  bottom:0;
  right:0;
}
</style>
