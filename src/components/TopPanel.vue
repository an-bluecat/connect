<template>
    <v-tabs
    fixed-tabs
    background-color="#343a40"
    dark
    >
        <v-tab @click="$router.push('/').catch(()=>{})">
            Home
        </v-tab>
        <!-- <v-tab @click="$router.push('/courses').catch(()=>{})">
            Courses
        </v-tab> -->
        <v-tab @click="$router.push('/about').catch(()=>{})">
            About
        </v-tab>
    </v-tabs>
</template>

<script>
    export default {
        data () {
            return {

            }
        },
        methods: {
            test: () => {

            }
        }
    }
</script>

<style scoped>
.v-tabs {
    height:50px;
}
</style>