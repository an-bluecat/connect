<template>
    <div>
        <h1>{{this.$route.params.name}}</h1>
        <input placeholder="your comments here" v-model="todoName" @keyup.enter="addTodo" v-validate="'min:5'" name="courseName">
        <p class="alert" v-if="errors.has('courseName')">{{errors.first('courseName')}}</p>




        <ul>
            <li v-for="todo of todos" :key="todo.id">
                {{todo.name}}
                <i class="fa fa-minus-circle" v-on:click="remove(todo.id)"></i>
            </li>
        </ul>
    </div>
    
</template>


<script>
import axios from "axios";

// const baseURL="http://localhost:3000/todos";
const baseURL="https://connectheroserver.herokuapp.com/";
console.log("here is the name")



export default {
    name:"Todos",
    data(){
        return {
            todos: [],
            todoName: ''
        }
    },
    async created(){
        try{
            var x=(this.$route.params.name);
            const res = await axios.get(baseURL+x);
            this.todos=res.data;

        }catch(e){
            consol.error(e);
        }
    },
    methods: {
        async addTodo() {
            // post to db
            const res = await axios.post(baseURL+(this.$route.params.name), { name: this.todoName })

            console.log(res)
            // console.log("todo",todoName)

            // add to todos
            this.todos = [...this.todos, res.data]

            // clear todoName input binding
            this.todoName = ''
        },
        async remove(id){
            var x=(this.$route.params.name);
            var y=baseURL+x
            var z=y+"/"
            const res = await axios.delete(z+id);
            const res1 = await axios.get(z);
            this.todos=res1.data;


        }
  }
}
</script>

<style scoped>
 h1{
     text-align:center
 }
</style>