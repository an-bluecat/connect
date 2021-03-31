
<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h4>Upload a new file for {{classname}}</h4>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onCreatefileUpload">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
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
            <v-flex xs12 sm6 offset-sm3>
              <!-- use button to collect image
              <v-btn raised class="primary" @click="onPickFile">Upload File</v-btn>
              
              <input 
                type="file" 
                style="display: none" 
                ref="fileInput"
                @change="onFilePicked"> -->
            
            <v-file-input chips label="Upload File" @change="onFilePicked"></v-file-input>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="description"
                label="Display Name As "
                id="description"
                multi-line
                v-model="description"
                required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn
                class="primary"
                :disabled="!formIsValid"
                type="submit">Submit</v-btn>
            </v-flex>
          </v-layout>
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
        docTypes: ['Homework', 'Test/Quiz', 'Syllabus', 'Notes', 'Others']
      }
    },
    computed: {
      formIsValid () {
        return this.type !== '' &&
          this.imageUrl !== '' &&
          this.description != '' && 
          this.image != null
      },
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
        // get time: this will get zulu time
        var today = new Date();
        // var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        // var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        // var dateTime = date+' '+time;
        var dateTime = today
        const fileUploadData = {
          type: this.type,
          // location: this.location,
          image: this.image, // submit binary file
          description: this.description,
          date: dateTime,
          classname: this.$props.classname
        }
        this.$store.dispatch('createfileUpload', fileUploadData)
        this.$router.push('/project/rate/' + this.classname)
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
