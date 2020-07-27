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
      <!-- <v-btn 
        @click="test()"
      >click1
      </v-btn> -->
    <CreatefileUpload/>
    <fileUploads/>
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
        if(this.$store.getters.user !== null && this.$store.getters.user !== undefined){
          console.log(this.$store.getters.user)
        }
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
    // // console.log("ok")
    // // console.log(this.$store.state.loadedfileUploads)

    // console.log(this.$store.dispatch('loadfileUploads'))
    // }
  }
}


</script>

<style scoped>

</style>