import Vue from 'vue'
import Router from 'vue-router'
import courseInstance from './components/courseInstance.vue'
import About from './components/About.vue'
import courseList from './components/courseList';
import addRating from './components/addRating'
import Welcome from './components/Welcome';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Welcome
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
      path: '/',
      name: 'addrating',
      component: addRating,
      children:[
        {
          path:"addrating/:name",
          name: "class-rating",
          component: addRating
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/courses',
      name: 'courses', 
      component: courseList
    }
  ]
})