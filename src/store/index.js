import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'


Vue.use(Vuex)

export const store = new Vuex.Store({
  // stored data
  state: {
    loadedMeetups:[{test1: "test1"}],


    user: null, // default: no user
    loading: false,
    error: null
  },
  // mutate state
  // called by commit "actions" part of this same file
  mutations: {
    setLoadedMeetups (state, payload) {
      state.loadedMeetups = payload
    },
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },

  // asynchronous tasks
  actions: {
    loadMeetups ({commit}) {
      commit('setLoading', true)
      // reach out to the meetup node
      // on('value'): listen to any value changes and get push notifications
      // once('value'): get the snapshot once
      firebase.database().ref('meetups').once('value')
        .then((data) => {
          console.log("loadedmeetupdata:", data.val())
          const meetups = []
          // .val() will get you the value of the response
          const obj = data.val()
          // data.val is an object, not an array
          // The "let" statement declares a block-scoped local variable, optionally initializing it to a value.
          // loop through the object, same as for(key in obj), but limit key to block scope by "let"
          for (let key in obj) {
            meetups.push({
              id: key,
              title: obj[key].title,
              // description: obj[key].description,
              // imageUrl: obj[key].imageUrl,
              // date: obj[key].date,
              // creatorId: obj[key].creatorId
            })
          }
          commit('setLoadedMeetups', meetups)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    createMeetup ({commit, getters}, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date.toISOString(),
        // creatorId: getters.user.id
      }
      let imageUrl
      let key
      firebase.database().ref('meetups').push(meetup)
        .then((data) => {
          key = data.key
          return key
        })
        .then(key => {
          const filename = payload.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          return firebase.storage().ref('meetups/' + key + '.' + ext).put(payload.image)
        })
        .then(snapshot => {
          return new Promise((resolve, reject) => {
            snapshot.ref.getDownloadURL().then(url => {
              snapshot.downloadURL = url
              resolve(snapshot)
            })
          })
        })
        .then((snapshot) => {
          imageUrl = snapshot.downloadURL
          return firebase.database().ref('meetups').child(key).update({imageUrl: imageUrl})
        })
        .then(() => {
          commit('createMeetup', {
            ...meetup,
            imageUrl: imageUrl,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // createMeetup ({commit, getters}, payload) {
    //   const meetup = {
    //     title: payload.title,
    //     location: payload.location,
    //     description: payload.description,
    //     date: payload.date.toISOString(),
    //     // creatorId: getters.user.id
    //   }
    //   let imageUrl
    //   let key
    //   //ref('node').push('adddata to list')
    //   // set: set a single object
    //   // update: update single item
    //   firebase.database().ref('meetups').push(meetup)
    //     .then((data) => {
    //       console.log(data)
    //       // data we get back from firebase contains the key of this object
    //       const key = data.key
    //       return key
    //       // commit('createMeetup', {
    //       //   ...meetup, // ... is spread operator to copy/contatenate array or object
    //       //   id: key
    //       // })
          
    //     })
    //     // use the key to upload image in firebase
    //     .then(key =>{
    //       // image is part of the payload we passed in
    //       // image is the file object
    //       const filename = payload.image.name
    //       const ext = filename.slice(filename.lastIndexOf('.'))
    //       // upload fire to the storage part of the firebase
    //       // for files we use put('xxx') to upload
    //       return firebase.storage().ref('meetups' + key + '.' + ext).put(payload.image)
    //     })
    //     .then(snapshot => {
    //       console.log("snapshot",snapshot)
    //       return new Promise((resolve, reject) => {
    //         snapshot.ref.getDownloadURL().then(url => {
    //           snapshot.downloadURL = url
    //           resolve(snapshot)
    //         })
    //       })
    //     })
    //     .then((snapshot) => {
    //       imageUrl = snapshot.downloadURL
    //       return firebase.database().ref('meetups').child(key).update({imageUrl: imageUrl})
    //     })
        
    //     // // Get imageURL from storate and update database with this download URL
    //     // .then(fileData => {
          
    //     //   imageUrl = fileData.metadata.downloadURLs[0]
    //     //   console.log("imageUrl", imageUrl)
    //     //   // child is for accessing a specific child
    //     //   // update a pair
    //     //   return firebase.database().ref('meetups').child(key).update({imageUrl: imageUrl})
    //     // })
    //     // commit in local store
    //     .then(() => {
    //         commit('createMeetup', {
    //         ...meetup, // ... is spread operator to copy/contatenate array or object
    //         imageUrl: imageUrl,
    //         id: key
    //       })
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //     })
    //   // Reach out to firebase and store it
    // },
    // signUserUp ({commit}, payload) {
    //   // loading
    //   commit('setLoading', true)
    //   commit('clearError')
    //   firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
    //     .then(
    //       user => {
            
    //         commit('setLoading', false) // not loading anymore
    //         const newUser = {
    //           id: user.uid,
    //           registeredMeetups: []
    //         }
    //         commit('setUser', newUser)
    //       }
    //     )
    //     .catch(
    //       error => {
    //         commit('setLoading', false) // not loading anymore
    //         commit('setError', error) // saves the error
    //         console.log(error)
    //       }
    //     )
    // },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registeredMeetups: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {id: payload.uid, registeredMeetups: []})
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    },
    clearError ({commit}) {
      commit('clearError')
    }
  },
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    featuredMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup (state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    },
    // get user that's stored in state
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
})
