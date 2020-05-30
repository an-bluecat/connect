<template>
  <div class="hello">
    <!-- <img src="../assets/julian.jpeg" align="middle" height="360" width="270"> -->
    <!-- {{name}}
    {{btnState ? "btn disabled":"btn active"}}
    <button v-on:click="changename" v-bind:disabled="btnState">change name</button> -->
    <div class="holder">
      <ul>
        <li v-for="(value, index) in skills" :key='index'>{{index}}. {{value.skill}}</li>
      </ul>


      <div v-bind:class="{alert: showAlert==true}"></div>




    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data(){
    return{
      // name:"Coursetro",
      // btnState: true,
      skills: [
        { "skill": "Vue.js"},
        { "skill": "frontend"}
      ],

      showAlert: true

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

  .alert{
      background-color: blue;
      height:50px;


  }
</style>
