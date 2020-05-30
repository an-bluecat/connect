<template>
  <div id="app">
    <HelloWorld></HelloWorld>
  </div>
</template>

<script>
import Todos from './components/Todos';
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',
  components: {
    Todos,
    HelloWorld
  },
  data(){
      count=1
    }
    
}
</script>

<style>

body{
  font-family:'Courier New', Courier, monospace;
  line-height: 1.4;
  background-color: #eeeeee;
}
</style>
