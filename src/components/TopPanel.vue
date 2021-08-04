<template>
  <div class="wrap" style="display: flex;align-items: center">
    <div style="flex: 1"></div>
<!--    <v-tabs-->
<!--        fixed-tabs-->
<!--        dark-->
<!--        background-color="#343a40"-->
<!--    >-->
<!--      <v-tab @click="$router.push('/').catch(()=>{})">-->
<!--        Home-->
<!--      </v-tab>-->
<!--      &lt;!&ndash; <v-tab @click="$router.push('/courses').catch(()=>{})">-->
<!--          Courses-->
<!--      </v-tab> &ndash;&gt;-->
<!--      <v-tab @click="$router.push('/about').catch(()=>{})">-->
<!--        About-->
<!--      </v-tab>-->
<!--    </v-tabs>-->
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-avatar  class="avatar" :color="userLoggedIn ? 'primary':'grey'" v-on="on"
        @click="goProfile">
          <v-icon dark v-if="userLoggedIn==false"> mdi-account-circle</v-icon>
          <img v-else-if="photoURLExist" :src="getPhotoURL" alt="avatar">
          <span v-else class="white--text headline">{{ getSX() }}</span>
        </v-avatar>
      </template>
      <v-list v-if="!userLoggedIn">
        <!-- <v-list-item v-if="userLoggedIn" @click="goProfile">
          <v-list-item-title>View profile</v-list-item-title>
        </v-list-item>
        <v-list-item v-if="userLoggedIn" @click="Logout">
          <v-list-item-title>Log out</v-list-item-title>
        </v-list-item> -->
        <v-list-item v-if="!userLoggedIn"  @click="signupVisible=true">
          <v-list-item-title>Sign up</v-list-item-title>
        </v-list-item>
        <v-list-item v-if="!userLoggedIn"  @click="signInVisible=true">
          <v-list-item-title>Sign in</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <!-- 登录 -->
    <v-dialog
        v-model="signInVisible"
        width="300"
    >
      <v-card>
        <v-toolbar
            color="primary"
            dark
        >Sign In</v-toolbar>

        <signin></signin>
        <!-- switch to sign up -->
        <div class="link text-decoration-underline" @click="signupClicked">sign up</div>
        <v-btn style="width: 100%;"  @click="signInVisible=false;">
          cancel
        </v-btn>
      </v-card>
    </v-dialog>

    <!-- 注册 -->
    <v-dialog
        v-model="signupVisible"
        width="300"
    >
      <v-card>
        <v-toolbar
            color="primary"
            dark
        >Sign Up</v-toolbar>

        <signup></signup>

        <!-- switch to sign in -->
        <div class="link my-2 text-decoration-underline" @click="signinClicked">Log In</div>
        <v-btn style="width: 100%;" @click="signupVisible=false">
          cancel
        </v-btn>
      </v-card>
    </v-dialog>

    <v-dialog
        v-model="disciplineVisible"
        width="300"
    >
      <v-card>
        <v-toolbar
            color="primary"
            dark
        >Specify Discipline</v-toolbar>

        <writeDiscipline></writeDiscipline>
        <v-btn style="width: 100%;" @click="disciplineVisible=false">
          cancel
        </v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Signup from './User/Signup'
import Signin from './User/Signin'
import writeDiscipline from './User/writeDiscipline'


export default {
  components:{Signin,Signup, writeDiscipline},
  data() {
    return {
      signInVisible: false,
      signupVisible: false,
      disciplineVisible: false,
      // showLoginInfo: false,
      email: '',
    }
  },
  created() {
    if(this.userLoggedIn) {
      // this.signupVisible=false;
      this.getCookie();
      this.$store.dispatch('getUserProfile', {})
      // let discipline = this.$store.getters.userProfile.discipline
      if(this.$store.getters.userProfile.discipline==undefined || this.$store.getters.userProfile.gradyear==undefined){
          this.disciplineVisible=true
      }

    }else{
      if(this.$route.path == '/'){
        // this.signupVisible=true;
      }
    }
  },
  methods: {
    signupClicked() {
      this.signInVisible=false;
      this.signupVisible=true;
      this.$store.dispatch('clearError');
    },
    signinClicked() {
      this.signInVisible=true;
      this.signupVisible=false;
      this.$store.dispatch('clearError');
    },
    getSX() {
      return this.email.substr(0, 1).toUpperCase();
    },
    goProfile() {
      if(this.userLoggedIn){
        if(this.$route.path == '/profile') {
          this.$router.go(0);
        }else {
          this.$router.push("/profile");
        }
      }
    },
    Logout() {
      //清除vuex数据 跳转首页
      this.$store.dispatch('logout', {})
      this.clearCookie();
      if(this.$route.path == '/') {
        this.$router.go(0);
      }else {
        this.$router.replace("/");
      }
      
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
        // this.showLoginInfo = true;
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
    // 关注user，当user signin是自动取消signin框， 并且刷新
    user(value) {
      if (value !== null && value !== undefined) {
        this.signInVisible = false
        this.signupVisible =false
        this.$store.dispatch('getUserProfile', {})
        //不知道为什么需要刷新，以后改！！！
        this.$router.go()
        this.getCookie()
      }
    },

    //关注discipline和grad year选项，如果有了则马上turn off
    discipline(value) {
      if (value !== null && value !== undefined && this.gradyear!==null) {
        this.disciplineVisible=false
      }
    },
    gradyear(value) {
      if (value !== null && value !== undefined && this.discipline!==null) {
        this.disciplineVisible=false
      }
    }

  },
  computed: {
    user() {
      return this.$store.getters.user
    },
    discipline() {
      return this.$store.getters.userProfile.discipline
    },
    gradyear() {
      return this.$store.getters.userProfile.gradyear
    },
    userLoggedIn(){
      // console.log("this.$store.getters.user != null ",this.$store.getters.user != null )
      return this.$store.getters.user != null ;
    },
    photoURLExist() {
      // console.log("this.$store.getters.userProfile.photoURL != null",this.$store.getters.userProfile.photoURL != null)
      return this.$store.getters.userProfile.photoURL!=null;
    },
    getPhotoURL() {
      // console.log("here",this.$store.getters.userProfile.photoURL)
      return this.$store.getters.userProfile.photoURL;
    },
  },

}
</script>

<style scoped>
.v-tabs {
  height: 50px;
}
.wrap{
  padding: 6px 24px;
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
.link{
  color: #0d47a1;
  cursor: pointer;
  padding: 0 30px 12px;
}
</style>
