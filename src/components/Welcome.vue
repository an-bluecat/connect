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
                        :loading="isLoading"
                        :search-input.sync="search"
                        color="white"
                        hide-selected
                        item-text="Description"
                        item-value="Course"
                        label="Search your Courses"
                        placeholder="MAT194"
                        prepend-icon="mdi-database-search"
                        return-object
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

export default {
    components: {
        courseList
    },
    data: () => ({
      descriptionLimit: 60,
      entries: [],
      isLoading: false,
      model: null,
      search: null,
    }),

    computed: {
      fields () {
        if (!this.model) return []

        return Object.keys(this.model).map(key => {
          return {
            key,
            value: this.model[key] || 'n/a',
          }
        })
      },
      items () {
        return this.entries.map(entry => {
          const Description = entry.Description.length > this.descriptionLimit
            ? entry.Description.slice(0, this.descriptionLimit) + '...'
            : entry.Description

          return Object.assign({}, entry, { Description })
        })
      },
    },

    watch: {
      search (val) {
        // Items have already been loaded
        if (this.items.length > 0) return

        // Items have already been requested
        if (this.isLoading) return

        this.isLoading = true

        // Lazily load input items
        fetch('https://api.publicapis.org/entries')
          .then(res => res.json())
          .then(res => {
            const { count, entries } = res
            this.count = count
            this.entries = entries
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => (this.isLoading = false))
      },
    },
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