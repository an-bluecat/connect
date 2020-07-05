<template>
    <div>
        <h1>{{this.$route.params.name}}</h1>

        <v-app id="inspire">
            <v-card>
            <v-tabs vertical>
                <v-tab>
                <v-icon left>mdi-account</v-icon>
                Info Board
                </v-tab>
                <v-tab>
                <v-icon left>mdi-access-point</v-icon>
                Rate This Class
                </v-tab>
        
                <v-tab-item>
                <v-card flat>
                   
                        <input placeholder="your comments here" v-model="commentName" @keyup.enter="addcomment" v-validate="'min:5'" name="courseName">
                        <p class="alert" v-if="errors.has('courseName')">{{errors.first('courseName')}}</p>

                        <ul>
                            <li v-for="comment of ratings" :key="comment.id">
                                {{comment.comment}}
                                <i class="fa fa-minus-circle" v-on:click="remove(comment.id)"></i>
                            </li>
                        </ul>   
                </v-card>


                </v-tab-item>
                <v-tab-item>
                <v-card flat>
                    <v-card-text>
                    <v-btn><router-link v-bind:to="{
                        name: 'class-rating',
                        params:{name: this.$route.params.name, id: 1}
                    }">
                    Rate This Class
                    </router-link></v-btn>

                    <h5 v-for="comment of comments" :key="comment.id">
                        
                        rate: {{comment.rate}}
                        <br>
                        Review: {{comment.comment}}
                        <hr>

                        
                    </h5>
                    
        

                    </v-card-text>
                </v-card>
                </v-tab-item>
            
            </v-tabs>
            </v-card>
        </v-app>
       


    </div>
    
</template>


<script>
import axios from "axios";


// const baseURL="https://connectheroserver.herokuapp.com/";
const baseURL="http://localhost:5000/";
// const baseURL="https://cors-anywhere.herokuapp.com/https://restapipostgre.herokuapp.com/";



export default {
    name:"courseInstance",
    data(){
        return {
            comments: [],
            ratings:[],
            commentName: '',
            rating: 3,
            items: ['1', '2', '3', '4', '5']
        }
    },
    async created(){
        try{
            var x=(this.$route.params.name);
            const res = await axios.get(baseURL+x);
            for(var i=0;i<res.data.length; i++){
              if(res.data[i]["israting"]==true){
                this.comments.push(res.data[i])
              }else{
                this.ratings.push(res.data[i])
              }
            }

        }catch(e){
            console.error(e);
        }
    },
    methods: {
        async addcomment() {
            //construct comment
            var comment = {"israting": false, "user": "unknown", "comment": this.commentName, "time": "not set", "likes": 0, "rate": 0}

            // post to db
            const res = await axios.post(baseURL+(this.$route.params.name), comment)

            console.log(res)
            // console.log("comment",commentName)

            // add to comments
            this.comments = [...this.comments, res.data]

            //clear commentName input binding
            this.commentName = ''
        },
        async remove(id){
            var x=(this.$route.params.name);
            var y=baseURL+x
            var z=y+"/"
            const res = await axios.delete(z+id);
            // sleep(500)
            const res1 = await axios.get(z);
            this.courseInstance=res1.data;


        }
  }
}
</script>

<style scoped>
 h1{
     text-align:center
 }
 @import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";
@import "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"; 
  .holder {
    background: #fff;
  }
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
  
  ul li {
    padding: 20px;
    font-size: 1.3em;
    background-color: #E0EDF4;
    border-left: 5px solid #3EB3F6;
    margin-bottom: 2px;
    color: #3E5252;
  }
  p {
    text-align:center;
    padding: 30px 0;
    color: gray;
  }
  /* .container {
    box-shadow: 0px 0px 40px lightgray;
  } */
  input {
    width: calc(100% - 40px);
    border: 0;
    padding: 20px;
    font-size: 1.3em;
    background-color: #323333;
    color: #687F7F;
  }
  .alert {
    background: #fdf2ce;
    font-weight: bold;
    display: inline-block;
    padding: 5px;
    margin-top: -20px;
  }
  .alert-in-enter-active {
    animation: bounce-in .5s;
  }
  .alert-in-leave-active {
    animation: bounce-in .5s reverse;
  }
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
i {
  float:right;
  cursor:pointer;
}
</style>