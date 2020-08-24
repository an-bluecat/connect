<template>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h6 class="primary--text">{{ fileUpload.title }}</h6>
          </v-card-title>
          <v-img 
            :src="fileUpload.imageUrl"
            height="400px"
          ></v-img >
          <v-card-text>
            <div class="info--text">{{ fileUpload.date | date }} - {{ fileUpload.location }}</div>
            <div>{{ fileUpload.description }}</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="primary">Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
</template>

<script>
  export default {
    props: ['id'],
    computed: {
      fileUpload () {
        return this.$store.getters.loadedfileUpload(this.id)
      }
    }
  }
</script>
