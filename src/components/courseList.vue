<template>
    <div>
        <h1>Welcome!</h1>
        <input placeholder="Search for a course" v-model="entered" @keyup.enter="searchCourse">
       
        <ul v-if= "displaySearch===false">
                <li v-for="course of courses" :key="course.id">
                    <router-link v-bind:to="{
                        name: 'class-details',
                        params:{name: course.name, id: course.id}
                    }">
                    {{course.name}}
                    </router-link>
                </li>
        </ul>
        <ul v-if= "displaySearch">
            <li v-for="course of searchedCourses" :key="course.id">
                <router-link v-bind:to="'/course/'+course.name">{{course.name}}</router-link>
            </li>
            
        </ul>
    </div>
    
</template>


<script>
import axios from "axios";


const baseURL="https://connectheroserver.herokuapp.com/courses";


export default {
    name:"courseList",
    data(){
        return {
            courses:[],
            entered: '',
            searchedCourses: [],
            displaySearch: false
        }
    },
    // async created(){
    created(){
        try{
            // const res = await axios.get(baseURL);
            // const res = axios.get(baseURL);
            // this.courses=res.data;
            this.courses=[
              {
                "name": "ECE110",
                "id": 1
              },
              {
                "name": "ECE243",
                "id": 2
              },
              {
                "name": "ECE297",
                "id": 3,
              }
            ]
        }catch(e){
            console.error(e);
        }
    },
    methods: {
        searchCourse: function() {
            this.searchedCourses=[]
            for (var i=0; i<this.courses.length; i++){
                if (this.courses[i]["name"].toUpperCase().includes(this.entered.toUpperCase())){
                    this.searchedCourses.push(this.courses[i]);
                }
                
            }


            // clear commentName input binding
            this.entered = '';
            //make the list display searched courses
            this.displaySearch=true;
        }
  }
}
</script>

<style scoped>
</style>