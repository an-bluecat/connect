
/*
This file is used for engineering courses
*/

import Vue from 'vue'
import Router from 'vue-router'
import courseInstance from './components/course/courseInstance.vue'
import project from './components/course/project.vue'
import rate from './components/course/rate.vue'
import About from './components/About.vue'
import courseList from './components/course/courseList';
import addRating from './components/addRating'
import addComment from './components/addComment'
import Welcome from './components/Welcome';
import CreatefileUpload from './components/fileUpload/CreatefileUpload'
import Signup from './components/User/Signup'
import Signin from './components/User/Signin'
import Profile from './components/User/Profile'
import ratings from './components/ratings'
import fileUploads from './components/fileUpload/fileUploads'


Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
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
          name: "course-details",
          component: courseInstance
        }
      ]
    },
    {
      path: '/',
      name: 'project',
      component: project,
      children:[
        {
          path:"project/:name",
          name: "descipline-details",
          component: project
        }
      ]
    },
    {
      path: '/',
      name: 'rate',
      component: rate,
      children:[
        {
          path:"rate/:name",
          name: "class-details",
          component: rate
        }
      ]
    },
    {
      path: '/addrating/:classname',
      name: 'addrating', 
      props: true,
      component: addRating
    },
    {
      path: '/addcomment/:classname',
      name: 'addcomment',
      props: true,
      component: addComment
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: About
    // },
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
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/course/:classname/ratings',
      name: 'ratings',
      props: true,
      component: ratings
    },
    {
      path: '/course/:classname/resources',
      name: 'resources',
      props: true,
      component: fileUploads
    }
    // redirect all the firebasestorage link to http:// firebasestorage.xxx.com
    // {
    //   path: 'https://firebasestorage.googleapis.com',
    //   beforeEnter() {location.href = 'https://firebasestorage.googleapis.com'}
    // }
  ]
})