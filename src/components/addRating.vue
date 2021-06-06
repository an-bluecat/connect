<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h1>Rate {{classname}}</h1>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="handleSubmit">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-select
                :items="rateoptions"
                label="workload"
                v-model="formData.rate"
              ></v-select>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="Professor's name"
                label="Professor's name"
                id="Professor's name"
                v-model="formData.pname"
                ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-textarea
                name="description"
                label="How do you like this course?"
                id="description"
                multi-line
                v-model="formData.comment"
                required></v-textarea>
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
import axios from "axios";
// const baseURL="http://localhost:5000/";
// const baseURL="https://cors-anywhere.herokuapp.com/https://restapipostgre.herokuapp.com/";
// const baseURL="https://restapipostgre.herokuapp.com/";


export default {
  name: 'home',
  props: ['classname'],
  data() {
    return {
      formData: {
        comment: '',
        rate: -1,
        timestamp: "",
        pname: ""
      },
      rateoptions: [0,1,2,3,4,5],
      //userinfo
      email: ''

    }
  },
  created() {
      setInterval(this.getNow, 1000);
  },
  computed: {
    formIsValid () {
      return this.rate != -1 && this.comment!= ""
    }
  },
  methods: {
    // get current time
    getNow: function() {
                    const today = new Date();
                    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                    const dateTime = date +' '+ time;
                    this.timestamp = dateTime;
    },
    handleSubmit() {
    //   var comment = {"israting": true, "user": "unknown", "comment": this.formData.comment, "time": this.timestamp, "likes": 0, "rate": this.formData.rate}
    // //   this.addPet(payload)

    //   // post to db
    //   const res1 = axios.post(baseURL+(this.classname), comment)
    //   // reset form after submit
    //   this.formData = {
    //     comment: '',
    //     rate: -1,
    //     timestamp: "",
    // // redirect to course page
    //   window.location.href = "https://myuoft.netlify.app/#/course/"+ (this.classname);
        if (!this.formIsValid) {
          return
        }
        // get time: this will get zulu time
        var time = new Date();
        const now = time.getFullYear()+'-'+(time.getMonth()+1)+'-'+time.getDate();
        const user = this.$store.getters.user ? this.$store.getters.user : 'unknown';
        const comment = {
          "classname": this.classname, 
          "user": user, 
          "comment": this.formData.comment, 
          "time": now, 
          "rate": this.formData.rate,
          "pname": this.formData.pname
        }
        this.$store.dispatch('addRating', comment)
        this.$store.dispatch('addComment', comment)
        // this.$router.push('/course/' + this.classname)
        // http://localhost:8080/#/project/rate/APS100H1
        // this.$router.push('/rate/' + this.classname)
        this.$router.replace('/rate/' + this.classname)
      
    }
  }
}
</script>


