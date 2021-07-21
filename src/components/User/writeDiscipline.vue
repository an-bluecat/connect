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
              <form @submit.prevent="onSubmit">
                <v-list-item-title class="">Your discipline</v-list-item-title>
              
                <v-layout row class="mb-2">
                  <v-flex xs12>
                    <v-select 
                      :items="disciplines"
                      label="discipline"
                      v-model="discipline"
                      @change="updateDiscipline()"
                    >
                    <!-- <input:required="!discipline"/> -->
                    </v-select>
                  </v-flex>
                </v-layout>
                
                <v-list-item-title class="">Class of</v-list-item-title>
              
                <v-layout row class="mb-2">
                  <v-flex xs12>
                    <v-select 
                      :items="gradyears"
                      label="grad year"
                      v-model="gradyear"
                      @change="updateGradYear()"
                    >
                    <!-- <input:required="!discipline"/> -->
                    </v-select>
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
        discipline: "",
        disciplines: ['Chem', 'Civ', 'ECE', 'EngSci', 'Indy', 'MSE', 'Mech', 'Min', 'Rotman-Finance','Rotman-Accounting','Rotman-Management','Others'],
        gradyear: "",
        gradyears: ["2025","2024","2023","2022","2021","2020","2019","2018",]
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
      updateDiscipline () {
        this.$store.dispatch('updateDiscipline', this.discipline)
      
          // this.$router.replace('/');
          // location.reload();
      },
      updateGradYear () {
        this.$store.dispatch('updateGradYear', this.gradyear)
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
