<template>
  <div class="wrap" style="display: flex;align-items: center">
    <v-tabs
        fixed-tabs
        dark
        background-color="#343a40"
    >
      <v-tab @click="$router.push('/').catch(()=>{})">
        Home
      </v-tab>
      <!-- <v-tab @click="$router.push('/courses').catch(()=>{})">
          Courses
      </v-tab> -->
      <v-tab @click="$router.push('/about').catch(()=>{})">
        About
      </v-tab>
    </v-tabs>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-avatar  class="avatar" :color="showLoginInfo?'primary':'grey'" v-on="on">
          <v-icon dark v-if="!showLoginInfo"> mdi-account-circle</v-icon>
          <span v-else class="white--text headline">{{ getSX() }}</span>
        </v-avatar>
      </template>
      <v-list>
        <v-list-item v-if="showLoginInfo" @click="Logout">
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
        <v-list-item v-if="!showLoginInfo"  @click="$router.push('/signup')">
          <v-list-item-title>SignUp</v-list-item-title>
        </v-list-item>
        <v-list-item v-if="!showLoginInfo"  @click="signVisible=true">
          <v-list-item-title>SignIn</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-dialog
        v-model="signVisible"
        persistent
        width="300"
    >
      <v-card>
        <v-toolbar
            color="primary"
            dark
        >Sign In</v-toolbar>

        <signin></signin>
        <v-btn style="width: 100%;" @click="signVisible=false;showLoginInfo=true">
          cancel
        </v-btn>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
import Signup from './User/Signup'
import Signin from './User/Signin'

export default {
  components:{Signin},
  data() {
    return {
      signVisible: false,
      showLoginInfo: false,
      email: '',
    }
  },
  mounted() {
    this.getCookie();
  },
  methods: {
    getSX() {
      return this.email.substr(0, 1).toUpperCase();
    },
    Logout() {
      //清除vuex数据 跳转首页
      this.$store.dispatch('logout', {})
      this.clearCookie();
      this.$router.go(0);
    },
    //设置cookie
    setCookie(c_name, c_pwd, exdays) {
      var exdate = new Date(); //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
      //字符串拼接cookie
      window.document.cookie = "email" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie = "password" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
    },
    //读取cookie
    getCookie: function () {
      if (document.cookie.length > 0) {
        this.showLoginInfo = true;
        var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split('='); //再次切割
          //判断查找相对应的值
          if (arr2[0] == 'email') {
            this.email = arr2[1]; //保存到保存数据的地方
          } else if (arr2[0] == 'password') {
            this.password = arr2[1];
          }
        }
      }
    },
    //清除cookie
    clearCookie: function() {
      this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
    }
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.signVisible = false
        this.getCookie()
      }
    },
  },
  computed: {
    user() {
      console.log(this.$store.getters.user);
      return this.$store.getters.user
    },
  },

}
</script>

<style scoped>
.v-tabs {
  height: 50px;
}

.wrap .avatar {
  cursor: pointer;
  width: 40px !important;
  min-width: 40px !important;
  height: 40px !important;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50% !important;
  overflow: hidden;
}
</style>
