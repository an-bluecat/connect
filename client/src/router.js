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
      name: 'main',
      component: courseList
    },
    {
      path: '/',
      name: 'course',
      component: Todos,
      children:[
        {
          path:"course/:name",
          name: "class-details",
          component: Todos
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})