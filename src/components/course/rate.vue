<template>
  <v-app id="inspire">

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="12" sm="2">
                <v-sheet rounded="lg" min-height="268">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>{{title}}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-title>interesting</v-list-item-title>
                      <v-list-item-subtitle>
                        <v-row align="center" class="mx-0">
                          <v-rating :value="average" color="amber" dense half-increments readonly size="14"></v-rating>
                          <div class="grey--text ml-2">{{average}}</div>
                          <v-icon class="ml-4" size="14" @click="addrating">mdi-send</v-icon>
                        </v-row>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-title>workload</v-list-item-title>
                      <v-list-item-subtitle>
                       <v-row align="center" class="mx-0">
                          <v-rating :value="average" color="amber" dense half-increments readonly size="14"></v-rating>
                          <div class="grey--text ml-2">{{average}}</div>
                          <v-icon class="ml-4" size="14" @click="addrating">mdi-send</v-icon>
                        </v-row>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item three-line>
                    <v-list-item-content>
                      <v-list-item-title>
                        syllabus
                        <v-icon class="ml-4" size="14" @click="addfile">mdi-upload</v-icon>
                      </v-list-item-title>
                      <v-list-item-subtitle v-for="fileUpload in fileUploads" :key="fileUpload.id">
                        {{fileUpload.filename}} - {{fileUpload.description}}
                        <v-btn class="info ml-2" x-small @click="redirect(fileUpload.imageUrl)">View File</v-btn>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
            </v-sheet>
          </v-col>

          <v-col
            cols="12"
            sm="8"
          >
            <v-sheet
              min-height="70vh"
              rounded="lg"
            >
              <v-list three-line>
                <template v-for="(item, index) in showComments">
                  <v-subheader
                    v-if="item.header"
                    :key="item.header"
                    v-text="comment"
                  ></v-subheader>

                  <v-divider
                    v-else-if="item.divider"
                    :key="index"
                    :inset="item.inset"
                  ></v-divider>

                  <v-list-item
                    v-else
                    :key="item.comment"
                  >
                    <v-list-item-avatar>
                      <v-img :src="item.avatar"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title v-html="item.comment"></v-list-item-title>
                      <v-list-item-subtitle v-html="item.time"></v-list-item-subtitle>
                      <v-list-item-subtitle v-html="item.user"></v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </template>
                <div class="text-xs-center text-sm-center">
                    <v-btn @click="addcomment()">add comment</v-btn>
                </div>
                
              </v-list>
            </v-sheet>
          </v-col>

          <v-col
            cols="12"
            sm="2"
          >
            <v-sheet
              rounded="lg"
              min-height="268"
            >
              <v-row>
                <v-col cols="12" sm="12">
                    <div>{{desc}}</div>
                </v-col>
              </v-row>

            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import coursedesc from './coursedesc.json';
  export default {
    data: () => ({
      value: 4,
      items: [
        { header: 'Comment' },
        // {
        //   avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        //   title: 'Brunch this weekend?',
        //   subtitle: `<span class="text--primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        // },
        // { divider: true, inset: true },
        // {
        //   avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        //   title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
        //   subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
        // },
        // { divider: true, inset: true },
      ],
      //科目信息
      title: '',
      pdata: coursedesc,
      desc: ''
    }),
    created() {
      this.title = this.$route.params.name;
      // this.$store.dispatch('loadRatings', this.$props.classname)
      this.$store.dispatch('loadRatings', this.$route.params.name)
      this.$store.dispatch('loadfileUploads', this.$route.params.name)
      this.$store.dispatch('loadComments', this.$route.params.name)

      this.desc = this.pdata[this.title][0];
    },
    mounted() {
      console.log(111);
    },
    computed: {
      average () {//显示rate
        const ratings = this.$store.getters.loadedRatings;
        var total = 0;
        // for loop in javascript gets the key of the object, not the object
        for(let ratingnum in ratings){
          total = total + ratings[ratingnum]['rate']
        }
        var average=total/(Object.keys(ratings).length)
        if(!isNaN(average)) {
          return parseInt(average.toPrecision(2));
        }else {
          return 0;
        }
      },
      fileUploads () { //显示上传文件
        const files = this.$store.getters.loadedfileUploads;
        var targetFile = []
        for(let filenum in this.$store.getters.loadedfileUploads){
            targetFile.push(files[filenum])
        }
        return targetFile;
      },
      showComments () {
        // console.log(this.$store.getters.loadedComments);
        const files = this.$store.getters.loadedComments;
        var targetFile = [];
        for(let filenum in this.$store.getters.loadedComments){
          targetFile.push(files[filenum])
        }
        return targetFile;
      }
    },
    methods: {
      addrating() {
        this.$router.push('/addrating/'+ this.title)
      },
      addfile() {
        this.$router.push('/addfile/'+ this.title)
      },
      addcomment() {
        this.$router.push('/addcomment/'+ this.title)
      },
      redirect (imageUrl) {
        window.open(imageUrl, "_blank"); 
      },
    }
  }
</script>