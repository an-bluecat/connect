<template>
  <v-app>
    <v-main>
          <v-parallax src="@/assets/building.jpeg">
            <h1><center>U of T's Course Rating Website</center></h1>
            <v-card width="80%">
              <v-card-text>
                <SearchCourse :courses="courseIndexSearchList"></SearchCourse>
              </v-card-text>
            </v-card>
          </v-parallax>
        <h4 id="title" class="mb-5"><center>Search By Program</center></h4>
        <v-row>
          <v-container>

          <v-expansion-panels
          v-model="defaultExpansionSetting"
          multiple
          hover>

            <v-expansion-panel
            v-for="(faculty, index) in items"
          :key="index"
              >
              <v-expansion-panel-header>
                <h5>Faculty of {{faculty.name}}</h5>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
            <v-col
              v-for="(program, index) in faculty.programs"
              :key="index"
              cols="12"
              md="3"
            >
              <v-card
                class="mx-auto"
                width="100%"
                height="100%"
                @click="navToProject(program.name, faculty.name)"
              >
                <v-img height="250" :src='"../assets/"+program.src+""'></v-img>
                <v-card-title>{{ program.name }}</v-card-title>
                <v-card-subtitle>
                    {{ program.title }}
                </v-card-subtitle>
                <v-divider class="mx-4"></v-divider>
              </v-card>

          </v-col>
        </v-row>

        </v-expansion-panel-content>

        </v-expansion-panel>

            </v-expansion-panels>
                  </v-container>

          
        </v-row>
        <!-- <DataTable :courses="courseIndexSearchList"></DataTable> -->
        
    </v-main>
  </v-app>
</template>

<script>

import TopPanel from "./TopPanel";
import SearchCourse from "./course/SeachCourse";
import courseIndexSearchList from './course/coursejson/courseIndexSearchList_artsci_eng'
import programList from './course/coursejson/program_all'

// import courseIndexSearchList_rotman from './course/courseIndexSearchList_rotman';
import DataTable from "./course/datatable";

export default {
  components: {

    SearchCourse,
    DataTable,
  },
  data: () => ({
    // courseIndexSearchList_rotman: courseIndexSearchList_rotman,
    courseIndexSearchList: courseIndexSearchList,

    // to add ArtSci section--> 
    //courseIndexSearchList_artsci: courseIndexSearchList_artsci,
    
    selection: 1,
    alignments: ["start", "center", "end"],
    items: programList,
    defaultExpansionSetting: [0,1]
  }),
  mounted(){
    let breakpointName = this.$vuetify.breakpoint.name;
    if(breakpointName=="xs"||breakpointName=="sm"){
      this.defaultExpansionSetting=[]
    }
  },
  methods: {
    navToProject(code, facultyName) {
      // let routeData = this.$router.resolve('./project/'+ name);
      // window.open(routeData.href, '_blank');
      if(facultyName=="Engineering"){
        this.$router.push("./engineering/" + code+"/100");
      }else{
        this.$router.push("./artsci/" + code+"/100");
      }


      
    },
  }
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
  align-self: center;
}
.sep {
  height: 40px;
}
.v-list {
  width: 70%;
}

</style>