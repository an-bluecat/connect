<template>
  <v-container class="wrap">
    <!-- alert component, from ./Shared/Alert -->
    <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm3>
          <!-- app-alert component is a self defined component, registered in main.js -->
          <!-- listen to dismissed event, called by onClose in alert.vue -->
          <!-- pass error.message to Alert -->
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>
      <v-flex >
              <!-- stop the form from submitting the normal way and execute myFunction() instead -->
              <form @submit.prevent="onSignup">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="email"
                      label="U of T Email"
                      id="email"
                      v-model="email"
                      type="email"
                      required
                      :rules="emailRules"
                      ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
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
                  <v-flex xs12>
                    <v-text-field
                      name="confirmPassword"
                      label="Confirm Password"
                      id="confirmPassword"
                      v-model="confirmPassword"
                      type="password"
                      :rules="[comparePasswords]"></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn color="primary" style="width: 100%;" type="submit" :disabled="loading" :loading="loading">
                      Sign up
                       <span slot="loader" class="custom-loader">
                        <v-icon light>loading</v-icon>
                       </span>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </form>
      </v-flex>
  </v-container>
</template>

<script>
  export default {
    name: "Signup",
    data () {
      return {
        email: '',
        password: '',
        confirmPassword: '',
        emailRules: [
          // v => !!v || 'E-mail is required',
          // v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
          // v => (v.endsWith("utoronto.ca")) || 'Please use your U of T Email',
        ],
      }
    },
    computed: {
      // check if password and confirmPassword input is the same
      comparePasswords () {
        return this.password !== this.confirmPassword ? 'Passwords do not match' : ''
      },
      // checkMail () {
      //   var correct = this.email.endsWith("utoronto.ca")
      //   return correct == false ? "Please use your U of T Email" : ""
      // },
      user () {
        return this.$store.getters.user
      },
      error () {
        return this.$store.getters.error
      },
      loading () {
        // return this.$store.getters.loading
        return this.$store.getters.signloading
      }
    },
    watch: {
      // watch whenever getter gives us a new state
      // user (value) {
      //   // There is a user, redirect to '/'
      //   if (value !== null && value !== undefined) {
      //     this.$router.push('/about')
      //   }
      // }
    },
    methods: {
      onSignup () {
        // if(this.email.endsWith("utoronto.ca")){
          this.$store.dispatch('signUserUp', {email: this.email, password: this.password});
          // this.$router.replace('/');
          // location.reload();
        // }
        
      },
      onDismissed () {
        this.$store.dispatch('clearError')
      }
    }
  }
</script>
<style scoped lang="scss">
.wrap{
  width: 100%;
  height: auto;
  padding: 33px;
.row{
  margin: 0;
}
.btn{
  width: 100%;
}
}
</style>
