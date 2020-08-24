<template>
  <div id="container" fluid ma-0 pa-0 fill-height>
    <NavgationBar/>
    <router-view></router-view>
  </div>
</template>


<script>
import fileUploads from "../fileUpload/fileUploads";
import CreatefileUpload from "../fileUpload/CreatefileUpload";
import ratings from "../ratings";
import DiscussionBoard from "../DiscussionBoard";
import NavgationBar from "./NavigationBar";
import addRating from "../addRating";
import fileUpload from "../fileUpload/fileUpload";

// const baseURL="https://connectheroserver.herokuapp.com/";
// const baseURL="http://localhost:5000/";
// const baseURL="https://cors-anywhere.herokuapp.com/https://restapipostgre.herokuapp.com/";
const baseURL="https://restapipostgre.herokuapp.com/";


export default {
  name:"courseInstance",
  components: {
    fileUploads,
    CreatefileUpload,
    ratings,
    DiscussionBoard,
    NavgationBar,
    addRating,
    fileUpload
  },
  data(){
    return {
      comments: [],
      ratings:[],
      commentName: '',
      dialog: false, //for dialog/input popup when click on "add information"
      timestamp: "",
      average: -1,
      classname: this.$route.params.name,
      items: [
        { title: 'Discussion', icon: 'mdi-comment-account-outline' },
        { title: 'Ratings', icon: 'mdi-star' },
        { title: 'Resources', icon: 'mdi-semantic-web' },
      ],
    }
  },
  methods: {
    getname: function (){
      return this.$route.params.name
    },
    // get time
    getNow: function() {
      const today = new Date();
      const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date +' '+ time;
      this.timestamp = dateTime;
    },
  }
}
</script>

<style scoped>
#container {
  display: flex;
  flex-direction: row;
}
</style>