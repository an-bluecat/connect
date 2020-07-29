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
      <v-btn >
        <router-link to="/signin">
        signin
        </router-link>
      </v-btn>
      <v-btn >
        <router-link to="/signup">
        signup
        </router-link>
      </v-btn>

  </div>
</template>

<script>
import Signup from './User/Signup'
import Signin from './User/Signin'
import CreatefileUpload from './Meetup/CreatefileUpload'
import fileUploads from './Meetup/fileUploads'

export default {
  components: {
    Signup,
    Signin,
    CreatefileUpload,
    fileUploads
  },
  computed: {
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      }
  },
  methods:{
    // test(){
    //   const fileUploadData = {
    //   title: this.title,
    //   location: this.location,
    //   image: this.image, // submit binary file
    //   description: this.description,
    //   date: this.submittableDateTime
    //   }
    // // call createfileUpload in index/actions
    // // this.$store.dispatch('createfileUpload', fileUploadData)
    // }
  }
}


</script>

<style scoped>

</style>