<template>
    <v-container id="container" fluid ma-0 pa-0 fill-height>
        <!-- <v-parallax src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"> -->
        <v-parallax src="@/assets/background.jpg" height=500>
            <h1><center>
                Welcome to U of T Connect
            </center></h1>
            <v-card>
                <v-card-text>
                    <v-autocomplete
                        v-model="model"
                        :items="items"
                        color="white"
                        hide-selected
                        item-text="Description"
                        item-value="Course"
                        label="Search your Courses"
                        placeholder="Start typing to Search"
                        prepend-icon="mdi-database-search"
                        
                        @change="onchangeclass()"
                    ></v-autocomplete>
                </v-card-text>
            </v-card>
        </v-parallax>
        <h1 id="title"><center>Our Current Top Rated Courses</center></h1>
        <courseList/>
    </v-container>
</template>

<script>
import courseList from './course/courseList'
import TopPanel from './TopPanel'
import courseimport from './course/courseimport.json'

export default {
    components: {
        courseList
    },
    data: () => ({
      model: null,
      courses: courseimport
    }),

    computed: {
      items () {
        var result = []
        for(let num in this.courses){
          result.push(this.courses[num]['name'])
        }
        console.log("result", result)
        return result
        // return this.entries.map(entry => {
        //   const Description = entry.Description.length > this.descriptionLimit
        //     ? entry.Description.slice(0, this.descriptionLimit) + '...'
        //     : entry.Description

        //   return Object.assign({}, entry, { Description })
        // })
      },
    },
    methods: {
      onchangeclass(){
        if(this.model == null){
          return
        }
        this.$router.push('./course/'+ this.model)
      }
    }
  }
</script>

<style scoped>
.container{
    width: 100vw;
    /* height: 1000px; */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
#title{
    padding-top: 60px;
    padding-bottom: 30px;
}
.v-parallax {
    width: 100%;
}
.v-card {
    width: 60%;
    position: relative;
    bottom: -120px;
    align-self: center;
}
.v-autocomplete{

}
.sep{
    height: 40px;
}
</style>