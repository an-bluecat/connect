<template>
    <div>
        <h1>{{this.$route.params.name}}</h1>
        <h1>rating: <b>{{average}}</b> /5</h1>
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

                <!-- ##############tab 1############### -->
                <v-tab-item>
                <v-card flat>
                        <!-- <input placeholder="your comments here" v-model="commentName" @keyup.enter="addcomment" v-validate="'min:5'" name="courseName">
                        <p class="alert" v-if="errors.has('courseName')">{{errors.first('courseName')}}</p> -->

                        <ul>
                            <li v-for="comment of ratings" :key="comment.id">
                                {{comment.comment}}
                                <i class="fa fa-minus-circle" v-on:click="remove(comment.id)"></i>
                            </li>
                            
                        </ul>   
                        <!-- dialog popup -->
                        <div class="text-center">
                          <v-dialog
                            v-model="dialog"
                            width="500"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                color="red lighten-2"
                                dark
                                v-bind="attrs"
                                v-on="on"
                              >
                                Add Information
                              </v-btn>
                            </template>
                      
                            <v-card>
                              <v-card-title
                                class="headline grey lighten-2"
                                primary-title
                              >
                                Add Information for this course
                              </v-card-title>
                      
                              <v-card-text>
                                What's happening with {{this.$route.params.name}}? Are you looking for {{this.$route.params.name}} group? Post your message here.
                              </v-card-text>
                              <v-text-field v-model="commentName"></v-text-field>

                              <v-divider></v-divider>
                      
                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                  color="primary"
                                  text
                                  @click="addcomment(); dialog = false"
                                >
                                  Submit
                                </v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                        </div>
                        <!-- end of popup -->
                </v-card>


                </v-tab-item>

                <!-- ##############tab 2############### -->
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
                        <br>
                        {{comment.time}}
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
// const baseURL="http://localhost:5000/";
// const baseURL="https://cors-anywhere.herokuapp.com/https://restapipostgre.herokuapp.com/";
const baseURL="https://restapipostgre.herokuapp.com/";



export default {
    name:"courseInstance",
    data(){
        return {
            comments: [],
            ratings:[],
            commentName: '',
            rating: 3,
            items: ['1', '2', '3', '4', '5'],
            dialog: false, //for dialog/input popup when click on "add information"
            timestamp: "",
            average: -1
        }
    },
    async created(){
        try{
            // load ratings
            var x=(this.$route.params.name);
            const res = await axios.get(baseURL+x);
            for(var i=0;i<res.data.length; i++){
              if(res.data[i]["israting"]==true){
                this.comments.push(res.data[i])
              }else{
                this.ratings.push(res.data[i])
              }
            }
            console.log(this.comments)
            // load average rating
            const avg=await axios.get(baseURL+x+'/average');
            this.average=avg.data['rate']
            console.log(this.average)

        }catch(e){
            console.error(e);
        }


        setInterval(this.getNow, 1000);

    },
    methods: {
      // get time
      getNow: function() {
                    const today = new Date();
                    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                    const dateTime = date +' '+ time;
                    this.timestamp = dateTime;
                },

        async addcomment() {
            //construct comment
            var comment = {"israting": false, "user": "unknown", "comment": this.commentName, "time": this.timestamp, "likes": 0, "rate": 0}

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