// 这是单独的课程界面


<template>
  <v-app id="inspire">
    <!-- <v-main class="grey lighten-3"> -->
    <!-- <v-container class="grey lighten-3" fluid> -->
    <v-container fluid class="px-10">
      <v-row no-gutters style="background-color: white" class="px-0">
      
        <v-col lg="3" sm="3" md="3" xs="12">
        <!-- <v-col lg3 sm3 md3 xs12> -->

          <v-list-item>
            <v-list-item-content>
              <v-breadcrumbs :items="bitems" large></v-breadcrumbs>
            </v-list-item-content>
          </v-list-item>
        </v-col>
        <v-col lg="6" sm="7" md="7" xs="12">
        <!-- <v-col lg6 sm7 md7 xs12> -->
          <v-list-item>
            <v-list-item-content>
              <SearchCourse></SearchCourse>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
      
      <v-row style="background-color: white" no-gutters>
        <!-- <v-parallax src="@/assets/background.jpg"> -->
        <v-col class="pl-6" lg="5" md="5" sm="12" xs="12">
              <v-list-item-title class="text-h4 font-weight-bold">{{ title }}</v-list-item-title>
              <v-list-item-title class="text-h5 font-weight-medium">{{ km }}</v-list-item-title>
        </v-col>
        <v-col lg="5" md="5" sm="12" xs="12">
          <v-list-item class="text-h6 font-weight-medium">
            Difficulty   
            <v-rating
              :value="average"
              color="yellow darken-3"
              background-color="grey darken-1"
              half-increments
              dense
              :hover="true"
              :readonly="true"
              size="30"
              class="pl-5"
            ></v-rating>
            {{average}}
          </v-list-item>
          <v-list-item class="text-h6 font-weight-medium">
            Usefulness
            <v-rating
              :value="UsefulnessAverage"
              color="yellow darken-3"
              background-color="grey darken-1"
              half-increments
              dense
              :hover="true"
              :readonly="true"
              size="30"
            ></v-rating>
            {{UsefulnessAverage}}
          </v-list-item>
          
          <v-list-item>{{ numRating }}</v-list-item>
        </v-col>
      </v-row>


      <v-row style="background-color: white" no-gutters class="pl-6 pb-6">
        <v-col cols="12" lg="5" md="5" sm="12" xs="12">
          <v-btn 
            color="primary"
            elevation="6"
            large
            
            rounded
            @click="addcomment()"
          ><v-icon left>
            mdi-pencil
          </v-icon>
          rate/comment</v-btn>
        </v-col>
      </v-row>




      <v-row class="pl-6 pr-6 py-2">
        <v-col col="12" lg="10" md="10" sm="12" xs="12">
          <p class="text-h5 font-weight-medium">Description</p>
          <p class="text-justify">{{ desc }}</p>
        </v-col>
      </v-row>


      <v-row class="px-5 py-2">


          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-h5 font-weight-medium">
                Resources
                <v-btn class="info ml-2" x-small @click="addfile">upload</v-btn>
              </v-list-item-title>
              <v-list-item-subtitle
                v-for="fileUpload in fileUploads"
                :key="fileUpload.id"
              >
                <a :href="fileUpload.imageUrl" target="_blank"
                  >{{ fileUpload.type }} - {{ fileUpload.filename }}</a
                >
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>


      </v-row>
      <v-row no-gutters style="height: 550px; background-color: white">
        <v-col align="left">
          <v-divider inset></v-divider>
          <v-list three-line>
            <template v-for="(item, index) in showComments">
              <v-subheader
                v-if="item.header"
                :key="index"
                v-text="comment"
              ></v-subheader>

              <v-list-item v-else :key="index">
                <v-list-item-avatar>
                  <!-- <v-img :src="item.avatar"></v-img> -->
                  <v-avatar color="#55798F" size="40">
                    <v-icon dark> mdi-account-circle </v-icon>
                  </v-avatar>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>
                    <!-- <v-row align="right"> -->
                    Difficulty
                    <v-rating
                      :value="item.rate"
                      color="yellow darken-3"
                      background-color="grey darken-1"
                      half-increments
                      dense
                      :hover="true"
                      :readonly="true"
                      size="15"
                    ></v-rating>
                    <!-- </v-row> -->
                  </v-list-item-title>
                  <v-list-item-title>
                    <!-- <v-row align="right"> -->
                    Usefulness
                    <v-rating
                      :value="item.usefulness"
                      color="yellow darken-3"
                      background-color="grey darken-1"
                      half-increments
                      dense
                      :hover="true"
                      :readonly="true"
                      size="15"
                    ></v-rating>
                    <!-- </v-row> -->
                  </v-list-item-title>
                  {{ item.comment }}
                  <v-list-item-subtitle>{{ item.time }}</v-list-item-subtitle>

                  <v-list-item-subtitle v-if="item.pname != ''"
                    >taught by {{ item.pname }}</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>

              <v-divider
                v-if="index !== showComments.length - 1"
                :key="`divider-${index}`"
                inset
              ></v-divider>
            </template>
            <v-row>
              <v-col align="center">
                <div class="text-xs-center text-sm-center">
                  <v-btn @click="addcomment()">add comment</v-btn>
                  <div class="text-center mt-4">
                    <v-pagination
                      v-model="page"
                      :length="pageLength"
                      @input="onPageChange"
                      v-if="showPage"
                    ></v-pagination>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
    <!-- </v-main> -->
  </v-app>
