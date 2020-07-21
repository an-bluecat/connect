<template>

  <v-app id="inspire">
    <div>  <!--  Keep the div to avoid mysterious white space  -->
      <TopPanel/>
      <CreateMeetup/>
    </div>

    <router-view />
  </v-app>
</template>

<script>
import TopPanel from './components/TopPanel'
import CreateMeetup from './components/CreateMeetup'

export default {
  name: 'App',
  components: {
    TopPanel,
    CreateMeetup

  }
    
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,700');

</style>
