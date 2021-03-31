<template>
  <v-app>
    <v-navigation-drawer
      permanent="permanent"
      absolute
      dark
    >
      <v-list
        dense
        nav
        class="py-0"
      >
        <v-list-item >

          <v-list-item-content>
            <v-list-item-title>{{classname}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

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
    </v-navigation-drawer>
    <v-content>
      <v-container>   
        <v-flex xs12 sm6 class="text-xs-center text-sm-right">
          <h1>{{this.classname}}</h1>
          <h3>rating: {{average}}/5</h3>
          <v-btn @click="onclickaddrating()">add rating</v-btn>
          <br></br>
        </v-flex>
        <v-layout row wrap v-for="comment of comments" :key="comment.id" class="mb-2">
          
          <v-flex xs12 sm10 md8 offset-sm1 offset-md2>

            <v-card color="grey lighten-4">
              
              <v-container fluid>
                <v-layout row>
                  <v-flex xs7 sm8 md9>
                    <v-card-title primary-title>
                      <v-rating
                        v-model="comment.rate"
                        background-color="white"
                        color="yellow accent-4"
                        dense
                        half-increments
                        readonly
                        size="22"
                      ></v-rating>
                      <span class="black--text text--lighten-1 caption mr-2">
                        ({{comment.rate}})
                      </span>
                    </v-card-title>
                    <v-card-subtitle>
                      {{comment.time}}
                      <!-- <br><br/> -->
                    </v-card-subtitle>
                    <v-card-text>
                      <h6>{{comment.comment}}</h6>
                    </v-card-text>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

  </v-app>
  
</template>

<script>
  export default {
    name: 'ratings',
    props: ['classname'],
    data(){
      return {
            items: [
              { title: 'Discussion', icon: 'mdi-comment-account-outline' },
              { title: 'Ratings', icon: 'mdi-star' },
              { title: 'Resources', icon: 'mdi-semantic-web' },
            ],
      }
    },
    created () {
        // load files
        this.$store.dispatch('loadRatings', this.$props.classname)
    },
    computed: {
      comments () {
        return this.$store.getters.loadedRatings
      },
      average () {
        const ratings = this.$store.getters.loadedRatings;
        var total = 0;
        // for loop in javascript gets the key of the object, not the object
        for(let ratingnum in ratings){
          total = total + ratings[ratingnum]['rate']
        }
        var average=total/(Object.keys(ratings).length)
        return average.toPrecision(2);
      }
    },
    methods: {
      redirect (fileUpload) {
        window.open(fileUpload.imageUrl, "_blank"); 
      },
      onclickaddrating (){
        this.$router.push('/addrating/' + this.classname)
      },
      onclickoptions(option) {
        console.log("option", option)
        if(option['title'] == "Discussion"){
          return this.$router.push('/course/' + this.classname)
        }
        if(option['title'] == "Ratings"){
          return this.$router.push('/course/' + this.classname + '/ratings')
        }
        if(option['title'] == "Resources"){
          return this.$router.push('/course/' + this.classname + '/resources')
        }
      }
    }
  }
</script>
