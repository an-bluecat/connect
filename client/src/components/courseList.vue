<template>
    <div>
        
        <input placeholder="Search for a course" v-model="entered" @keyup.enter="searchCourse">
       
        <ul v-if= "displaySearch===false">
                <li v-for="course of courses" :key="course.id">
                    <router-link v-bind:to="'/'+course.name">{{course.name}}</router-link>
                </li>
        </ul>
        <ul v-if= "displaySearch">
            <li v-for="course of searchedCourses" :key="course.id">
                <router-link v-bind:to="'/'+course.name">{{course.name}}</router-link>
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
    async created(){
        try{
            const res = await axios.get(baseURL);
            this.courses=res.data;
        }catch(e){
            console.error(e);
        }
    },
    methods: {
        searchCourse: function() {
            this.searchedCourses=[]
            for (var i=0; i<this.courses.length; i++){
                console.log(i);
                if (this.courses[i]["name"].toUpperCase().includes(this.entered.toUpperCase())){
                    console.log("yes!!!");
                    this.searchedCourses.push(this.courses[i]);
                }
                
            }


            // clear todoName input binding
            this.entered = '';
            //make the list display searched courses
            this.displaySearch=true;
        }
  }
}
</script>

<style scoped>
 h1{
     text-align:center
 }
</style>