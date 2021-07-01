
<template>
  <v-container>
    <v-layout row class="py-10">
      <v-flex xs12 sm6 offset-sm3>
        <h1>Rate {{classname}}</h1>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="handleSubmit">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
            <h6>{{display}}</h6>
            <v-rating
              v-model="formData.rate"
              color="yellow darken-3"
              background-color="grey darken-1"
              half-increments
              dense
              :readonly="false"
              :hover="true"
              size="30"
              required
            ></v-rating>
            
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
            <h6>{{displayUsefulness}}</h6>
            <v-rating
              v-model="formData.usefulness"
              color="yellow darken-3"
              background-color="grey darken-1"
              half-increments
              dense
              :readonly="false"
              :hover="true"
              size="30"
              required
            ></v-rating>


            </v-flex>
          </v-layout>


          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="Professor's name"
                label="Professor's name (Optional)"
                id="Professor's name"
                v-model="formData.pname"
                ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-textarea
                name="description"
                label="How do you like this course?（Optional)"
                id="description"
                multi-line
                v-model="formData.comment"
                ></v-textarea>
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
      // display:"select difficulty",
      formData: {
        comment: '',
        rate: -1,
        usefulness: -1,
        timestamp: "",
        pname: ""
      },
      // rateoptions: [0,1,2,3,4,5],
      //userinfo
      email: ''

    }
  },
  created() {
      setInterval(this.getNow, 1000);

  },
  computed: {
    // make sure rating is completed / rating 必填，其他选填
    formIsValid () {
      return this.formData.rate!=-1 && this.formData.usefulness!=-1;
      //return this.rate == 0 || this.rate == 1 || this.rate == 2 || this.rate == 3 || this.rate == 4 || this.rate == 5
      // && this.comment!= "" this.formData.comment!=""
    },
    display () {
      if(this.formData.rate==-1){
        return "Select difficulty";
      }else if(this.formData.rate<=1){
        return "Easy";
      }else if(this.formData.rate<=2){
        return "Slightly easy"
      }else if(this.formData.rate<=3){
        return "Medium"
      }else if(this.formData.rate<=4){
        return "Slightly hard"
      }else{
        return "Very Hard"
      }
    },
    displayUsefulness (){
      if(this.formData.usefulness==-1){
        return "Select Usefulness";
      }else if(this.formData.usefulness<=1){
        return "Useless";
      }else if(this.formData.usefulness<=2){
        return "Not so useful"
      }else if(this.formData.usefulness<=3){
        return "Somewhat useful"
      }else if(this.formData.usefulness<=4){
        return "Useful"
      }else{
        return "Very Useful"
      }
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
        if (!this.formIsValid) {
          return
        }
        // get IP
        // var myIP;
        // fetch('https://api.ipify.org?format=json')
        // .then(x => x.json())
        // .then(({ ip }) => {
        //     myIP = ip;
        // });
        // console.log("myIP",myIP)


        // get time: this will get zulu time
        var time = new Date();

        const now = time.getFullYear()+'-'+(time.getMonth()+1)+'-'+time.getDate();
        const user = this.$store.getters.user ? this.$store.getters.user : 'unknown';
        const comment = {
          "classname": this.classname, 
          "user": user, 
          "comment": this.formData.comment, 
          "time_log": time,
          "time": now, 
          "rate": this.formData.rate,
          "pname": this.formData.pname,
          "usefulness": this.formData.usefulness
        }
        this.$store.dispatch('addRating', comment)
        if (this.formData.comment.trim()!=""){
          this.$store.dispatch('addComment', comment);
        }
        
        // this.$router.push('/course/' + this.classname)
        // http://localhost:8080/#/project/rate/APS100H1
        // this.$router.push('/rate/' + this.classname)
        this.$router.replace('/rate/' + this.classname)
      
    }
  }
}
</script>


