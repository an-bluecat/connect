<template>
  <v-app id="inspire">
    <!-- 左侧区域 -->
    <v-navigation-drawer v-model="drawer" app>
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
    <!-- 基本信息 -->
    <v-main v-show="showArea1">
      <v-container class="py-3 px-3" fluid>
        <v-card elevation="5" class="py-1">
          <v-subheader class="text-h5">Basic information</v-subheader>
          <v-card-text class="px-7">
            <form @submit.prevent="updateProfile">
              <v-layout row class="pb-1 px-3">
                <v-list-item-title
                  class="text-h6 font-weight-medium py-3 black--text"
                  >Profile picture</v-list-item-title
                >
                <v-flex class="d-flex">
                  <v-avatar
                    class="mb-4"
                    :color="userLoggedIn ? 'primary' : 'grey'"
                  >
                    <v-icon dark v-if="!userLoggedIn">
                      mdi-account-circle</v-icon
                    >
                    <img
                      v-else-if="getUserProfile"
                      :src="getPhotoURL"
                      alt="avatar"
                    />
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
              <!-- 邮件部分 -->
              <!-- <v-list-item-title class="text-h6 font-weight-medium pt-6 black--text">Email Verified</v-list-item-title>
              <v-list-item-subtitle class="headline mt-4">
                Status：
                  <v-btn v-if="!emailVerified" @click="verify" color="primary" :disabled="verifyloading" :loading="verifyloading">
                    Go to verify
                      <span slot="loader" class="custom-loader">
                      <v-icon light>loading</v-icon>
                      </span>
                  </v-btn>
                  <v-btn v-if="emailVerified" text>
                    Verified
                  </v-btn>
                  <v-col col="12" xl="4" lg="4" md="4" sm="12" xs="12">
                    <v-alert v-show="showEmailSuccess" dismissible dense type="success">Mail has been sent!</v-alert>
                  </v-col>
              </v-list-item-subtitle> -->
              <v-list-item-title class="text-h6 font-weight-medium black--text"
                >User name</v-list-item-title
              >
              <v-layout row>
                <v-col col="12" xl="5" lg="5" md="5" sm="10" xs="10">
                  <v-text-field
                    name="displayName"
                    label="Displayed name"
                    id="displayName"
                    v-model="displayName"
                    type="text"
                    required
                  ></v-text-field>
                  <v-btn
                    class="mt-n3"
                    color="primary"
                    type="submit"
                    :disabled="loading"
                    :loading="loading"
                  >
                    Save
                    <span slot="loader" class="custom-loader">
                      <v-icon light>loading</v-icon>
                    </span>
                  </v-btn>
                </v-col>
              </v-layout>
            </form>
            <v-list-item-title
              class="text-h6 font-weight-medium black--text mt-3"
              >Discipline</v-list-item-title
            >
            <v-col
              class="ml-n2 mt-n3 mb-n8"
              col="12"
              xl="5"
              lg="5"
              md="5"
              sm="5"
              xs="5"
            >
              <v-select
                :items="disciplines"
                label="discipline"
                v-model="discipline"
                @change="updateDiscipline()"
              ></v-select>
            </v-col>
            <v-col class="mt-2" col="12" xl="5" lg="5" md="5" sm="5" xs="5">
              <v-alert
                v-show="showSucTips"
                dismissible
                dense
                prominent
                type="success"
                >profile saved!</v-alert
              >
              <v-alert
                v-show="showErrTips"
                dismissible
                dense
                prominent
                type="error"
                >error!</v-alert
              >
            </v-col>
          </v-card-text>
        </v-card>
        <v-dialog v-model="dialog" hide-overlay persistent width="300">
          <v-card color="primary" dark>
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
        <v-row class="mt-4">
          <v-col v-for="card in collection" :key="card" cols="12">
            <v-card elevation="5" class="py-5">
              <v-subheader class="text-h5">{{ card }}</v-subheader>

              <v-list two-line>
                <template v-for="(item, i) in getMyFav">
                  <v-list-item :key="i" link>
                    <v-list-item-avatar color="grey darken-1">
                    </v-list-item-avatar>

                    <v-list-item-content @click="navToRate(item['classname'])">
                      <v-list-item-title class="text-decoration-underline">{{
                        item["classname"]
                      }}</v-list-item-title>

                      <v-list-item-subtitle>
                        collected on: {{ item["time"] }}
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
      <v-container class="py-8 px-6" fluid>
        <!-- <v-subheader class="text-h5">My Reviews</v-subheader> -->
        <v-expansion-panels v-model="panel" hover multiple>
          <v-row>
            <v-container>
              <v-expansion-panel>
                <v-expansion-panel-header
                  ><h5>My Reviews</h5></v-expansion-panel-header
                >
                <v-expansion-panel-content>
                  <v-col cols="12">
                    <v-card
                      elevation="5"
                      class="my-5"
                      v-for="(item, index) in getMyReviews"
                      :key="index"
                    >
                      <v-list two-line>
                        <template>
                          <v-list-item style="align-items: flex-end">
                            <v-list-item-content>
                              <v-list-item-title
                                class="font-weight-medium mb-2"
                                >{{ item.classname }}</v-list-item-title
                              >
                              <v-list-item-subtitle class="font-weight-normal">
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
                              </v-list-item-subtitle>
                              <v-list-item-subtitle class="font-weight-normal">
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
                              </v-list-item-subtitle>
                              {{ item.comment }}
                              <v-list-item-subtitle>{{
                                item.time
                              }}</v-list-item-subtitle>
                              <v-list-item-subtitle v-if="item.pname != ''"
                                >taught by
                                {{ item.pname }}</v-list-item-subtitle
                              >
                            </v-list-item-content>
                            <v-col class="shrink" style="min-width: auto">
                              <div class="text-center">
                                    <v-btn
                                      text
                                      style="padding: 0px; min-width: 0px;"
                                      @click="navToAddRating(item.classname)"
                                    ><v-icon dark color="blue">mdi-pencil</v-icon></v-btn>
                                <v-dialog v-model="commentDialog" width="500">
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                      text
                                      style="padding: 0px; min-width: 0px;"
                                      v-bind="attrs"
                                      v-on="on"
                                    >
                                      <v-icon dark color="red">
                                        mdi-delete
                                      </v-icon>
                                    </v-btn>
                                  </template>

                                  <v-card>
                                    <v-card-title class="text-h5">
                                      Delete {{ item.classname }}'s review?
                                    </v-card-title>

                                    <v-card-text>
                                      This action cannot be undone. Are you
                                      sure?
                                    </v-card-text>

                                    <v-divider></v-divider>

                                    <v-card-actions>
                                      <v-spacer></v-spacer>

                                      <v-btn text @click="commentDialog = false">
                                        Cancel
                                      </v-btn>
                                      <v-btn
                                        style="
                                          background-color: red;
                                          color: white;
                                        "
                                        @click="
                                          deleteComment(item.classname)
                                        "
                                        >Delete</v-btn
                                      >
                                    </v-card-actions>
                                  </v-card>
                                </v-dialog>
                              </div>
                            </v-col>
                          </v-list-item>
                        </template>
                      </v-list>
                    </v-card>
                  </v-col>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-header
                  ><h5>My Ratings</h5></v-expansion-panel-header
                >
                <v-expansion-panel-content>
                  <v-col cols="12">
                    <v-card
                      elevation="5"
                      class="my-5"
                      v-for="(item, index) in getMyRatings"
                      :key="index"
                    >
                      <v-list two-line>
                        <template>
                          <v-list-item style="align-items: flex-end">
                            <v-list-item-content>
                              <v-list-item-title
                                class="font-weight-medium mb-2"
                                >{{ item.classname }}</v-list-item-title
                              >
                              <v-list-item-subtitle class="font-weight-normal">
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
                              </v-list-item-subtitle>
                              <v-list-item-subtitle class="font-weight-normal">
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
                              </v-list-item-subtitle>
                              {{ item.comment }}
                              <v-list-item-subtitle>{{
                                item.time
                              }}</v-list-item-subtitle>
                              <v-list-item-subtitle v-if="item.pname != ''"
                                >taught by
                                {{ item.pname }}</v-list-item-subtitle
                              >
                            </v-list-item-content>
                            <v-col class="shrink" style="min-width: auto">
                              <div class="text-center">
                                    <v-btn
                                      text
                                      style="padding: 0px; min-width: 0px;"
                                      @click="navToAddRating(item.classname)"
                                    ><v-icon dark color="blue">mdi-pencil</v-icon></v-btn>
                                <v-dialog v-model="ratingDialog" width="500">
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                      text
                                      style="padding: 0px; min-width: 0px;"
                                      v-bind="attrs"
                                      v-on="on"
                                    >
                                      <v-icon dark color="red">
                                        mdi-delete
                                      </v-icon>
                                    </v-btn>
                                  </template>

                                  <v-card>
                                    <v-card-title class="text-h5">
                                      Delete {{ item.classname }}'s ratings?
                                    </v-card-title>

                                    <v-card-text>
                                      This action cannot be undone. Are you
                                      sure?
                                    </v-card-text>

                                    <v-divider></v-divider>

                                    <v-card-actions>
                                      <v-spacer></v-spacer>

                                      <v-btn text @click="ratingDialog = false">
                                        Cancel
                                      </v-btn>
                                      <v-btn
                                        style="
                                          background-color: red;
                                          color: white;
                                        "
                                        @click="
                                          deleteRatings(item.classname)
                                        "
                                        >Delete</v-btn
                                      >
                                    </v-card-actions>
                                  </v-card>
                                </v-dialog>
                              </div>
                            </v-col>
                          </v-list-item>
                        </template>
                      </v-list>
                    </v-card>
                  </v-col>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-header
                  ><h5>My Files</h5></v-expansion-panel-header
                >

                <v-expansion-panel-content>
                  <v-row no-gutters class="mt-6">
                    <v-col>
                      <v-row no-gutters>
                        <v-col
                          md="6"
                          cols="12"
                          v-for="(fileUpload, index) in getMyFiles"
                          :key="index"
                        >
                          <v-card class="mx-auto" width="100%" outlined>
                            <v-list-item
                              :href="fileUpload.imageUrl"
                              target="_blank"
                            >
                              <v-list-item-avatar tile>
                                <v-img
                                  :src='"../../assets/fileicon/pdf.svg"'
                                ></v-img>
                              </v-list-item-avatar>
                              <v-list-item-content>
                                <v-list-item-title
                                  class="mb-2 font-weight-medium"
                                >
                                  {{ fileUpload.type }}
                                </v-list-item-title>
                                <v-list-item-subtitle>
                                  <a v-if="userLoggedIn">{{
                                    fileUpload.filename
                                  }}</a>
                                  <a @click="signupVisible = true" v-else
                                    >{{ fileUpload.filename }}
                                  </a>
                                </v-list-item-subtitle>
                              </v-list-item-content>
                              <v-col class="shrink" style="min-width: auto">
                                <div class="text-center">
                                  <v-dialog v-model="fileDialog" width="500">
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-btn
                                      text
                                      style="padding: 0px; min-width: 0px;"
                                      v-bind="attrs"
                                      v-on="on"
                                    >
                                      <v-icon dark color="red">
                                        mdi-delete
                                      </v-icon>
                                    </v-btn>
                                    </template>

                                    <v-card>
                                      <v-card-title class="text-h5">
                                        Delete {{ fileUpload.classname }}'s file?
                                      </v-card-title>

                                      <v-card-text>
                                        This action cannot be undone. Are you
                                        sure?
                                      </v-card-text>

                                      <v-divider></v-divider>

                                      <v-card-actions>
                                        <v-spacer></v-spacer>

                                        <v-btn text @click="fileDialog = false">
                                          Cancel
                                        </v-btn>
                                        <v-btn
                                          style="
                                            background-color: red;
                                            color: white;
                                          "
                                          @click="
                                            deleteFile(index, fileUpload.classname)
                                          "
                                          >Delete</v-btn
                                        >
                                      </v-card-actions>
                                    </v-card>
                                  </v-dialog>
                                </div>
                              </v-col>
                            </v-list-item>
                          </v-card>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-container>
          </v-row>
        </v-expansion-panels>
      </v-container>
    </v-main>

    <v-main v-show="showArea4">
      <v-container class="py-16 px-10" fluid>
        <v-card elevation="5" class="py-5">
          <v-subheader class="text-h5">Modify password</v-subheader>
          <v-card-text class="px-7">
            <form @submit.prevent="modifyPassword">
              <v-layout row>
                <v-flex>
                  <v-text-field
                    name="newPassword"
                    label="New Password"
                    id="newPassword"
                    v-model="newPassword"
                    type="password"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex>
                  <v-btn
                    class="btn"
                    color="primary"
                    type="submit"
                    :disabled="loading"
                    :loading="loading"
                  >
                    Modify
                    <span slot="loader" class="custom-loader">
                      <v-icon light>loading</v-icon>
                    </span>
                  </v-btn>
                  <v-col
                    class="ml-n3"
                    col="12"
                    xl="5"
                    lg="5"
                    md="5"
                    sm="12"
                    xs="12"
                  >
                    <v-alert
                      v-show="showSucTips2"
                      dismissible
                      dense
                      prominent
                      type="success"
                      >password modified!</v-alert
                    >
                    <v-alert
                      v-show="showErrTips2"
                      dismissible
                      dense
                      prominent
                      type="error"
                      >something error!</v-alert
                    >
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
    commentDialog: false,
    ratingDialog: false,
    fileDialog: false,
    links: [
      ["mdi-information", "Basic information"],
      ["mdi-comment-quote-outline", "My Reviews"],
      ["mdi-lock-reset", "Modify password"],
    ],
    //面包屑导航
    items: [
      { text: "Home", disabled: false, href: "/" },
      { text: "Profile", disabled: false, href: "" },
    ],
    //右侧区域
    showArea1: true,
    showArea3: false,
    showArea4: false,
    //Area1
    displayName: "",
    rules: [
      (value) =>
        !value ||
        value.size < 2000000 ||
        "Avatar size should be less than 2 MB!",
    ],
    imageUrl: "",
    image: "",
    dialog: false,
    collection: ["My Favourites"],
    showSucTips: false,
    showErrTips: false,
    showSucTips2: false,
    showErrTips2: false,
    showEmailSuccess: false,
    discipline: "",
    disciplines: [
      "(Eng) Chem",
      "(Eng) Civ",
      "(Eng) ECE",
      "(Eng) EngSci",
      "(Eng) Indy",
      "(Eng) MSE",
      "(Eng) Mech",
      "(Eng) Min",
      // "Finance",
      // "Accounting",
      // "Management",
      "Computer Science",
      "Rotman",
      "Economy",
      "Mathematics",
      "Statistical Science",
      "Psychology",
      "Others",
    ],
    //Area3
    // elevations: ['My Reviews'],
    //Area4
    newPassword: "",
    panel: [0, 1, 2],
  }),
  watch: {
    uploadloading(curval, oldval) {
      if (!curval) {
        this.dialog = false;
      }
    },
    loading(curval, oldval) {
      if (!curval) {
        this.showSucTips = true;
        setTimeout(() => (this.showSucTips = false), 4000);
        this.showSucTips2 = true;
        setTimeout(() => (this.showSucTips2 = false), 4000);
      }
    },
    verifyloading(curval, oldval) {
      if (!curval) {
        this.showEmailSuccess = true;
        setTimeout(() => (this.showEmailSuccess = false), 4000);
      }
    },
  },
  created() {
    if (this.userLoggedIn) {
      this.$store.dispatch("getUserProfile", {});
      this.displayName = this.$store.getters.userProfile.displayName;
      this.discipline = this.$store.getters.userProfile.discipline;
      // console.log(JSON.stringify(this.$store.getters.userProfile));
      //getdis
      this.$store.dispatch("getMyFav", {});
      //getMyFav
      this.$store.dispatch("getMyFav", {});
      // console.log(JSON.stringify(this.$store.getters.loadedFavs));
      //getMyRecords
      this.$store.dispatch("getMyRecords", {});
      this.$store.dispatch("getMyFiles", {});
      // console.log(JSON.stringify(this.$store.getters.loadedRecords));
    }
  },
  computed: {
    userInfo() {
      let userInfo =
        this.$store.getters.user != null
          ? this.$store.getters.user.email
          : "unknown";
      return userInfo;
    },
    userLoggedIn() {
      // console.log("this.$store.getters.user", this.$store.getters.user)
      return this.$store.getters.user != null;
    },
    emailVerified() {
      return this.$store.getters.userProfile.emailVerified;
    },
    getUserProfile() {
      return this.$store.getters.userProfile.photoURL != null;
    },
    getPhotoURL() {
      return this.$store.getters.userProfile.photoURL;
    },
    getSX() {
      let Abbreviations =
        this.$store.getters.user != null
          ? this.$store.getters.user.email.substr(0, 1).toUpperCase()
          : "unknown";
      return Abbreviations;
    },
    loading() {
      return this.$store.getters.saveloading;
    },
    uploadloading() {
      return this.$store.getters.uploadloading;
    },
    verifyloading() {
      return this.$store.getters.verifyloading;
    },
    getMyFav() {
      return this.$store.getters.loadedFavs;
    },
    getMyFavLength() {
      return this.$store.getters.loadedFavs.length - 1;
    },
    getMyRecords() {
      return this.$store.getters.loadedRecords;
    },
    getMyReviews() {
      return this.$store.getters.loadedRecords.filter((record) => {
        return record.comment != "";
      });
    },
    getMyRatings() {
      return this.$store.getters.loadedRecords.filter((record) => {
        return record.comment == "";
      });
    },
    getMyFiles() {
      return this.$store.getters.loadedFiles;
    },
  },
  methods: {
    logout() {
      //清除vuex数据 跳转首页
      this.$store.dispatch("logout", {});
      // did not clear cookies!!!
      if (this.$route.path == "/") {
        this.$router.go(0);
      } else {
        this.$router.replace("/");
      }
    },
    onclickoptions(option) {
      this.plist = [];
      switch (option) {
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
      if (filename.lastIndexOf(".") <= 0) {
        return alert("Please add a valid file!");
      }
      // turn binary file to string value
      const fileReader = new FileReader();
      fileReader.addEventListener(
        "load",
        () =>
          // result is the base 64 string. imageURL can preview with this
          (this.imageUrl = fileReader.result)
      );
      fileReader.readAsDataURL(file);

      // store binary file
      this.image = file;
      // refresh avatar
      this.$store.dispatch("updatePhoto", { photoURL: this.image });
    },
    updateProfile() {
      this.$store.dispatch("updateProfile", { displayName: this.displayName });
    },
    updateDiscipline() {
      this.$store.dispatch("updateDiscipline", this.discipline);
    },
    modifyPassword() {
      this.$store.dispatch("updatePassword", this.newPassword);
    },
    navToRate(item) {
      // console.log(item);return
      this.$router.replace("/course/" + item);
    },
    navToAddRating(classname){
      this.$router.push("/addRating/" + classname)
    },
    verify() {
      this.$store.dispatch("sendEmailVerification", {});
    },
    deleteComment(classname) {
      this.commentDialog = false;
      this.$store.dispatch("deleteComment", {
        className: classname,
      });
    },
    deleteRatings(classname) {
      this.ratingDialog = false;
      this.$store.dispatch("deleteRating", {
        className: classname,
      });
    },
    deleteFile(index, classname) {
      this.fileDialog = false;
      this.$store.dispatch("deleteFile", {
        index: index,
        className: classname,
      });
    }
  },
};
</script>