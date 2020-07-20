<template>
  <div id="app">
    <TopPanel/>
    <router-view />
  </div>
</template>

<script>
import TopPanel from './components/TopPanel'

export default {
  name: 'App',
  components: {
    TopPanel
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
  /* padding-top: 50px; */
}
body, html {
  margin: 0;
  height: 100%;
}
#app {
    width: 100%;
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
