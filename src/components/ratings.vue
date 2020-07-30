<template>
  <v-container>
    <v-card-text>
      <v-btn @click="onclickaddrating()">
      <!-- <router-link v-bind:classname="classname"> -->
      Rate This Class
      <!-- </router-link> -->
      </v-btn>

      <h5 v-for="comment of comments" :key="comment.id">
          
          rate: {{comment.rate}}
          <br>
          Review: {{comment.comment}}
          <br>
          {{comment.time}}
          <hr>
      </h5>
    </v-card-text>
  </v-container>
</template>

<script>
  export default {
    name: 'ratings',
    props: ['classname'],
    created () {
        // load files
        this.$store.dispatch('loadRatings', this.$props.classname)
    },
    computed: {
      comments () {
        return this.$store.getters.loadedRatings
      }
    },
    methods: {
      redirect (fileUpload) {
        window.open(fileUpload.imageUrl, "_blank"); 
      },
      onclickaddrating (){
        this.$router.push('/addrating/' + this.classname)
      },
    }
  }
</script>
