<template>
  <v-app id="inspire">
    <!-- 左侧区域 -->
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-sheet color="grey lighten-4" class="pa-4">
        <v-breadcrumbs :items="items" large></v-breadcrumbs>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="[icon, text] in links"
          :key="icon"
          link
          @click="onclickoptions(text)"
        >
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- 左侧区域 -->
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Profile</v-toolbar-title>
    </v-app-bar>
    <!-- 3块右侧区域 -->

    <!-- 基本信息 & favorite -->
    <v-main v-show="showArea1">
      <v-container
        class="py-16 px-10"
        fluid
      >
        <!-- 基本信息 -->
        <v-card  elevation="5" class="py-5">
          <v-subheader class="text-h5">Basic information</v-subheader>
          <v-card-text class="px-7">
            <form @submit.prevent="updateProfile">
              <v-layout row class="py-4 px-3">
                <v-list-item-title class="text-h6 font-weight-medium py-3 black--text">Profile picture</v-list-item-title>
                <v-flex class="d-flex">
                  <v-avatar class="mb-4" :color="userLoggedIn ? 'primary':'grey'">
                    <v-icon dark v-if="!userLoggedIn"> mdi-account-circle</v-icon>
                    <img v-else-if="getUserProfile" :src="getPhotoURL" alt="avatar">
                    <span v-else class="white--text headline">{{ getSX }}</span>
                  </v-avatar>
                    <v-file-input
                      class="ml-4"
                      chips
                      hide-input
                      prepend-icon="mdi-camera"
                      :rules="rules"
                      accept="image/png, image/jpeg, image/bmp"
                      @change="uploadPhoto"
                    ></v-file-input>
                </v-flex>
              </v-layout>
              <v-list-item-title class="text-h6 font-weight-medium pt-6 black--text">User name</v-list-item-title>
              <v-layout row class="py-3">
                <!-- <v-flex > -->
                <v-col col="12" xl="5" lg="5" md="5" sm="12" xs="12">
                  <v-text-field
                    name="displayName"
                    label="Displayed name"
                    id="displayName"
                    v-model="displayName"
                    type="text"
                    filled
                    required></v-text-field>
                <!-- </v-flex> -->
              <!-- </v-layout> -->
              <!-- <v-layout row>
                <v-flex > -->
                </v-col>
                <v-col col="12" xl="5" lg="5" md="5" sm="12" xs="12">
                  <v-btn class="btn" color="primary" type="submit" :disabled="loading" :loading="loading">
                    Save
                      <span slot="loader" class="custom-loader">
                      <v-icon light>loading</v-icon>
                      </span>
                  </v-btn>
                </v-col>
                <v-col class="mt-n8" col="12" xl="5" lg="5" md="5" sm="12" xs="12">
                    <v-alert v-show="showSucTips" dismissible dense prominent type="success">username saved!</v-alert>
                    <v-alert v-show="showErrTips" dismissible dense prominent type="error">something error!</v-alert>
                </v-col>
                <!-- </v-flex> -->
              </v-layout>
            </form>
          </v-card-text>
        </v-card>
        <v-dialog
          v-model="dialog"
          hide-overlay
          persistent
          width="300"
        >
          <v-card
            color="primary"
            dark
          >
            <v-card-text>
              Uploading, Please stand by
              <v-progress-linear
                indeterminate
                color="white"
                class="mb-0"
              ></v-progress-linear>
            </v-card-text>
          </v-card>
        </v-dialog>

        <!-- 收藏课程 -->
        <v-row class="mt-4">
          <v-col
            v-for="card in collection"
            :key="card"
            cols="12"
          >
            <v-card elevation="5" class="py-5">
              <v-subheader class="text-h5">{{ card }}</v-subheader>

              <v-list two-line>
                <template v-for="(item, i) in getMyFav">
                  <v-list-item
                    :key="i"
                    link
                  >
                    <v-list-item-avatar color="grey darken-1">
                    </v-list-item-avatar>

                    <v-list-item-content @click="navToRate(item['classname'])">
                      <v-list-item-title class="text-decoration-underline">{{ item['classname'] }}</v-list-item-title>

                      <v-list-item-subtitle>
                        collected on: {{ item['time'] }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider
                    v-if="i !== getMyFavLength"
                    :key="`divider-${i}`"
                    inset
                  ></v-divider>
                </template>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col align="center">
                <div class="text-xs-center text-sm-center">
                  <v-btn @click="logout()">Log out</v-btn>
                  </div>
              </v-col>
            </v-row>
      </v-container>

    </v-main>






    <v-main v-show="showArea3">
      <v-container
        class="py-8 px-6"
        fluid
      >
      <v-subheader class="text-h5">My Reviews</v-subheader>
        <v-row>
          
          <v-col cols="12">
          
            <v-card elevation="5" class="my-5" v-for="(item, index) in getMyRecords">
              
              <v-list :key="index" two-line >
                <template >
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class="font-weight-medium">
                        Difficulty
                        <v-rating
                          :value="item.rate"
                          color="yellow darken-3"
                          background-color="grey darken-1"
                          half-increments
                          dense
                          :hover="true"
                          :readonly="true"
                          size="15"
                        ></v-rating>
                      </v-list-item-title>
                      <v-list-item-title class="font-weight-medium">
                        Usefulness
                        <v-rating
                          :value="item.usefulness"
                          color="yellow darken-3"
                          background-color="grey darken-1"
                          half-increments
                          dense
                          :hover="true"
                          :readonly="true"
                          size="15"
                        ></v-rating>
                      </v-list-item-title>
                      {{ item.comment }}
                      <v-list-item-subtitle>{{ item.time }}</v-list-item-subtitle>

                      <v-list-item-subtitle v-if="item.pname != ''"
                        >taught by {{ item.pname }}</v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-list>
            </v-card>
            
          </v-col>
        </v-row>
      </v-container>
    </v-main>



    <v-main v-show="showArea4">
      <v-container
        class="py-16 px-10"
        fluid
      >
        <v-card  elevation="5" class="py-5">
          <v-subheader class="text-h5">Modify password</v-subheader>
          <v-card-text class="px-7">
            <form @submit.prevent="modifyPassword">
              <v-layout row>
                <v-flex >
                  <v-text-field
                    name="newPassword"
                    label="New Password"
                    id="newPassword"
                    v-model="newPassword"
                    type="password"
                    required></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex >
                  <v-btn class="btn" color="primary" type="submit" :disabled="loading" :loading="loading">
                    Modify
                      <span slot="loader" class="custom-loader">
                      <v-icon light>loading</v-icon>
                      </span>
                  </v-btn>
                <v-col class="ml-n3" col="12" xl="5" lg="5" md="5" sm="12" xs="12">
                    <v-alert v-show="showSucTips2" dismissible dense prominent type="success">password modified!</v-alert>
                    <v-alert v-show="showErrTips2" dismissible dense prominent type="error">something error!</v-alert>
                </v-col>
                </v-flex>
              </v-layout>
            </form>
          </v-card-text>
        </v-card>
  
      </v-container>
    </v-main>

  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: null,
      links: [
        ['mdi-information', 'Basic information'],
        ['mdi-comment-quote-outline', 'My Reviews'],
        ['mdi-lock-reset', 'Modify password'],
      ],
      //面包屑导航
      items: [
        {text: 'Home', disabled: false, href: '/'},
        {text: 'Profile', disabled: false, href: ''}
      ],
      //右侧区域
      showArea1: true,
      showArea3: false,
      showArea4: false,
      //Area1
      displayName: '',
      rules: [
        value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
      ],
      imageUrl: '',
      image: '',
      dialog: false,
      collection: ['My Favourites'],
      showSucTips: false,
      showErrTips: false,
      showSucTips2: false,
      showErrTips2: false,
      //Area3
      // elevations: ['My Reviews'],
      //Area4
      newPassword: ''
    }),
    watch: {
      uploadloading (curval, oldval) {
          if(!curval) {
            this.dialog = false;
          }
      },
      loading (curval, oldval) {
        if(!curval) {
            this.showSucTips = true;
            setTimeout(() => (this.showSucTips = false), 4000)
            this.showSucTips2 = true;
            setTimeout(() => (this.showSucTips2 = false), 4000)
        }
      },
    },
    mounted() {
      if(this.userLoggedIn) {
        this.$store.dispatch('getUserProfile', {})
        this.displayName = this.$store.getters.userProfile.displayName;
        // console.log(JSON.stringify(this.$store.getters.userProfile));
        //getMyFav
        this.$store.dispatch('getMyFav', {})
        // console.log(JSON.stringify(this.$store.getters.loadedFavs));
        //getMyRecords
        this.$store.dispatch('getMyRecords', {})
        // console.log(JSON.stringify(this.$store.getters.loadedRecords));
      }
    },
    computed: {
      userInfo() {
        let userInfo = this.$store.getters.user != null ? this.$store.getters.user.email : 'unknown'
        return userInfo;
      },
      userLoggedIn(){
        // console.log("this.$store.getters.user", this.$store.getters.user)
        return this.$store.getters.user != null ;
      },
      getUserProfile() {
        return this.$store.getters.userProfile.photoURL != null ;
      },
      getPhotoURL() {
        return this.$store.getters.userProfile.photoURL;
      },
      getSX() {
        let Abbreviations = this.$store.getters.user != null ? this.$store.getters.user.email.substr(0, 1).toUpperCase() : 'unknown'
        return Abbreviations;
      },
      loading() {
        return this.$store.getters.saveloading
      },
      uploadloading() {
        return this.$store.getters.uploadloading
      },
      getMyFav() {
        return this.$store.getters.loadedFavs;
      },
      getMyFavLength() {
        return this.$store.getters.loadedFavs.length - 1;
      },
      getMyRecords() {
        return this.$store.getters.loadedRecords;
      }
    },
    methods: {
      logout() {
      //清除vuex数据 跳转首页
      this.$store.dispatch('logout', {})
      // did not clear cookies!!!
      if(this.$route.path == '/') {
        this.$router.go(0);
      }else {
        this.$router.replace("/");
        
      }
      
    },
      onclickoptions(option) {
        this.plist = [];
        switch(option) {
          case "Basic information":
            this.showArea1 = true;
            this.showArea3 = false;
            this.showArea4 = false;
            break;
          case "My Reviews":
            this.showArea1 = false;
            this.showArea3 = true;
            this.showArea4 = false;
            break;  
          case "Modify password":
            this.showArea1 = false;
            this.showArea3 = false;
            this.showArea4 = true;
            break;                             
        }
      },
      uploadPhoto(file) {
        this.dialog = true;
        let filename = file.name;
        // doesn't have extension in the filename
        if (filename.lastIndexOf('.') <= 0){
          return alert("Please add a valid file!")
        }
        // turn binary file to string value
        const fileReader = new FileReader()
        fileReader.addEventListener('load',()=>
          // result is the base 64 string. imageURL can preview with this
          this.imageUrl = fileReader.result
        )
        fileReader.readAsDataURL(file)

        // store binary file
        this.image = file
        // refresh avatar
        this.$store.dispatch('updatePhoto', {photoURL: this.image})
      },
      updateProfile() {
        this.$store.dispatch('updateProfile', {displayName: this.displayName})
      },
      modifyPassword() {
        this.$store.dispatch('updatePassword', this.newPassword)
      },
      navToRate(item) {
        // console.log(item);return
        this.$router.replace('/rate/'+ item);
      }
    }
  }
</script>