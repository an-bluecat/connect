<template>
  <div id="app">
    <Todos v-bind:todos="todos"/>
  </div>
</template>

<script>
import Todos from './components/Todos';

export default {
  name: 'App',
  components: {
    Todos
  },
  data(){
    return{
      todos:[
        {
          id:1,
          title:"todo1",
          completed: false
        },
        {
          id:1,
          title:"Todo2",
          completed: false
        }

      ]
    }
  }
}
</script>

<style>
*{
  box-sizing:border-box;
  margin: 0;
  padding: 0;

}

body{
  font-family:'Courier New', Courier, monospace;
  line-height: 1.4;
}
</style>
