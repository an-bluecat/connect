<template>
    <v-container>
        <h1>All Courses</h1>
        <v-card
            class="course-card"
        >
            <v-container>
            <v-item-group
                v-model="selected"
            >
                <v-row>
                <v-col
                    v-for="(item, i) in items"
                    :key="i"
                    cols="12"
                    md="4"
                >
                    <v-item v-slot:default="{ active, toggle }">
                    <v-img
                        :src="`https://cdn.vuetifyjs.com/images/${item.src}`"
                        height="150"
                        class="text-right pa-2"
                        @click="toggle"
                    >
                        <div
                            v-if="!active"
                            class="display-3 flex-grow-1 text-center"
                            style="color: white;"
                        >
                            {{item.name}}
                        
                        </div>
                        <div
                            v-if="active"
                            class="display-3 flex-grow-1 text-center"
                            style="background-color: rgba(0,0,0,0.5); width: 100%; height: 100%; color: white;"
                        >
                        {{item.name}}
                        </div>
                    </v-img>
                    </v-item>
                </v-col>
                </v-row>
            </v-item-group>
            </v-container>
        </v-card>
        <v-list shaped elevation="10">
            <v-list-item-group v-model="item" color="primary">
                <v-list-item
                    v-for="course of courses"
                    :key="course.id"
                >
                <v-list-item-content>
                    <router-link v-bind:to="{
                        name: 'class-details',
                        params:{name: course.name, id: course.id}}"
                    >
                    {{course.name}}
                    </router-link>
                </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-container>
</template>


<script>
import axios from "axios";
import courseimport from './courseIndexSearchList'
// const baseURL="https://connectheroserver.herokuapp.com/courses";


export default {
    name:"courseList",
    data(){
        return {
            courses: courseimport,
            entered: '',
            searchedCourses: [],
            displaySearch: false,
            items: [
                {
                    src: 'backgrounds/bg.jpg',
                    name: 'Chem'
                },
                {
                    src: 'backgrounds/md.jpg',
                    name: 'Civ'
                },
                {
                    src: 'backgrounds/bg-2.jpg',
                    name: 'ECE'
                },
                {
                    src: 'backgrounds/md2.jpg',
                    name: 'EngSci'
                },
                {
                    src: 'backgrounds/md2.jpg',
                    name: 'Indy'
                },
                {
                    src: 'backgrounds/md2.jpg',
                    name: 'MSE'
                },
                {
                    src: 'backgrounds/md2.jpg',
                    name: 'Mech'
                },
                {
                    src: 'backgrounds/md2.jpg',
                    name: 'Min'
                },
                {
                    src: 'backgrounds/md2.jpg',
                    name: 'T1'
                },
                
            ],
            selected: [],
        }
    },
}
</script>

<style scoped>
#course-card{
    width: 60vw;
}
</style>