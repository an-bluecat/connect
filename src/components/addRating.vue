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
            <!-- <v-flex xs12 sm6 offset-sm3>
              <v-select
                :items="rateoptions"
                label="Difficulty"
                v-model="formData.rate"
                required
              ></v-select>
            </v-flex> -->
            <v-flex xs12 sm6 offset-sm3>
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
            <h6>{{display}}</h6>
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
      console.log(this.rate)
      return this.formData.rate!=-1
      //return this.rate == 0 || this.rate == 1 || this.rate == 2 || this.rate == 3 || this.rate == 4 || this.rate == 5
      // && this.comment!= "" this.formData.comment!=""
    },
    display () {
      if(this.formData.rate==-1){
        return "select difficulty";
      }else if(this.formData.rate<=1){
        return "easy";
      }else if(this.formData.rate<=2){
        return "slightly easy"
      }else if(this.formData.rate<=3){
        return "medium"
      }else if(this.formData.rate<=4){
        return "slightly hard"
      }else{
        return "hard"
      }
    }

  },
  // mounted() {
  //     console.log("this.formData.rate",this.formData.rate);
  //     console.log("this.formData[rate]",this.formData["rate"]);

  //     if(this.formData.rate==-1){
  //       this.display= "select difficulty";
  //     }else{
  //       this.display= "test";
  //     }
  // },
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
          "pname": this.formData.pname
        }
        this.$store.dispatch('addRating', comment)
        if (this.formData.comment!=""){
          // console.log("add comment");
          // console.log(comment)
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


