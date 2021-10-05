<template>
  <v-app>
    <v-content>
      <section>
        <v-parallax src="@/assets/building.jpeg" style="height: 100vh">
          <v-layout column align-center justify-center class="white--text">
            <h1 class="white--text mb-2 display-1 text-xs-center" style="font-weight: 900; text-shadow: 3px 2px #000000">UofT Web Project Club</h1>
            <div class="white--text subheading mb-3 text-xs-center" style="font-weight: 900; text-shadow: 2px 2px #000000">Some brief description</div>
            <v-btn class="blue lighten-2 mt-5" dark large href="#desc">
              Get Started
            </v-btn>
          </v-layout>
        </v-parallax>
      </section>

      <section>
        <v-layout
          column
          wrap
          id="desc"
          class="my-5"
          align-center
          justify-center
          style="text-align: center; margin: auto; width: 50%"
        >
          <v-flex class="my-3">
            <div class="text-xs-center">
              <h2 class="headline">About Us</h2>
              <span class="subheading">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
              </span>
            </div>
          </v-flex>
        </v-layout>
      </section>

      <v-layout column align-center justify-center>
        <div class="headline mb-3" style="color: black; text-align: center">We are dropping cool news and opportunities on socials</div>
      </v-layout>
      <v-layout justify-center align-center style="height: 20vh">
          <a style="text-decoration: none" href="https://www.facebook.com/UofT-Web-Project-Club-UTWPC-104336745307815"><v-icon x-large dark style="color: #2B81D6; margin: 0 20px">mdi-facebook</v-icon></a>

          <a style="text-decoration: none" href="#"><v-icon x-large dark style="color: #2B81D6; margin: 0 20px">mdi-linkedin</v-icon></a>

          <a style="text-decoration: none" href="mailto:uofthub@gmail.com"><v-icon x-large dark style="color: #2B81D6; margin: 0 20px">mdi-email</v-icon></a>

        </v-layout>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  methods: {
    subscribe: function() {
      this.subscribed = !this.subscribed;
    }
  },

  computed: {
    imgHeight: function() {
      var offset = 320;
      console.log("new image height is " + (this.pageHeight - offset));
      return this.pageHeight - offset;
    }
  },

  mounted: function() {
    this.calculateHeight();
  }
};
</script>
<style>
html {
  scroll-behavior: smooth;
}
</style>
