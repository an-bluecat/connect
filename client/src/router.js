import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Todos from './components/Todos.vue'
import About from './components/About.vue'
import courseList from './components/courseList';

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld,Todos
    // },

    {
      path: '/',
      name: 'Todos',
      component: courseList
  },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})