import Vue from 'vue'
import Router from 'vue-router'
import courseInstance from './components/course/courseInstance.vue'
import About from './components/About.vue'
import courseList from './components/course/courseList';
import addRating from './components/addRating'
import Welcome from './components/Welcome';
import CreatefileUpload from './components/fileUpload/CreatefileUpload'
import Signup from './components/User/Signup'
import Signin from './components/User/Signin'
import ratings from './components/ratings'
import fileUploads from './components/fileUpload/fileUploads'
import fileUpload from './components/fileUpload/fileUpload'
import DiscussionBoard from './components/DiscussionBoard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Welcome
    },
    {
      path: '/course/:name',
      name: 'course',
      component: courseInstance,
      props: true,
      children:[
        {
          path:"",
          name: "board",
          component: DiscussionBoard
        },
        {
          path: "ratings",
          name: "ratings",
          component: addRating
        },
        {
          path: "resources",
          name: "resources",
          component: fileUploads
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
    },
    // redirect all the firebasestorage link to http:// firebasestorage.xxx.com
    // {
    //   path: 'https://firebasestorage.googleapis.com',
    //   beforeEnter() {location.href = 'https://firebasestorage.googleapis.com'}
    // }
  ]
})