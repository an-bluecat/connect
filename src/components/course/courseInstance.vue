<template>
    <div>
        <h1>{{this.$route.params.name}}</h1>
        <!-- <h1>rating: <b>{{average}}</b> /5</h1> -->
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
                <v-tab>
                <v-icon left>mdi-access-point</v-icon>
                Documents
                </v-tab>

                <!-- ##############tab 1############### -->
                <v-tab-item>
                <v-card flat>
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
                    <ratings v-bind:classname="classname"></ratings>
                </v-card>
                </v-tab-item>
                <!-- ##############tab 3############### -->
                <v-tab-item>
                <v-card flat>
                    <fileUploads v-bind:classname="classname"></fileUploads>     
                </v-card>
                </v-tab-item>
            </v-tabs>
            </v-card>
            <!-- <v-container> -->
              <v-card
                height="600"
                class="overflow-hidden"
              >
                <v-navigation-drawer
                  v-model="drawer"
                  :color="primary"
                  :permanent="permanent"
                  :src="bg"
                  absolute
                  dark
                >
                  <v-list
                    dense
                    nav
                    class="py-0"
                  >
                    <v-list-item >
          
                      <v-list-item-content>
                        <v-list-item-title>{{classname}}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
          
                    <v-divider></v-divider>
          
                    <v-list-item
                      v-for="item in items"
                      :key="item.title"
                      link
                      @click="onclickoptions(item)"
                    >
                      <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                      </v-list-item-icon>
          
                      <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-navigation-drawer>
              </v-card>
            <!-- </v-container> -->
        </v-app>
    </div>
</template>


<script>
import axios from "axios";
import fileUploads from "../fileUpload/fileUploads";
import CreatefileUpload from "../fileUpload/CreatefileUpload";
import ratings from "../ratings";


// const baseURL="https://connectheroserver.herokuapp.com/";
// const baseURL="http://localhost:5000/";
// const baseURL="https://cors-anywhere.herokuapp.com/https://restapipostgre.herokuapp.com/";
const baseURL="https://restapipostgre.herokuapp.com/";


export default {
    name:"courseInstance",
    components: {
      fileUploads,
      CreatefileUpload,
      ratings
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
              { title: 'Discussion', icon: 'mdi-view-dashboard' },
              { title: 'Ratings', icon: 'mdi-image' },
              { title: 'Resources', icon: 'mdi-help-box' },
            ],

        }
    },

    async created(){  // run when page loads
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
            const avg=await axios.get(baseURL+x+'/average');
            this.average=avg.data['rate']
            // console.log(this.average)

        }catch(e){
            console.error(e);
        }
        setInterval(this.getNow, 1000);
      
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
      async addcomment() {
            //construct comment
            var comment = {"israting": false, "user": "unknown", "comment": this.commentName, "time": this.timestamp, "likes": 0, "rate": 0}
            // post to db
            const res = await axios.post(baseURL+(this.$route.params.name), comment)
            // add to comments
            this.comments = [...this.comments, res.data]
            //clear commentName input binding
            this.commentName = ''
      },
        // remove a comment. Currently not in use
      async remove(id){
            var x=(this.$route.params.name);
            var y=baseURL+x
            var z=y+"/"
            const res = await axios.delete(z+id);
            const res1 = await axios.get(z);
            this.courseInstance=res1.data;
        },
      onclickoptions(option) {
        console.log("option", option)
        if(option['title'] == "Discussion"){
          return this.$router.push('/course/' + this.$route.params.name)
        }
        if(option['title'] == "Ratings"){
          return this.$router.push('/course/' + this.$route.params.name + '/ratings')
        }
        if(option['title'] == "Resources"){
          return this.$router.push('/course/' + this.$route.params.name + '/resources')
        }
      }
  }
}
</script>

<style scoped>
 h1{
     text-align:center
 }
 

</style>