<template>
      <v-dialog
        v-model="signUpVisible"
        width="300"
    >
      <v-card>
        <v-toolbar
            color="primary"
            dark
        >Sign Up</v-toolbar>

        <signup></signup>
        <div class="link" @click="signUpVisible=false">sign in</div>
        <v-btn style="width: 100%;" @click="signUpVisible=false">
          cancel
        </v-btn>
      </v-card>
    </v-dialog>
</template>

<script>
import Signup from './Signup'
import Signin from './Signin'

export default {
    name: "SignupDialog",
    components:{Signin,Signup},
    data () {
      return {
        signUpVisible: true
      }
    },
    
  
  }
</script>
<style scoped lang="scss">
.wrap{
  width: 100%;
  height: auto;
  padding: 33px;
.row{
  margin: 0;
}
.btn{
  width: 100%;
}
}
</style>
