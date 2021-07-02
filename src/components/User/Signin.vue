<template>
  <v-container class="wrap">
    <v-layout row v-if="error">
      <v-flex style="padding: 0 12px" >
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex >
              <form @submit.prevent="onSignin">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="email"
                      label="Mail"
                      id="email"
                      v-model="email"
                      type="email"
                      required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex >
                    <v-text-field
                      name="password"
                      label="Password"
                      id="password"
                      v-model="password"
                      type="password"
                      required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex >
                    <v-btn class="btn" color="primary" type="submit" :disabled="loading" :loading="loading">
                      Sign in
                       <span slot="loader" class="custom-loader">
                        <v-icon light>loading</v-icon>
                       </span>
                    </v-btn>

                  </v-flex>
                </v-layout>
              </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

  export default {
    name: "Signin",
    data () {
      return {
        email: '',
        password: ''
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      },
      error () {
        return this.$store.getters.error
      },
      loading () {
        // console.log("this.$store.getters.signloading", this.$store.getters.signloading)
        return this.$store.getters.signloading
        // return false;
      }
    },
    watch: {
      // redirect if user sign in
      // user (value) {
      //   if (value !== null && value !== undefined) {
      //     this.$router.push('/about')
      //   }
      // }
    },
    methods: {
      onSignin () {
        //储存至Vuex
        this.$store.dispatch('signUserIn', {email: this.email, password: this.password})
        //储存至Cookie
        this.setCookie(this.email, this.password, 7);
      },
      onDismissed () {
        this.$store.dispatch('clearError')
      },
      //设置cookie
      setCookie(c_name, c_pwd, exdays) {
          var exdate = new Date(); //获取时间
          exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
          //字符串拼接cookie
          window.document.cookie = "email" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
          window.document.cookie = "password" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
      },
    }
  }
</script>
<style scoped lang="scss">
.wrap{
  width: 100%;
  height: auto;
  .row{
    margin: 0 2px !important;
  }
  .btn{
    width: 100%;
  }
}
</style>
