// this is for engineering only. Tthe grade information is retrieved from skule.ca

<template>
  <v-app id="inspire">
    
    <v-navigation-drawer v-model="drawer" app>
      <v-sheet color="grey lighten-4" class="pa-4">
        <v-breadcrumbs :items="items" large></v-breadcrumbs>
      </v-sheet>
      <v-divider></v-divider>
      <v-list>
        <v-list-item
          v-for="[icon, text] in links"
          :key="text"
          link
          @click="onclickoptions(text)"
        >
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      
    </v-navigation-drawer>

    <v-app-bar app class="pl-6">
      
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
 
      <v-toolbar-title v-if="this.$vuetify.breakpoint.name!='xs' ">{{name}}</v-toolbar-title>
      <v-toolbar-title :class="searchbarStyle" ><SearchCourse></SearchCourse></v-toolbar-title>
      <!-- <v-col col="12" xl="10" lg="10" md="10" sm="10" xs="10">
        <v-autocomplete
            v-model="model"
            :items="lists"
            color="white"
            hide-selected
            item-text="Description"
            item-value="Course"
            label="Search your courses"
            placeholder="Start typing to Search"
            prepend-icon="mdi-database-search"
            append-icon=""
            class="mt-5 ml-2"
            @change="onchangeclass()"
        ></v-autocomplete>
      </v-col> -->

    </v-app-bar>

    <v-main>
      <v-container class="py-8 px-6" fluid>
        <v-row>
          <v-col cols="12">
            <v-card>
              <!-- <v-subheader>area</v-subheader> -->

              <v-list>
                <template two-line v-for="(item, index) in plist">
                  <v-list-item :key="index" link>
                    <!-- <v-list-item-avatar color="grey darken-1">
                    </v-list-item-avatar> -->

                    <v-list-item-content @click="navToRate(item)" >
                      <a >
                      <v-list-item-title :id="item[0]" :class="{underline: true, searchStyle: item[0] == result}">
                        {{ nameToCourseCode(item.name) }}
                      </v-list-item-title>
                      <v-list-item-subtitle>{{ nameToCourseDesc(item.name)}}</v-list-item-subtitle>
                      </a>
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider
                    v-if="index !== (plist.length-1)"
                    :key="`divider-${index}`"
                    
                  ></v-divider>
                </template>
              </v-list>
            <!-- <v-card>
              <v-card-title>
                Nutrition
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>
              <v-data-table
                :headers="headers"
                :items="desserts"
                :search="search"
              ></v-data-table> -->
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import courseimport from './coursejson/artsci_course.json';
import SearchCourse from "./SeachCourse_top";
  export default {
    components: {
    SearchCourse,
    },
    data: () => ({
      cards: ['area1', 'area2'],
      drawer: true,
      links: [ 
        // ['mdi-inbox-arrow-down', 'First year courses'],
        // ['mdi-send', 'Second year courses'],
        // ['mdi-alert-octagon', 'Third year courses'],
        // ['mdi-domain', 'Fourth year courses'],
        ['mdi-send', 'Level 100 courses'],
        ['mdi-send', 'Level 200 courses'],
        ['mdi-send', 'Level 300 courses'],
        ['mdi-send', 'Level 400 courses'],
      ],
      //路由数据
      name: '',
      //分科数据
      pdata: courseimport,
      plist: [],//中间数据
      list1: [],
      list2: [],
      list3: [],
      list4: [],
      //面包屑导航
      items: [
        {text: 'Home', disabled: false, href: '/'},
        {text: '', disabled: false, href: ''}
      ],
      // veutify: data table
      // search: '',
      // headers: [
      //   {
      //     text: 'Course Code',
      //     align: 'start',
      //     // sortable: false,
      //     value: 'name',
      //   },
      //   { text: 'Course Name', value: 'calories' },
      //   { text: 'Difficulty(0-5)', value: 'fat' },
      //   { text: 'rate difficulty', value: 'carbs' },
      // ],
      // tableData: [],
      //search
      model: null,
      result: ''
    }),
    created() {
      this.name = this.$route.params.name;
      //面包屑
      this.items[1].text = this.name;this.items[1].href = '/artsci/'+this.name;
      //把数据填充到右侧区域
      const pdata = this.pdata[this.name];
      this.list1 = [];this.list2 = [];this.list3 = [];this.list4 = [];
      if(pdata.length > 0) {
        pdata.map(
          course => {
            if(course.name[3]=="1"){
              this.list1.push(course)
            }else if(course.name[3]=="2"){
              this.list2.push(course)
            }else if(course.name[3]=="3"){
              this.list3.push(course)
            }else{
              this.list4.push(course)
            }
          }
        )
      }
      this.plist = this.list1;
    },
    watch: {

    },
    computed: {
      lists () {
          var result = []
          for(let num in this.plist){
              result.push(this.plist[num][0])
          }
          return result
      }, 
      searchbarStyle() {
      switch (this.$vuetify.breakpoint.name) {
          case 'xs': return "ml-n3 mt-15 mr-16 pr-10"
          case 'sm': return "ml-6 mt-15 mr-16 "
          case 'md': return "ml-6 mt-15 mr-16 "
          case 'lg': return "ml-6 mt-15 mr-16 "
          case 'xl': return "ml-6 mt-15 mr-16 "
        }
      }
    },
    methods: {
      onclickoptions(option) {
        this.plist = [];
        switch(option) {
          case "Level 100 courses":
            this.plist = this.list1;
            break;
          case "Level 200 courses":
            this.plist = this.list2;
            break;
          case "Level 300 courses":
            this.plist = this.list3;
            break;  
          case "Level 400 courses":
            this.plist = this.list4;
            break;                             
        }
      },
      navToRate(item) {
        // for mobile: no new window
        if(this.$vuetify.breakpoint.name=="xs" || this.$vuetify.breakpoint.name=="sm"){
          this.$router.push('/course/'+ item[0]);
        }
        // for laptop: open a new window for the course clicked
        else{
          let routeData = this.$router.resolve('/course/'+ item[0]);
          window.open(routeData.href, '_blank');
        }
        
        // 
      },
      nameToCourseCode(courseName){
        return courseName.substring(0,6)
      },
      nameToCourseDesc(courseName){
        return courseName.split("- ")[1]
      },
      onchangeclass(){
        this.result = '';
          if(this.model == null){
              return
          }
          //跳转锚点
        const returnEle = document.querySelector('#'+this.model);  //productId是将要跳转区域的id
        if (!!returnEle) {
          returnEle.scrollIntoView(true); // true 是默认的
          this.result = this.model;
        }
        
        // document.querySelector("#APS100").scrollIntoView(true); 
          // var plist1 = [];
          // for(let num in this.plist){
          //     if(this.plist[num][0] == this.model) {
          //       plist1.push([this.plist[num][0],this.plist[num][1]]);
          //       break;
          //     }
          // }
          // this.plist = plist1;
      }      
    }
  }
</script>
<style scoped>
 .link {
   cursor: pointer;
 }
 .container {
  /* background-color: aqua; */
  height: 100vh;
  width: 100vw;
}
.underline {
    text-decoration: underline;
    /* color: red; */
}
.searchStyle {
  background-color: yellow;
  width: 4rem;
}
</style>
