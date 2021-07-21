<template>
  <v-app>
    <v-main>
      <!-- <v-container fluid ma-0 pa-0 fill-height> -->
      <!-- <v-container fluid> -->
        <!-- <v-row> -->
          <v-parallax src="@/assets/building.jpeg">
          <!-- <v-parallax src="@/assets/background.jpg"> -->
            <h1><center>Welcome to U of T Hub</center></h1>
            <v-card width="80%">
              <v-card-text>
                <SearchCourse :courses="courseIndexSearchList"></SearchCourse>
              </v-card-text>
            </v-card>
          </v-parallax>
        <!-- </v-row> -->
        <h4 id="title"><center>Search By Program</center></h4>
        <!-- <v-row>
          <v-col
            v-for="(item, index) in items"
            :key="index"
            cols="12"
            md="3"
            xs="3"
            sm="3"
            lg="3"
            xl="3"
          >
            <v-card
              class="mx-auto"
              width="100%"
              @click="navToProject(item.name)"
            >
              <v-img height="250" :src="item.src"></v-img>
              <v-card-title>{{ item.name }}</v-card-title>
              <v-card-text>
                <div class="my-4 subtitle-1">
                  {{ item.title }}
                </div>
                <div>{{ item.desc }}</div>
              </v-card-text>
              <v-divider class="mx-4"></v-divider>
            </v-card>
          </v-col>
        </v-row> -->
      <!-- </v-container> -->
    </v-main>
  </v-app>
</template>

<script>
import courseList from "./course/courseList";
import TopPanel from "./TopPanel";
import SearchCourse from "./course/SeachCourse";
import courseIndexSearchList from './course/courseIndexSearchList_rotman'


export default {
  components: {
    courseList,
    SearchCourse,
  },
  data: () => ({
    courseIndexSearchList: courseIndexSearchList,
    selection: 1,
    alignments: ["start", "center", "end"],
    items: [
      // {name: 'Chem',src:require('../assets/chem.jpg'),rate:4.5,nums:'107',title:'Chemical Engineering',desc:'Chemical Engineering'},
      // {name: 'Civ',src:'../assets/civ.jpg',rate:1,nums:'10',title:'Civil Engineering',desc:'Civil Engineering'},
      // {name: 'ECE',src:'../assets/ece.jpg',rate:3,nums:'302',title:'Electrical and Computer Engineering',desc:'Electrical and Computer Engineering'},
      // {name: 'EngSci',src:'../assets/engsci.jpg',rate:5,nums:'2',title:'Engineering Science',desc:'Engineering Science'},
      // {name: 'Indy',src:'../assets/indy.jpg',rate:4,nums:'432',title:'Industrial Engineering',desc:'Industrial Engineering has been traditionall'},
      // {name: 'MSE',src:'../assets/indy.jpg',rate:2,nums:'20',title:'Material Science and Engineering',desc:'Material Science and Engineering'},
      // {name: 'Mech',src:'../assets/mech.jpg',rate:2.5,nums:'236',title:'Mechanical Engineering',desc:'Mechanical Engineering'},
      // {name: 'Min',src:'../assets/min.jpg',rate:4.5,nums:'100',title:'Mineral Engineering',desc:'Mineral Engineering'},
      {
        name: "Chem",
        src: require("../assets/chem.jpg"),
        rate: 4.5,
        nums: "107",
        title: "Chemical Engineering",
      },
      {
        name: "Civ",
        src: require("../assets/civ.jpg"),
        rate: 1,
        nums: "10",
        title: "Civil Engineering",
      },
      {
        name: "ECE",
        src: require("../assets/ece.jpeg"),
        rate: 3,
        nums: "302",
        title: "Electrical & Computer Engineering",
      },
      {
        name: "EngSci",
        src: require("../assets/engsci.jpg"),
        rate: 5,
        nums: "2",
        title: "Engineering Science",
      },
      {
        name: "Indy",
        src: require("../assets/indy.jpg"),
        rate: 4,
        nums: "432",
        title: "Industrial Engineering",
      },
      {
        name: "MSE",
        src: require("../assets/mse.jpg"),
        rate: 2,
        nums: "20",
        title: "Material Science and Engineering",
      },
      {
        name: "Mech",
        src: require("../assets/mech.jpg"),
        rate: 2.5,
        nums: "236",
        title: "Mechanical Engineering",
      },
      {
        name: "Min",
        src: require("../assets/min.jpg"),
        rate: 4.5,
        nums: "100",
        title: "Mineral Engineering",
      },
    ],
  }),
  methods: {
    navToProject(name) {
      // let routeData = this.$router.resolve('./project/'+ name);
      // window.open(routeData.href, '_blank');
      this.$router.push("./project/" + name);
    },
  },
};
</script>

<style scoped>
.container {
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
#title {
  padding-top: 60px;
}
.v-parallax {
  width: 100%;
}
.v-card {
  width: 60%;
  position: relative;
  bottom: -120px;
  align-self: center;
}
.sep {
  height: 40px;
}
.v-list {
  width: 70%;
}

</style>