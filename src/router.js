import Vue from 'vue'
import Router from 'vue-router'
import courseInstance from './components/courseInstance.vue'
import About from './components/About.vue'
import courseList from './components/courseList';
import addRating from './components/addRating'
import Welcome from './components/Welcome';
import CreatefileUpload from './components/Meetup/CreatefileUpload'
import Signup from './components/User/Signup'
import Signin from './components/User/Signin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Welcome
    },
    // {
    //   path: '/',
    //   name: 'course',
    //   component: courseInstance,
    //   children:[
    //     {
    //       path:"course/:name",
    //       name: "class-details",
    //       component: courseInstance
    //     }
    //   ]
    // },
    // {
    //   path: '/',
    //   name: 'addrating',
    //   component: addRating,
    //   children:[
    //     {
    //       path:"addrating/:name",
    //       name: "class-rating",
    //       component: addRating
    //     }
    //   ]
    // },
    {
      path: '/addrating/:classname',
      name: 'addrating',
      props: true,
      component: addRating
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
    },
    {
      path: '/addfile/:classname',
      name: 'addfile',
      props: true,
      component: CreatefileUpload
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    }
    // redirect all the firebasestorage link to http:// firebasestorage.xxx.com
    // {
    //   path: 'https://firebasestorage.googleapis.com',
    //   beforeEnter() {location.href = 'https://firebasestorage.googleapis.com'}
    // }
  ]
})