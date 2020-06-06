<template>
  <div id="app">
    <HelloWorld></HelloWorld>
    <Todos></Todos>
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
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,700');
body {
  background-color: #EEEEEE;
  font-family: 'Montserrat', sans-serif;
  display: grid;
  grid-template-rows: auto;
  justify-items: center;
  padding-top: 50px;
}
body, html {
  margin: 0;
  height: 100%;
}
#app {
    width: 50%;
}
nav {
  padding: 20px 20px 20px 0;
}
nav a {
  padding: 10px;
  text-decoration: none;
  background: #fff;
  border-radius: 3px;
  color: rgb(0, 110, 255);
  font-weight: bold;
  margin-right: 15px;
}
</style>
