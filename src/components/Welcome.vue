<template>
  <v-parallax src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
    <!-- <v-parallax src="@/assets/cat.jpeg"> -->
    <h1><center>
        Welcome to U of T Connect
    </center></h1>
  </v-parallax>
</template>

<script>
import courseList from './courseList'

export default {
    
    data () {
        return {
           
        }
    },
    components: {
        courseList
    }
}
</script>

<style scoped>
.h1{
    text-align: center;
}
</style>