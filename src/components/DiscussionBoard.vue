<template>
    <v-container id="container" fluid ma-0 pa-0 fill-height>
        <v-form v-model="valid">
          <v-text-field
            v-model="firstname"
            :rules="nameRules"
            :counter="10"
            label="First name"
            required
          ></v-text-field>
    </v-form>
    </v-container>
</template>

<script>
    export default {
        data () {
            return {
                nameRules: [
                    v => !!v || 'Name is required'
                ]
            }
        },
        methods: {

        }
    }
</script>

<style scoped>
.v-container {
    background-color: aqua;
    right: 0px;
}
</style>