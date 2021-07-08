
<template>
  <v-container class="mt-10">
    <v-layout row>
      <v-flex col="12" xl="10" lg="10" md="10" sm="10" xs="10">
        <h4>Upload a new file for {{classname}}</h4>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onCreatefileUpload">
          <v-layout row>
            <v-flex class="mx-4" col="12" xl="10" lg="10" md="10" sm="10" xs="10">
              <!-- <v-text-field
                name="type"
                label="type"
                id="type"
                v-model="type"
                required></v-text-field> -->
              <v-select
                :items="docTypes"
                label="Type"
                v-model="type"
              ></v-select>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex class="mx-4" col="12" xl="10" lg="10" md="10" sm="10" xs="10">
              
            
            <v-file-input chips label="Upload File" @change="onFilePicked"></v-file-input>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <!-- <v-text-field
                name="description"
                label="Display Name As "
                id="description"
                multi-line
                v-model="description"
                required></v-text-field> -->
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex class="ml-4" col="12" xl="12" lg="12" md="12" sm="12" xs="12">
              <v-btn
                class="primary"
                :disabled="!formIsValid"
                type="submit"

                :loading="dialog"
                
                color="purple darken-2"
                @click="dialog = true"
                >Submit</v-btn>
            </v-flex>
          </v-layout>

          <v-layout row class="mt-6">
            <v-flex xs12 sm6 offset-sm3>
              <v-alert v-show="showAlert"
              dense type="error"
              >You have not login yet</v-alert>
            </v-flex>
          </v-layout>

          <v-dialog
            v-model="dialog"
            hide-overlay
            persistent
            width="300"
          >
            <v-card
              color="primary"
              dark
            >
              <v-card-text>
                Please stand by
                <v-progress-linear
                  indeterminate
                  color="white"
                  class="mb-0"
                ></v-progress-linear>
              </v-card-text>
            </v-card>
          </v-dialog>

        </form>
      </v-flex>
    </v-layout>

  </v-container>


</template>

<script>
  export default {
    name: "CreatefileUpload",
    props: ["classname"],
    data () {
      return {
        type: '',
        imageUrl: '',
        description: '',
        time: new Date(),
        // this is the raw file
        image: null,
        docTypes: ['Textbook', 'Test/Quiz', 'Syllabus', 'Notes', 'Others'],
        //Alert Info
        showAlert: false,
        //Dialog Infp
        dialog: false
      }
    },
    watch: {
      getCurrent (curval,oldval) {
        if(curval == 1) {
          this.dialog = true
        }
        if(curval == 0) {
          this.dialog = false
          this.$router.replace('/rate/' + this.classname)
        }
      }
    },
    computed: {
      formIsValid () {
        return this.type !== '' &&
          this.imageUrl !== '' &&
          // this.description != '' && 
          this.image != null
      },
      getCurrent() {
        return this.$store.getters.loadedcurrentUploads;
      }
      // submittableDateTime () {
      //   const date = new Date(this.date)
      //   if (typeof this.time === 'string') {
      //     let hours = this.time.match(/^(\d+)/)[1]
      //     const minutes = this.time.match(/:(\d+)/)[1]
      //     date.setHours(hours)
      //     date.setMinutes(minutes)
      //   } else {
      //     date.setHours(this.time.getHours())
      //     date.setMinutes(this.time.getMinutes())
      //   }
      //   return date
      // }
    },
    methods: {
      onCreatefileUpload () {
        if (!this.formIsValid) {
          return
        }
        if (!this.image){
          return
        }
        if (this.$store.getters.user == null) {
          this.showAlert = true;
          return
        }else {this.showAlert = false}
        // get time: this will get zulu time
        var today = new Date();
        // var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        // var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        // var dateTime = date+' '+time;
        var dateTime = today
        const user = this.$store.getters.user ? this.$store.getters.user : 'unknown';
        const fileUploadData = {
          type: this.type,
          // location: this.location,
          image: this.image, // submit binary file
          // description: this.description,
          date: dateTime,
          classname: this.$props.classname,
          user: user
        }
        this.$store.dispatch('createfileUpload', fileUploadData)
        // add state_changed over-> $router.replace
        // this.$router.replace('/rate/' + this.classname)
      },
      onPickFile(){
        // $ gives all the ref in this component
        this.$refs.fileInput.click();
      },
      onFilePicked(file){
        let filename = file.name;
        // doesn't have extension in the filename
        if (filename.lastIndexOf('.') <= 0){
          return alert("Please add a valid file!")
        }
        // turn binary file to string value
        const fileReader = new FileReader()
        fileReader.addEventListener('load',()=>
          // result is the base 64 string. imageURL can preview with this
          this.imageUrl = fileReader.result
        )
        fileReader.readAsDataURL(file)

        // store binary file
        this.image = file
      }
    }
  }
</script>
