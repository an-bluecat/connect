import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import courseInstance from './components/courseInstance.vue'
import About from './components/About.vue'
import courseList from './components/courseList';

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld,courseInstance
    // },

    {
      path: '/',
      name: 'main',
      component: courseList
    },
    {
      path: '/',
      name: 'course',
      component: courseInstance,
      children:[
        {
          path:"course/:name",
          name: "class-details",
          component: courseInstance
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