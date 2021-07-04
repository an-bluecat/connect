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
    <!-- 四块右侧区域 -->
    <v-main v-show="showArea1">
      <v-container
        class="py-16 px-10"
        fluid
      >
        <v-card  elevation="5" class="py-5">
          <v-subheader class="text-h5">Basic information</v-subheader>
          <v-card-text class="px-7">
            <form @submit.prevent="updateProfile">
              <v-layout row>
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
              <v-layout row>
                <v-flex >
                  <v-text-field
                    name="displayName"
                    label="displayName"
                    id="displayName"
                    v-model="displayName"
                    type="text"
                    required></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex >
                  <v-btn class="btn" color="primary" type="submit" :disabled="loading" :loading="loading">
                    Save
                      <span slot="loader" class="custom-loader">
                      <v-icon light>loading</v-icon>
                      </span>
                  </v-btn>
                </v-flex>
              </v-layout>
            </form>
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>





    <v-main v-show="showArea2">
      <v-container
        class="py-8 px-6"
        fluid
      >
        <v-row>
          <v-col
            v-for="card in collection"
            :key="card"
            cols="12"
          >
            <v-card elevation="5">
              <v-subheader>{{ card }}</v-subheader>

              <v-list two-line>
                <template v-for="(item, i) in getMyFav">
                  <v-list-item
                    :key="i"
                  >
                    <v-list-item-avatar color="grey darken-1">
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>{{ item['classname'] }}</v-list-item-title>

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
      </v-container>
    </v-main>





    <v-main v-show="showArea3">
      <v-container
        class="py-8 px-6"
        fluid
      >
        <v-row>
          <v-col
            v-for="card in elevations"
            :key="card"
            cols="12"
          >
          <template v-for="(item, index) in getMyRecords">
            <v-card :key="index" elevation="5">
              <v-subheader>{{ card }}</v-subheader>
              <v-list two-line>
                  <v-list-item :key="index">
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
                
              </v-list>
            </v-card>
            </template>
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
                    label="newPassword"
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
        ['mdi-inbox-arrow-down', 'Basic information'],
        ['mdi-send', 'My collection'],
        ['mdi-delete', 'My evaluation'],
        ['mdi-alert-octagon', 'Modify password'],
      ],
      //面包屑导航
      items: [
        {text: 'Home', disabled: false, href: '/'},
        {text: 'Profile', disabled: false, href: ''}
      ],
      //右侧区域
      showArea1: true,
      showArea2: false,
      showArea3: false,
      showArea4: false,
      //Area1
      displayName: '',
      rules: [
        value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
      ],
      imageUrl: '',
      image: '',
      //Area2
      collection: ['My collection'],
      //Area3
      elevations: ['My evaluation'],
      //Area4
      newPassword: ''
    }),
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
      onclickoptions(option) {
        this.plist = [];
        switch(option) {
          case "Basic information":
            this.showArea1 = true;
            this.showArea2 = false;
            this.showArea3 = false;
            this.showArea4 = false;
            break;
          case "My collection":
            this.showArea1 = false;
            this.showArea2 = true;
            this.showArea3 = false;
            this.showArea4 = false;
            break;
          case "My evaluation":
            this.showArea1 = false;
            this.showArea2 = false;
            this.showArea3 = true;
            this.showArea4 = false;
            break;  
          case "Modify password":
            this.showArea1 = false;
            this.showArea2 = false;
            this.showArea3 = false;
            this.showArea4 = true;
            break;                             
        }
      },
      uploadPhoto(file) {
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
      },
      updateProfile() {
        if (!this.image){
          return
        }
        this.$store.dispatch('updateProfile', {displayName: this.displayName,photoURL: this.image})
      },
      modifyPassword() {
        this.$store.dispatch('updatePassword', this.newPassword)
      }
    }
  }
</script>