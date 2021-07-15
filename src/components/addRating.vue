
<template>
  <v-container>
    <v-row no-gutters class="py-10">
        <v-col cols="12" xs="12" sm="12" md="9" lg="9" xl="9" :class="titleStyle">
          Rate {{classname}}
        </v-col>
    </v-row>

    <v-row no-gutters class="px-3">
        <v-col>
          <form @submit.prevent="handleSubmit">
            <v-layout row>
              <v-flex cols="12" xs="12" sm="12" md="9" lg="9" xl="9">
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
              <v-flex cols="12" xs="12" sm="12" md="9" lg="9" xl="9">
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
              <v-flex cols="12" xs="12" sm="12" md="9" lg="9" xl="9">
                <v-text-field
                  name="Professor's name"
                  label="Professor's name (Optional)"
                  id="Professor's name"
                  v-model="formData.pname"
                  ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex cols="12" xs="12" sm="12" md="9" lg="9" xl="9">
                <v-textarea
                  name="description"
                  label="How do you like this course?（Optional)"
                  id="description"
                  multi-line
                  v-model="formData.comment"
                  ></v-textarea>
              </v-flex>
            </v-layout>
            <!-- <v-layout row v-show="showArea"> -->
            <v-layout row>

              <v-flex  cols="12" xs="12" sm="12" md="9" lg="9" xl="9">
                <v-checkbox
                  v-show="showUserName"
                  v-model="formData.showName"
                  label="Show your username and profile picture"
                ></v-checkbox>
                <!-- <v-list-item-title class="text-h8 font-weight-medium black--text">Disciplines</v-list-item-title> -->
                <v-col class="mt-n4 ml-n2" col="12" xl="5" lg="5" md="5" sm="5" xs="5">
                  <v-select
                    v-show="!showUserName"
                    :items="disciplines"
                    label="Your discipline(optional)"
                    v-model="formData.discipline"
                  ></v-select>
                </v-col>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex cols="12" xs="12" sm="12" md="9" lg="9" xl="9">
                <v-btn
                  class="primary"
                  :disabled="!formIsValid"
                  type="submit">Submit</v-btn>
              </v-flex>
            </v-layout>
          </form>
        </v-col>
    </v-row>

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
        pname: "",
        showName: false,
        discipline: ''
      },
      // rateoptions: [0,1,2,3,4,5],
      //userinfo
      email: '',
      disciplines: ['Chem', 'Civ', 'ECE', 'EngSci', 'Indy', 'MSE', 'Mech', 'Min', 'Others'],
      // disciplines: ['ECE', 'EngSci', 'Indy', 'Chem', 'Mech', 'Civ', 'MSE', 'Min', 'Others'],

    }
  },
  created() {
      setInterval(this.getNow, 1000);
      if(this.$store.getters.user != null) {
        this.$store.dispatch('getUserProfile', {})
        // this.displayName = this.$store.getters.userProfile.displayName;
        // this.formData.discipline = this.$store.getters.userProfile.discipline;

    }

  },

  computed: {
    // make sure rating is completed / rating 必填，其他选填
    userLoggedIn(){
      return this.$store.getters.user != null ;
    }, 
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
        return "Easier than average"
      }else if(this.formData.rate<=3){
        return "Neutral"
      }else if(this.formData.rate<=4){
        return "Harder than average"
      }else{
        return "Very Hard"
      }
    },
    displayUsefulness (){
      if(this.formData.usefulness==-1){
        return "Select Usefulness";
      }else if(this.formData.usefulness<=1){
        return "Not Useful";
      }else if(this.formData.usefulness<=2){
        return "Less useful"
      }else if(this.formData.usefulness<=3){
        return "Neutral"
      }else if(this.formData.usefulness<=4){
        return "More useful"
      }else{
        return "Very useful"
      }
    },
    titleStyle() {
      switch (this.$vuetify.breakpoint.name) {
          case 'xs': return "text-h5 font-weight-bold"
          case 'sm': return "text-h4 font-weight-bold"
          case 'md': return "text-h4 font-weight-bold"
          case 'lg': return "text-h3 font-weight-bold"
          case 'xl': return "text-h3 font-weight-bold"
        }
    },
    showArea() {
      return this.formData.comment == '' ? false : true
    },
    showUserName() {
      return this.$store.getters.user ? true : false
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



        // get time: this will get zulu time
        var time = new Date();

        const now = time.getFullYear()+'-'+(time.getMonth()+1)+'-'+time.getDate();
        const user = this.$store.getters.user ? this.$store.getters.user : '';
        if(this.userLoggedIn){
          this.formData.discipline = this.$store.getters.userProfile.discipline;
          console.log("this.formData.discipline",this.formData.discipline)
        }
        const comment = {
          "classname": this.classname, 
          "user": user, 
          "comment": this.formData.comment, 
          "time_log": time,
          "time": now, 
          "rate": this.formData.rate,
          "pname": this.formData.pname,
          "usefulness": this.formData.usefulness,
          "show_name": this.formData.showName,
          "discipline": this.formData.discipline
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


