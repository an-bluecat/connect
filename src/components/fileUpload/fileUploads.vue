<template>
  <v-container>
    <v-layout row warp class="mb-2">
    <v-flex xs12 sm10 md8 offset-sm1 offset-md2 class="text-xs-center text-sm-center">
        <h1>{{classname}}</h1>
        <v-select
            :items="docTypes"
            label="Filter"
            outlined
            dense
            v-model="type"
        ></v-select>
      <v-btn class="mb-2" @click="onclickupload()">upload file</v-btn>
    </v-flex>
    </v-layout>
    <v-layout row wrap v-for="fileUpload in fileUploads" :key="fileUpload.id" class="mb-2">
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card>
          <v-container fluid>
            <v-layout row>
              <v-flex xs7 sm8 md9>
                <v-card-title primary-title>
                  <div>
                    <h5 class="black--text mb-0">{{ fileUpload.description }}</h5>
                    
                  </div>
                </v-card-title>
                <v-card-subtitle>
                  <div>{{ fileUpload.date }}</div>
                  type:{{ fileUpload.type }}
                </v-card-subtitle>

              </v-flex>
              <v-flex xs5 sm4 md3>
                <v-card-actions>
                  <v-btn class="info" text @click="redirect(fileUpload)" height="40px">
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
    data () {
      return{
        type: '',
        docTypes: ['All', 'Homework', 'Test/Quiz', 'Syllabus', 'Notes', 'Others'],
      }
    },
    created() {
        this.$store.dispatch('loadfileUploads', this.$props.classname)
    },
    computed: {
      fileUploads () {
        console.log("loaded files", this.$store.getters.loadedfileUploads)
        console.log(this.type)
        const files = this.$store.getters.loadedfileUploads;
        if(this.type == 'All' || this.type == ''){
          return files
        }
        else{
          var targetFile = []
          for(let filenum in this.$store.getters.loadedfileUploads){
            if(files[filenum]['type'] == this.type){
              targetFile.push(files[filenum])
            }
          }
          return targetFile;
        };
      }
    },
    methods: {
      redirect (fileUpload) {
        window.open(fileUpload.imageUrl, "_blank"); 
      },
      onclickupload: function(){
        this.$router.push('/addfile/' + this.classname)
      },
    }
  }
</script>
