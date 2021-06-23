<template>
  <v-card
    class="mx-auto mt-16"
    max-width="344"
    outlined
  >
    <v-sheet v-show="showLoginInfo">
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">
            Login Info
          </div>
          <v-list-item-title class="headline mb-1">
            {{email}}
          </v-list-item-title>
          <v-list-item-subtitle>Registered User</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-avatar tile size="80" color="indigo">
          <span class="white--text headline">{{getSX()}}</span>
        </v-list-item-avatar>
      </v-list-item>

      <v-card-actions>
        <v-btn outlined rounded text @click="Logout">
          LogOut
        </v-btn>
      </v-card-actions>
    </v-sheet>
    <v-sheet v-show="!showLoginInfo">
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">
            Login Info
          </div>
          <v-list-item-title class="headline mb-1">
            No User
          </v-list-item-title>
          <v-list-item-subtitle></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-avatar tile size="80" color="grey">
          <!-- <span class="white--text headline"></span> -->
        </v-list-item-avatar>
      </v-list-item>

      <v-card-actions>
        <v-btn outlined rounded text >
          <router-link to="/signup">
          Signup
          </router-link>
        </v-btn>
        <v-btn outlined rounded text>
          <router-link to="/signin">
          Signin
          </router-link>
        </v-btn>
      </v-card-actions>
    </v-sheet>
  </v-card>
  
</template>

<script>
import Signup from './User/Signup'
import Signin from './User/Signin'
  export default {
    components: {
      Signup,
      Signin,
    },
    data() {
      return {
        //登录信息
        showLoginInfo: false,
        email: '',
      }
    },
    created() {
      // const name = this.$store.getters.user;
      // if(name) {
      //   this.showLoginInfo = true;
      //   this.email = name.email;
      // }
    },
    mounted() {
      this.getCookie();
    },
    methods: {
      getSX() {
        return this.email.substr(0,1).toUpperCase();
      },
      Logout() {
        //清除vuex数据 跳转首页
        this.$store.dispatch('logout', {})
        this.clearCookie();
        this.$router.go(0);
      },
      //读取cookie
      getCookie: function() {
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
      //设置cookie
      setCookie(c_name, c_pwd, exdays) {
          var exdate = new Date(); //获取时间
          exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
          //字符串拼接cookie
          window.document.cookie = "email" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
          window.document.cookie = "password" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
      },
      //清除cookie
      clearCookie: function() {
          this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
      }
    },
    // watch: {
    //   // redirect if user sign in
    //   user (value) {
    //     if (value == null) {
    //       this.$router.go(0);
    //     }
    //   }
    // },
    // computed: {
    //   user () {
    //     return this.$store.getters.user
    //   },
    // }
  }
</script>