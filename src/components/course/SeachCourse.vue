<template>
  <v-autocomplete
    v-model="model"
    :items="autofillList"
    hide-selected
    item-text="Description"
    item-value="Course"
    label="Seach Any UTSG Courses"
    placeholder="Start typing to Search"
    prepend-icon="mdi-database-search"
    hide-no-data
    ref="search_bar"
    @change="onchangeclass()"
    @update:search-input="onchangeinput"
  ></v-autocomplete>
</template>

<script>
export default {
  props: ['courses'],
  data: () => ({
    model: null,
    // courses: courseimport
    autofillList: []
  }),
  methods: {
    onchangeclass() {
      if (this.model == null) {
        return
      }
      // this.$router.push('./course/'+ this.model)
      // let routeData = this.$router.resolve('./project/rate/'+ this.model);
      // window.open(routeData.href, '_blank');
      // 域名需要除去课名，只留下代码
      var coursecode = this.model.split(' ')[0]
      this.$router.push('./course/' + coursecode)
    },
    onchangeinput(input) {
      if (input) {
        this.autofillList = this.items
      } else {
        this.autofillList = []
      }
    }
  },
  computed: {
    items() {
      var result = []
      for (let num in this.courses) {
        result.push(this.courses[num]['name'])
      }
      // console.log("result", result)
      return result
    }
  }
}
</script>

<style scoped>
/* .v-autocomplete {
  min-width: 500px;
  min-height: 100px;
} */
</style>
