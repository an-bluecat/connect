<template>
    <div>
        
        <input placeholder="Search for a course" v-model="entered" @keyup.enter="searchCourse">
       
        <ul>
            <li v-for="course of courses" :key="course.id">
                {{course.name}}
            </li>
            
        </ul>
        <ul>
            <li v-for="course of searchedCourses" :key="course.id">
                {{course.name}}
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
            searchedCourses: []
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
                console.log(i)
                if (this.courses[i]["name"].includes(this.entered)){
                    console.log("yes!!!")
                    this.searchedCourses.push(this.courses[i])
                }
                
            }


            // clear todoName input binding
            this.entered = ''
        }
  }
}
</script>

<style scoped>
 h1{
     text-align:center
 }
</style>