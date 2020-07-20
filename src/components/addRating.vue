<template>
    <div>
        <h1>Rate {{this.$route.params.name}}</h1>
        <b-form @submit.prevent="handleSubmit">

            <b-form-group id="exampleInputGroup3" label="Rating" label-for="exampleInput3">
                <b-form-select id="exampleInput3" :options="['0','1', '2','3','4','5']" required v-model="formData.rate" />
            </b-form-group>

            <b-form-group id="exampleInputGroup2" label="Your Comments" label-for="exampleInput2">
                <b-form-input
                id="exampleInput2"
                type="text"
                v-model="formData.comment"
                required
                placeholder="HERE'S YOUR CHANCE TO BE MORE SPECIFIC" />
            </b-form-group>
            


            <b-button type="submit" variant="primary">Submit</b-button>
            <!-- <b-button type="reset" variant="danger">Reset</b-button> -->
        </b-form>
    </div>
</template>

<script>
import axios from "axios";
// const baseURL="http://localhost:5000/";
// const baseURL="https://cors-anywhere.herokuapp.com/https://restapipostgre.herokuapp.com/";
const baseURL="https://restapipostgre.herokuapp.com/";


export default {
  name: 'home',
  data() {
    return {
      formData: {
        comment: '',
        rate: -1,
        timestamp: ""
      }
    }
  },
  created() {
      setInterval(this.getNow, 1000);
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
      var comment = {"israting": true, "user": "unknown", "comment": this.formData.comment, "time": this.timestamp, "likes": 0, "rate": this.formData.rate}
    //   this.addPet(payload)

      // post to db
      const res1 = axios.post(baseURL+(this.$route.params.name), comment)
      // reset form after submit
      this.formData = {
        content: '',
        rate: -1
      }
      //redirect to course page
      window.location.href = "https://myuoft.netlify.app/#/course/"+this.$route.params.name;
    }
  }
}
</script>


