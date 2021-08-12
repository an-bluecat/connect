<template>
    <div id="app">
    <v-app id="inspire">
        <v-card>
        <v-card-title>
            Nutrition
            <v-spacer></v-spacer>
            <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            ></v-text-field>
        </v-card-title>
        <v-data-table
            :headers="headers"
            :items="courseData"
            :search="search"
        ></v-data-table>
        </v-card>
    </v-app>
</div>
</template>

<script>


// import courseimport from './courseIndexSearchList'
import * as firebase from 'firebase'


export default {
    props: ['courses'],
    data: () => ({
        search: '',
        headers: [
        {
          text: 'Course Name',
          align: 'start',
          sortable: false,
          value: 'courseName',
        },
        { text: 'Ratings', value: 'numRatings' },
        { text: 'Difficulty', value: 'difficulty' },
        { text: 'Usefulness', value: 'usefulness' },
        
      ],
    //   courseData:[],

    }),
    created(){
        var n=0;
        // var courseList = []
        this.$store.commit('clearTableData');

        for(let num in this.courses){
            // get course CODEs from 'courses'
            var name=this.courses[num]['name'];
            // get usefulness, difficulty, rating
            var usefulness='-'
            var diff='-'
            var num_rating=0

            this.$store.dispatch('loadcourseRating', name)
            // if(n==3){
            //     break;
            // }
            // n+=1;




        }

            

    },
    methods: {
        
    },
    computed: {
        courseData () {
            // console.log("this.$store.getters.loadedTableData", this.$store.getters.loadedTableData)
            return this.$store.getters.loadedTableData;
        },
    },
}
</script>

<style scoped>

</style>