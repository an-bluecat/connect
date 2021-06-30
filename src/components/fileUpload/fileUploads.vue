  <!-- CURRENTLY NOT USED !!!! -->
<template>
  <v-app>
  <v-navigation-drawer
      permanent="permanent"
      absolute
      dark
    >
      <v-list
        dense
        nav
        class="py-0"
      >
        <v-list-item >

          <v-list-item-content>
            <v-list-item-title>{{classname}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          @click="onclickoptions(item)"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  <v-content>
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
          <!-- <v-card class="info"> -->
            <v-container fluid>
              <v-layout row>
                <!-- <v-flex xs5 sm4 md3>
                  <v-img 
                    :src="fileUpload.imageUrl"
                    height="130px"
                  ></v-img >
                </v-flex> -->
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
                    <!-- <h5>{{classname}}</h5> -->
                    <v-btn class="info" text @click="redirect(fileUpload)" height="40px">
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
  </v-content>
  </v-app>
</template>


<script>
  export default {
    props: ['classname'],
    data () {
      return{
        type: '',
        docTypes: ['All', 'Homework', 'Test/Quiz', 'Syllabus', 'Notes', 'Others'],
        items: [
          { title: 'Discussion', icon: 'mdi-comment-account-outline' },
          { title: 'Ratings', icon: 'mdi-star' },
          { title: 'Resources', icon: 'mdi-semantic-web' },
        ],
      }
    },
    created() {
        // load files
        
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
      onclickoptions(option) {
        return this.$router.push('/rate/' + this.classname);
        console.log("option", option)
        if(option['title'] == "Discussion"){
          return this.$router.push('/course/' + this.classname)
        }
        if(option['title'] == "Ratings"){
          return this.$router.push('/course/' + this.classname + '/ratings')
        }
        if(option['title'] == "Resources"){
          return this.$router.push('/course/' + this.classname + '/resources')
        }
      }
    }
  }
</script>
