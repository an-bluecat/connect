<template>
  <div id="app">
    <HelloWorld msg="Hello World!"></HelloWorld>
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
