<template>
  <v-container id="container" fluid ma-0 pa-0 fill-height>
    <v-parallax src="@/assets/background.jpg" height=500>
        <h1><center>
            Welcome to U of T Connect
        </center></h1>
        <v-card>
          <v-card-text>
            <SearchCourse></SearchCourse>
          </v-card-text>
        </v-card>
    </v-parallax>
    <v-container class="mt-n16">
      <v-row class="mt-n8">
        <v-col v-for="(item,index) in items" :key="index" cols="12" md="3"> 
          <v-card class="mx-auto" width="100%" @click="navToProject(item.name)">
            <v-img height="250" :src="item.src"></v-img>
            <v-card-title>{{item.name}}</v-card-title>
            <v-card-text>
              <v-row align="center" class="mx-0">
                <!-- <v-rating :value="item.rate" color="amber" dense half-increments readonly size="14"></v-rating> -->
                <!-- <div class="grey--text ml-4">{{item.rate}} ({{item.nums}})</div> -->
              </v-row>
              <div class="my-4 subtitle-1">
                {{item.title}}
              </div>
              <div>{{item.desc}}</div>
            </v-card-text>
            <v-divider class="mx-4"></v-divider>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import courseList from './course/courseList'
import TopPanel from './TopPanel'
import SearchCourse from './course/SeachCourse'

export default {
    components: {
        courseList,
        SearchCourse
    },
    data: () => ({
      selection: 1,
      alignments: [
        'start',
        'center',
        'end',
      ],
      items: [
        {name: 'Chem',src:require('../assets/chem.jpg'),rate:4.5,nums:'107',title:'Chemical Engineering',desc:'Chemical Engineering'},
        {name: 'Civ',src:'https://cdn.vuetifyjs.com/images/cards/cooking.png',rate:1,nums:'10',title:'Civil Engineering',desc:'Civil Engineering'},
        {name: 'ECE',src:'https://cdn.vuetifyjs.com/images/cards/cooking.png',rate:3,nums:'302',title:'Electrical and Computer Engineering',desc:'Electrical and Computer Engineering'},
        {name: 'EngSci',src:'https://cdn.vuetifyjs.com/images/cards/cooking.png',rate:5,nums:'2',title:'Engineering Science',desc:'Engineering Science'},
        {name: 'Indy',src:'https://cdn.vuetifyjs.com/images/cards/cooking.png',rate:4,nums:'432',title:'Industrial Engineering',desc:'Industrial Engineering has been traditionall'},
        {name: 'MSE',src:'https://cdn.vuetifyjs.com/images/cards/cooking.png',rate:2,nums:'20',title:'Material Science and Engineering',desc:'Material Science and Engineering'},
        {name: 'Mech',src:'https://cdn.vuetifyjs.com/images/cards/cooking.png',rate:2.5,nums:'236',title:'Mechanical Engineering',desc:'Mechanical Engineering'},
        {name: 'Min',src:'https://cdn.vuetifyjs.com/images/cards/cooking.png',rate:4.5,nums:'100',title:'Mineral Engineering',desc:'Mineral Engineering'},
      ]
    }),
    methods: {
      navToProject(name) {
        // let routeData = this.$router.resolve('./project/'+ name);
        // window.open(routeData.href, '_blank');
        this.$router.push('./project/'+ name);
      }
    }
  }
</script>

<style scoped>
.container{
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
#title{
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
.sep{
    height: 40px;
}
.v-list{
  width: 70%;
}
</style>