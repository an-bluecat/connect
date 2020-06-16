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
 @import "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"; 
  .holder {
    background: #fff;
  }
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
  
  ul li {
    padding: 20px;
    font-size: 1.3em;
    background-color: #E0EDF4;
    border-left: 5px solid #3EB3F6;
    margin-bottom: 2px;
    color: #3E5252;
  }
  p {
    text-align:center;
    padding: 30px 0;
    color: gray;
  }
  .container {
    box-shadow: 0px 0px 40px lightgray;
  }
  input {
    width: calc(100% - 40px);
    border: 0;
    padding: 20px;
    font-size: 1.3em;
    background-color: #323333;
    color: #687F7F;
  }
  .alert {
    background: #fdf2ce;
    font-weight: bold;
    display: inline-block;
    padding: 5px;
    margin-top: -20px;
  }
  .alert-in-enter-active {
    animation: bounce-in .5s;
  }
  .alert-in-leave-active {
    animation: bounce-in .5s reverse;
  }
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
i {
  float:right;
  cursor:pointer;
}
</style>