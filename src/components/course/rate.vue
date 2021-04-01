<template>
  <v-app id="inspire">

    <v-main class="grey lighten-3">
      <v-container>
        <v-row no-gutters style="height: 50px;background-color: white">
          <v-list-item>
            <v-list-item-content>
              <v-breadcrumbs :items="bitems" large></v-breadcrumbs>
              <!-- <v-list-item-title>{{title}}</v-list-item-title> -->
            </v-list-item-content>
          </v-list-item>
        </v-row>
        <v-row no-gutters style="height: 268px;background-color: white">
          <v-col class="pl-6">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{title}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>workload</v-list-item-title>
                <v-list-item-subtitle>
                  <v-row align="center" class="mx-0">
                    <v-rating :value="average" color="amber" dense half-increments readonly size="14"></v-rating>
                    <div class="grey--text ml-1">{{average}}</div>
                    <!-- <v-icon class="ml-4" size="14" @click="addrating">mdi-send</v-icon> -->
                    <v-btn class="info ml-2" x-small @click="addrating">rate</v-btn>
                  </v-row>
                  <!-- <v-btn class="info mt-1" x-small @click="addrating">rate this course</v-btn> -->
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title>
                  syllabus
                  <!-- <v-icon class="ml-4" size="14" @click="addfile">mdi-upload</v-icon> -->
                  <v-btn class="info ml-2" x-small @click="addfile">upload</v-btn>
                </v-list-item-title>
                <v-list-item-subtitle v-for="fileUpload in fileUploads" :key="fileUpload.id">
                  <a :href="fileUpload.imageUrl" target="_blank">{{fileUpload.filename}} - {{fileUpload.description}}</a>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col>
            <p class="text-justify mt-3 pr-4">{{desc}}</p>
          </v-col>
        </v-row>
        <v-row no-gutters style="height: 550px;background-color: white">
          <v-col align="left">
              <v-divider inset></v-divider>
              <v-list three-line>
                <template v-for="(item, index) in showComments">
                  <v-subheader
                    v-if="item.header"
                    :key="item.header"
                    v-text="comment"
                  ></v-subheader>
                  
                  <v-list-item
                    v-else
                    :key="item.comment"
                  >
                    <v-list-item-avatar>
                      <!-- <v-img :src="item.avatar"></v-img> -->
                      <v-avatar color="indigo" size="56">
                          <v-icon dark>
                            mdi-account-circle
                          </v-icon>
                      </v-avatar>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title v-html="item.comment"></v-list-item-title>
                      <v-list-item-subtitle v-html="item.time"></v-list-item-subtitle>
                      <v-list-item-subtitle v-html="item.user"></v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider
                    v-if="index !== (showComments.length-1)"
                    :key="`divider-${index}`"
                    inset
                  ></v-divider>

                </template>
                <div class="text-xs-center text-sm-center">
                    <v-btn @click="addrating()">add comment</v-btn>
                    <div class="text-center mt-4">
                      <v-pagination
                        v-model="page"
                        :length="pageLength"
                        @input="onPageChange"
                        v-if="showPage"
                      ></v-pagination>
                    </div>
                </div>
                
              </v-list>
          </v-col>
        </v-row >

      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import coursedesc from './coursedesc.json';
  export default {
    data: () => ({
      //科目信息
      title: '',
      pdata: coursedesc,
      desc: '',
      //面包屑导航
      bitems: [
        {text: 'Home', disabled: false, href: '/'},
        {text: '', disabled: false, href: ''}
      ],
      //分页
      page: 1,
      pageLength: 0,
      showPage: false,
    }),
    created() {
      this.title = this.$route.params.name;
      //面包屑
      this.bitems[1].text = this.title;this.bitems[1].href = '/rate/'+this.title;
      // this.$store.dispatch('loadRatings', this.$props.classname)
      this.$store.dispatch('loadRatings', this.$route.params.name)
      this.$store.dispatch('loadComments', {name:this.$route.params.name,page:this.page})

      if(this.pdata[this.title] != undefined) {
        this.desc = this.pdata[this.title][0];
      }
      
    },
    mounted() {
      // console.log(111);
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
        
        if(files.length > 0) {
          for(let filenum in this.$store.getters.loadedfileUploads){
              targetFile.push(files[filenum])
          }
        }
        this.$store.dispatch('loadfileUploads', this.$route.params.name)
        return targetFile;
      },
      showComments () {
        // console.log(this.$store.getters.loadedComments);
        const files = this.$store.getters.loadedComments;
        var targetFile = [];
        for(let filenum in this.$store.getters.loadedComments){
          targetFile.push(files[filenum])
        }
        
        if(targetFile.length > 0) {
          this.pageLength = (targetFile.length != 0) ? Math.ceil(targetFile[0]['total'] / 4) : 1;
          this.showPage = true
        }else {
          this.showPage = false
        }
        return targetFile;
      },
    },
    methods: {
      addrating() {
        this.$router.push('/addrating/'+ this.title)
      },
      addfile() {
        this.$router.push('/addfile/'+ this.title)
      },
      // addcomment() {
      //   this.$router.push('/addcomment/'+ this.title)
      // },
      redirect (imageUrl) {
        window.open(imageUrl, "_blank"); 
      },
      onPageChange(page) {
        this.page = page;
        this.$store.dispatch('loadComments', {name:this.$route.params.name,page:this.page})
      },

    }
  }
</script>