<template>
    <v-list dense nav class="py-0">
        <v-list-item >
            <v-list-item-title>{{classname}}</v-list-item-title>
        </v-list-item>
        <v-divider/>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          @click="onclickoptions(item)"
        >
            <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
    </v-list>
</template>

<script>
export default {
    name:"NavgationBar",
    components: {
    },
    data(){
        return {
            classname: this.$route.params.name,
            items: [
              { title: 'Discussion', icon: 'mdi-comment-account-outline' },
              { title: 'Ratings', icon: 'mdi-star' },
              { title: 'Resources', icon: 'mdi-semantic-web' },
            ],

        }
    },
    methods: {
      onclickoptions(option) {
        console.log("option", option)
        if(option['title'] == "Discussion"){
          return this.$router.push('/course/' + this.$route.params.name)
        }
        if(option['title'] == "Ratings"){
          return this.$router.push('/course/' + this.$route.params.name + '/ratings')
        }
        if(option['title'] == "Resources"){
          return this.$router.push('/course/' + this.$route.params.name + '/resources')
        }
      }
  }
}
</script>