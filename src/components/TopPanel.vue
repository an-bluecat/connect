<template>
    <v-app id="inspire">
    <v-tabs
      fixed-tabs
      background-color="#343a40"
      dark
    >
        <v-tab @click="$router.push('/')">
            Home
        </v-tab>
        <v-tab @click="$router.push('/about')">
            About
        </v-tab>
        <v-tab @click="$router.push('/courses')">
            Courses
        </v-tab>
    </v-tabs>
    </v-app>
</template>

<script>
    export default {
        data () {
            return {

            }
        },
    }
</script>

<style scoped>

</style>