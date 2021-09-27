<template>
  <v-container class="wrap">
    <!-- alert component, from ./Shared/Alert -->
    <v-layout row v-if="error">
      <v-flex>
          <!-- app-alert component is a self defined component, registered in main.js -->
          <!-- listen to dismissed event, called by onClose in alert.vue -->
          <!-- pass error.message to Alert -->
        <app-alert @dismissed="onDismissed" :text="error.message" width="100%"></app-alert>
      </v-flex>
    </v-layout>
      <v-flex >
              <!-- stop the form from submitting the normal way and execute myFunction() instead -->
              <form @submit.prevent="onSignup" v-if="!showEmailSucc">
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
                <!-- discipline temporarily disabled -->
                <!-- <v-layout row>
                  <v-flex xs12>
                    <v-select 
                      :items="disciplines"
                      label="discipline"
                      v-model="discipline"
                    >
                    </v-select>
                  </v-flex>
                </v-layout> -->

                <v-layout row>
                  <v-flex xs12>
                    <v-btn color="primary" style="width: 100%;" type="submit" :disabled="loading" :loading="loading">
                      Sign up
                       <span slot="loader" class="custom-loader">
                        <v-icon light>loading</v-icon>
                       </span>
                    </v-btn>

                    <p class="text-center mt-2 mb-n1 font-weight-medium">OR</p>

                    <v-btn class="mt-2 white--text" style="width:100%;" color="#ea4335"  @click="onGoogleSignin()">
                    <!-- <v-btn class="mt-2" type="submit" style="width:100%;" color="secondary" @click="onGoogleSignin()"> -->
                      <v-icon class="mr-2" color="">mdi-google</v-icon>Continue with Google
                    </v-btn>
                    
                  </v-flex>
                </v-layout>
                
              </form>
              <v-alert
                      v-if="showEmailSucc"
                      class="mt-2 mb-n1"
                      
                      dismissible
                      type="success"
              >Verification email sent! <span class="">check your <span class=" black--text font-weight-bold">"JUNK" FOLDER</span></span> for the link.</v-alert>
      </v-flex>
  </v-container>
</template>

<script>
  export default {
    name: "Signup",
    data () {
      return {
        email: '',
        // email: 'your.name@mail.utoronto.ca',
        password: '',
        confirmPassword: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
          v => (v.endsWith("utoronto.ca")) || 'Please use your U of T Email',
        ],
        showEmailSucc: false,
        discipline: "",
        disciplines: [
          "(Engineering) Chem",
          "(Engineering) Civ",
          "(Engineering) ECE",
          "(Engineering) EngSci",
          "(Engineering) Indy",
          "(Engineering) MSE",
          "(Engineering) Mech",
          "(Engineering) Min",
          // "Finance",
          // "Accounting",
          // "Management",
          "Biology",
          "Computer Science",
          "Chemistry",
          "Economy",
          "Life Science",
          "Mathematics",
          "Physics",
          "Psychology",
          "Rotman",
          "Statistics",
          "Others/Undecleared",
        ],
      }
    },
    computed: {
      // check if password and confirmPassword input is the same
      comparePasswords () {
        return this.password !== this.confirmPassword ? 'Passwords do not match' : true
      },
      //doesn't work right now
      disciplinereq() {
        return this.discipline !== "" ? "Please select your discipline" : true
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
      loading (curval, oldval) {
        if(!curval && !this.error) {
          this.showEmailSucc = true;
          // setTimeout(() => (this.showEmailSucc = false), 10000)
        }
      },
    },
    methods: {
      onSignup () {
        if(this.email.endsWith("utoronto.ca") 
                            //&& this.discipline!=''
                             && this.confirmPassword!=''
                              && this.password!=''){
          
          this.$store.dispatch('signUserUp', {
            "email": this.email, 
            "password": this.password,
          //  "discipline": this.discipline
           });
          console.log("email sent")
          // this.$router.replace('/');
          // location.reload();
        }
        
      },
      onGoogleSignin(){
        this.$store.dispatch("googleSignin",{})
        // this.$router.go();
        // this.$forceUpdate();
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
