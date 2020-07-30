<template>
  <v-container>
    <v-card-text>
      <h3>average rating: {{average}}/5</h3>
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
      },
      average () {
        const ratings = this.$store.getters.loadedRatings;
        var total = 0;
        // for loop in javascript gets the key of the object, not the object
        for(let ratingnum in ratings){
          total = total + ratings[ratingnum]['rate']
        }
        var average=total/(Object.keys(ratings).length)
        return average.toPrecision(2);
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
