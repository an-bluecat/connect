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
    <h3 id="title"><center>Our Current Top Rated Courses</center></h3>
    <v-list shaped elevation="10">
      <v-subheader>Choose your course below!</v-subheader>
      <v-list-item-group v-model="item" color="primary">
        <v-list-item
          v-for="course of courses"
          :key="course.id"
        >
          <v-list-item-content>
            <router-link v-bind:to="{
              name: 'class-details',
              params:{name: course.name, id: course.id}
            }">
              {{course.name}}
            </router-link>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-container>
</template>

<script>
import courseList from './course/courseList'
import TopPanel from './TopPanel'
import courseimport from './course/courseimport.json'
import SearchCourse from './course/SeachCourse'

export default {
    components: {
        courseList,
        SearchCourse
    },
    data: () => ({
      courses: courseimport
    }),
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