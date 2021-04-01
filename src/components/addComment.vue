<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h1>Comment {{classname}}</h1>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="handleSubmit">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-textarea
                name="description"
                label="Here is your chance to be more specific"
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
        timestamp: "",
      },
      email: 'unknown'
    }
  },
  created() {
      setInterval(this.getNow, 1000);
      this.getCookie();
  },
  computed: {
    formIsValid () {
      return this.comment!= ""
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
        // get time: this will get zulu time
        var time = new Date();
        const comment = {"classname": this.classname, "user": this.email, "comment": this.formData.comment, "time": time}
        this.$store.dispatch('addComment', comment)
        // this.$router.push('/rate/' + this.classname)
        this.$router.replace('/rate/' + this.classname)
    },
    //读取cookie
    getCookie: function() {
        if (document.cookie.length > 0) {
            this.showLoginInfo = true;
            var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
            for (var i = 0; i < arr.length; i++) {
                var arr2 = arr[i].split('='); //再次切割
                //判断查找相对应的值
                if (arr2[0] == 'email') {
                    this.email = arr2[1]; //保存到保存数据的地方
                }
            }
        }
    },
  }
}
</script>


