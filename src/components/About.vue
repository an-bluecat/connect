<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>Right now this will be used for experimenting vuetify features</p>
    ok
    <Signup/>


  </div>
</template>

<script>
import Signup from './User/Signup'

export default {
  components: {
    Signup
  },
  computed: {
      meetups () {
        return this.$store.getters.featuredMeetups
      },
      loading () {
        return this.$store.getters.loading
      }
  },
}


</script>

<style scoped>

</style>