</template>

<script>
import coursedesc from "./coursedesc.json";
import courseimport from "./coursecsv/courseimport.json";
import SearchCourse from "./SeachCourse_top";
export default {
  components: {
    SearchCourse,
  },
  data: () => ({
    // used for the rating botton
    pressedRate: false,
    difficultyRating: -1,
    //科目信息
    title: "",
    pdata: coursedesc,
    desc: "",
    //面包屑导航
    bitems: [
      { text: "Home", disabled: false, href: "/" },
      { text: "", disabled: false, href: "" },
    ],
    //分页
    page: 1,
    pageLength: 0,
    showPage: false,
    //课名数据
    pdata1: courseimport,
    km: "",
  }),
  created() {
    // console.log(this.$vuetify.breakpoint.xs);
    this.title = this.$route.params.name;
    //面包屑
    this.bitems[1].text = this.title;
    this.bitems[1].href = "/#/rate/" + this.title;
    // this.$store.dispatch('loadRatings', this.$props.classname)
    this.$store.dispatch("loadRatings", this.$route.params.name);
    this.$store.dispatch("loadComments", {
      name: this.$route.params.name,
      page: this.page,
    });
    const obj = this.pdata1;
    for (let key in obj) {
      for (var i = 0; i < obj[key].length; i++) {
        // if(obj[key][i][0][0] != undefined) {
        // console.log(obj[key][i]);
        for (var j = 0; j < obj[key][i].length; j++) {
          if (this.title == obj[key][i][j][0]) {
            this.km = obj[key][i][j][1];
            break;
          }
        }
        // if(this.title == obj[key][i][0][0]) {
        //   this.km = obj[key][i][0][1];
        //   break;
        // }
        // }
      }
    }

    if (this.pdata[this.title] != undefined) {
      this.desc = this.pdata[this.title][0];
    }
  },
  mounted() {
    // console.log(111);
  },
  computed: {    
    displayDifficulty () {
      if(this.average<=0){
        return "";
      }else if(this.average<=1 && this.average>0){
        return "easy";
      }else if(this.average<=2){
        return "slightly easy"
      }else if(this.average<=3){
        return "medium"
      }else if(this.average<=4){
        return "slightly hard"
      }else{
        return "hard"
      }
    },
    average() {
      //显示rate
      const ratings = this.$store.getters.loadedRatings;
      var total = 0;
      // for loop in javascript gets the key of the object, not the object
      if (ratings.length > 0) {
        for (let ratingnum in ratings) {
          total = total + ratings[ratingnum]["rate"];
        }
        let key = Object.keys(ratings).length;
        var average = Number(total / key).toFixed(1);
        if (!isNaN(average)) {
          
          if(average==0){
            return ""
          }else{
            return parseFloat(average);
          }
          // return average.toPrecision(2);
        } else {
          return 0;
        }
      }
      // return 0;
    },
    UsefulnessAverage(){

      const ratings = this.$store.getters.loadedRatings;
      var total = 0;
      // for loop in javascript gets the key of the object, not the object
      if (ratings.length > 0) {
        let key = Object.keys(ratings).length;
        for (let ratingnum in ratings) {
          if("usefulness" in ratings[ratingnum] && ratings[ratingnum]["usefulness"]!=undefined){
            total = total + ratings[ratingnum]["usefulness"];
          }else{
            key = key-1;
          }
          
        }
        
        var average = Number(total / key).toFixed(1);

        if (!isNaN(average)) {
          if(average==0){
            return "";
          }else{
            return parseFloat(average);
          }
          // return average.toPrecision(2);
        } else {
          return 0;
        }
      }
      // return 0;
    },
    // based on how many ratings
    numRating() {
      var mytext = "";
      if (this.$store.getters.loadedRatings.length > 0) {
        mytext =
          "(based on " +
          this.$store.getters.loadedRatings.length +
          " students)";
        return mytext;
      } else {
        return mytext;
      }
    },

    fileUploads() {
      //显示上传文件
      const files = this.$store.getters.loadedfileUploads;
      var targetFile = [];

      if (files.length > 0) {
        for (let filenum in this.$store.getters.loadedfileUploads) {
          targetFile.push(files[filenum]);
        }
      }
      this.$store.dispatch("loadfileUploads", this.$route.params.name);
      return targetFile;
    },
    showComments() {

      const files = this.$store.getters.loadedComments;
      var targetFile = [];

      for (let filenum in this.$store.getters.loadedComments) {
        targetFile.push(files[filenum]);
      }

      if (targetFile.length > 0) {
        this.pageLength =
          targetFile.length != 0 ? Math.ceil(targetFile[0]["total"] / 4) : 1;
        this.showPage = true;
      } else {
        this.showPage = false;
      }


  
//               $.getJSON('https://api.db-ip.com/v2/free/self', function(data) {
//   console.log(JSON.stringify(data, null, 2));
// });
        // fetch('https://api.ipify.org?format=json')
        // .then(x => x.json())
        // .then(({ ip }) => {
        //     myIP = ip;
        // });
        // console.log("myIP",myIP)
      return targetFile;
    },
  },
  methods: {
    pressRate() {
      //按rate触发这个
      this.pressedRate = true;
    },
    addrating() {
      //按了confirm之后触发这个

      var time = new Date();
      const now =
        time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate();
      var currating;
      const user = this.$store.getters.user
        ? this.$store.getters.user
        : "unknown";
      if (user != "unknown") {
        currating = {
          classname: this.$route.params.name,
          user: user,
          // "comment": this.formData.comment,
          time: now,
          time_log: time,
          rate: this.difficultyRating,
          // "pname": this.formData.pname
        };
      } else {
        currating = {
          classname: this.$route.params.name,
          time_log: time,
          time: now,
          rate: this.difficultyRating,
          // "pname": this.formData.pname
        };
      }

      if (this.difficultyRating != -1) {
        this.$store.dispatch("addRating", currating);
      }

      // return to normal
      this.pressedRate = false;
      this.difficultyRating = -1;
    },
    addcomment() {
      this.$router.push("/addrating/" + this.title);
    },
    addfile() {
      this.$router.push("/addfile/" + this.title);
    },
    // addcomment() {
    //   this.$router.push('/addcomment/'+ this.title)
    // },
    redirect(imageUrl) {
      window.open(imageUrl, "_blank");
    },
    onPageChange(page) {
      this.page = page;
      this.$store.dispatch("loadComments", {
        name: this.$route.params.name,
        page: this.page,
      });
    },

    // display difficulty level string
    difficultyLevel(rating) {
      if (rating == -1) {
        return "";
      } else if (rating <= 1) {
        return "easy";
      } else if (rating <= 2) {
        return "slightly easy";
      } else if (rating <= 3) {
        return "medium";
      } else if (rating <= 4) {
        return "slightly hard";
      } else {
        return "hard";
      }
    },
  },
};
</script>

<style scoped>
/* .container {
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
} */
</style>