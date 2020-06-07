<template>
    <div>
        <h1>Todos</h1>
        <input v-model="todoName" @keyup.enter="addTodo">
        <ul>
            <li v-for="todo of todos" :key="todo.id">
                {{todo.name}}
                <i class="fa fa-minus-circle" v-on:click="remove(todo.id)"></i>
            </li>
        </ul>
        <button v-on:click="clearall">clear</button>
    </div>
    
</template>


<script>
import axios from "axios";

// const baseURL="http://localhost:3000/todos";
const baseURL="https://connectheroserver.herokuapp.com/todos";


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
            const res = await axios.get(baseURL);
            this.todos=res.data;
        }catch(e){
            consol.error(e);
        }
    },
    methods: {
        async addTodo() {
            // post to db
            const res = await axios.post(baseURL, { name: this.todoName })

            console.log(res)
            // console.log("todo",todoName)

            // add to todos
            this.todos = [...this.todos, res.data]

            // clear todoName input binding
            this.todoName = ''
        },
        async clearall(){
            var id=1
            const res = await axios.delete("https://connectheroserver.herokuapp.com/todos/"+id)
        },
        async remove(id){
            const res = await axios.delete("https://connectheroserver.herokuapp.com/todos/"+id)

            const res1 = await axios.get(baseURL);
            this.todos=res1.data;


        }
  }
}
</script>

<style scoped>

</style>