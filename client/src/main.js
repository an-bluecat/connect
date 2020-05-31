import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// import VeeValidate from 'vee-validate'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false


// Vue.use(VeeValidate)


new Vue({
  render: function (h) { return h(App) },
}).$mount('#app')
