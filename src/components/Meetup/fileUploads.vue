<template>
  <v-container>
    <v-layout row wrap v-for="fileUpload in fileUploads" :key="fileUpload.id" class="mb-2">
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card class="info">
          <v-container fluid>
            <v-layout row>
              <v-flex xs5 sm4 md3>
                <v-img 
                  :src="fileUpload.imageUrl"
                  height="130px"
                ></v-img >
              </v-flex>
              <v-flex xs7 sm8 md9>
                <v-card-title primary-title>
                  <div>
                    <h5 class="white--text mb-0">{{ fileUpload.description }}</h5>
                    <div>{{ fileUpload.date}}</div>
                    <h6>type:{{ fileUpload.type}}</h6>
                    <!-- <div>{{ fileUpload.date | date }}</div> -->
                  </div>
                </v-card-title>
                <v-card-actions>
                  <!-- <h5>{{classname}}</h5> -->
                  <v-btn text @click="redirect(fileUpload)">
                  <!-- <v-btn text :to="'/fileUploads/' + fileUpload.id"> -->
                    <!-- <v-icon left light>arrow_forward</v-icon> -->
                    View File
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    props: ['classname'],
    created() {
        // load files
        // console.log("classname", this.$props.classname)
        this.$store.dispatch('loadfileUploads', this.$props.classname)
    },
    computed: {
      fileUploads () {
        console.log("loaded files", this.$store.getters.loadedfileUploads)
        return this.$store.getters.loadedfileUploads
      }
    },
    methods: {
      redirect (fileUpload) {
        window.open(fileUpload.imageUrl, "_blank"); 
      }
    }
  }
</script>
