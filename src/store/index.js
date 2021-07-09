import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import createPersistedState from "vuex-persistedstate";


Vue.use(Vuex)

export const store = new Vuex.Store({
  // remember states: 这样user不会被page reload清楚掉
  // https://stackoverflow.com/questions/43027499/vuex-state-on-page-refresh
  plugins: [createPersistedState()],

  // stored data
  state: {
    loadedfileUploads:[],
    loadedRatings: [],
    loadedFavs: [],
    loadedFav: false,
    loadedRecords: [],
    loadedComments: [],
    user: null, // default: no user
    signLoading: false,
    saveLoading: false,
    uploadLoading: false,
    verifyLoading: false,
    loading: false,
    error: null,
    loadedcurrentUploads: 1,
    userProfile: []
  },
  // mutate state
  // called by commit "actions" part of this same file
  mutations: {
    reset (state) {
      state.signLoading = false;
      state.saveLoading = false;
      state.uploadLoading = false;
      state.verifyLoading = false;
      state.loading = false;
      state.error = null
    },
    setLoadedfileUploads (state, payload) {
      state.loadedfileUploads = payload
    },
    setLoadedRatings (state, payload){
      state.loadedRatings = payload
    },
    setLoadedFavs (state, payload){
      state.loadedFavs = payload
    },
    setLoadedFav (state, payload){
      state.loadedFav = payload
    },
    setLoadedRecords (state, payload){
      state.loadedRecords = payload
    },
    setLoadedComments (state, payload){
      state.loadedComments = payload
    },
    createfileUpload (state, payload) {
      state.loadedfileUploads.push(payload)
    },
    addRating (state, payload) {
      state.loadedRatings.push(payload)
    },
    addComment (state, payload) {
      state.loadedComments.push(payload)
    },
    setUserProfile (state, payload) {
      state.userProfile = payload
    },
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setSignLoading (state, payload) {
      state.signLoading = payload
    },
    setSaveLoading (state, payload) {
      state.saveLoading = payload
    },
    setUploadLoading (state, payload) {
      state.uploadLoading = payload
    },
    setVerifyLoading (state, payload) {
      state.verifyLoading = payload
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
    loadfileUploads ({commit}, payload) {
      commit('setLoading', true)
      // reach out to the fileUpload node
      // on('value'): listen to any value changes and get push notifications
      // once('value'): get the snapshot once
      firebase.database().ref(payload).child('files').once('value')
        .then((data) => {
          const fileUploads = []
          const obj = data.val() // .val() will get you the value of the response
          // data.val is an object, not an array
          // The "let" statement declares a block-scoped local variable, optionally initializing it to a value.
          // loop through the object, same as for(key in obj), but limit key to block scope by "let"
          for (let key in obj) {
            fileUploads.push({
              id: key,
              type: obj[key].type,
              // description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date,
              filename: obj[key].filename
              // creatorId: obj[key].creatorId
            })
          }
          // commit('setLoading', false)
          commit('reset');
        })
        .catch(
          (error) => {
            console.log(error)
            // commit('setLoading', false)
            commit('reset');
          }
        )
    },
    loadRatings ({commit}, payload) {
      commit('setLoading', true)
      // reach out to the fileUpload node
      // on('value'): listen to any value changes and get push notifications
      // once('value'): get the snapshot once
      firebase.database().ref(payload).child('rating').once('value')
        .then((data) => {
          const fileUploads = []
          const obj = data.val() // .val() will get you the value of the response
          // data.val is an object, not an array
          // The "let" statement declares a block-scoped local variable, optionally initializing it to a value.
          // loop through the object, same as for(key in obj), but limit key to block scope by "let"
          for (let key in obj) {
            fileUploads.push({
              id: key,
              comment: obj[key].comment,
              usefulness: obj[key].usefulness,
              rate: obj[key].rate,
              time: obj[key].time,
              user: obj[key].user
            })
          }
          commit('setLoadedRatings', fileUploads)
          // commit('setLoading', false)
          commit('reset');
        })
        .catch(
          (error) => {
            console.log(error)
            // commit('setLoading', false)
            commit('reset');
          }
        )
    },
    loadComments ({commit}, payload) {
      commit('setLoading', true)
      firebase.database().ref(payload.name).child('comment').once('value')
        .then((data) => {
          const fileUploads = []
          const obj1 = data.val() // .val() will get you the value of the response

          var arr = [];
          for (var i in obj1) {
              arr.push([obj1[i],i]);
          };
          arr.reverse();
          var len = arr.length;
          var obj = {};
          for (var i = 0; i < len; i++) {
              obj[arr[i][1]] = arr[i][0];
          }
          
          const comment_per_page=6;
          //先组一个数组
          const mlist = [];
          let mkey = (payload.page-1)*comment_per_page;
          if(obj != null) {
            if((Object.keys(obj).length-mkey) < comment_per_page) {var limit = Object.keys(obj).length-mkey}else {var limit = comment_per_page}
            for(var i=0;i<limit;i++) {
              mlist.push(mkey+i);
            }
            for(var i=0;i<mlist.length;i++) {
              //根据payload.page 和  来决定输出  1=> 0-6 2=>6->12
              let key = Object.keys(obj)[mlist[i]];
              fileUploads.push({
                id: key,
                comment: obj[key].comment,
                time: obj[key].time,
                user: obj[key].user,
                rate: obj[key].rate,
                total: Object.keys(obj).length,
                pname: obj[key].pname,
                usefulness: obj[key].usefulness,
                show_name: obj[key].show_name,
                avatar: obj[key].avatar,
                displayname: obj[key].displayname,
                discipline: obj[key].discipline,
              })
            }
          }

          // console.log(Object.keys(obj).length);
          // for (let key in obj) {
          //   fileUploads.push({
          //     id: key,
          //     comment: obj[key].comment,
          //     time: obj[key].time,
          //     user: obj[key].user
          //   })
          // }
          commit('setLoadedComments', fileUploads)
          // commit('setLoading', false)
          commit('reset');
        })
        .catch(
          (error) => {
            console.log(error)
            // commit('setLoading', false)
            commit('reset');
          }
        )
    },
    createfileUpload ({commit, getters}, payload) {
      let imageUrl
      let key
      const classname = payload.classname
      const fileUpload = {
        type: payload.type,
        date: payload.date.toISOString(),
        // time_log: payload.time_log.toISOString(),
        user: payload.user,
        filename: payload.image.name,
        // description: payload.description,
        // classname: payload.classname
        // creatorId: getters.user.id
      }
      this.state.loadedcurrentUploads = 1;
      //************** STEP 1: ******************
      // push json information to database
      firebase.database().ref(classname).child('files').push(fileUpload)
        .then((data) => {
          key = data.key // data we get back from firebase contains the key of this object
          return key
        })
        //************** STEP 2 ******************
        // use store image into storage
        .then(key => {
          const filename = payload.image.name
          // const ext = filename.slice(filename.lastIndexOf('.'))
          // upload fire to the storage part of the firebase. for files we use put('xxx') to upload
          return firebase.storage().ref('fileUploads/' + classname + '/' + filename).put(payload.image)
          // return firebase.storage().ref('fileUploads/' + key + '.' + ext).put(payload.image)
        })
        // A promise is an object that may produce a single value some time in the future : either a resolved value, or a reason that it's not resolved
        // this step is needed to get DownloadURL?
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
          //************** STEP 3: ******************
          // update a node "fileUploads", child(key)
          return firebase.database().ref(classname).child('files').child(key).update({imageUrl: imageUrl})
        })
        // commit in local store
        //************** STEP 4: ******************
        .then(() => {
          commit('createfileUpload', {
            ...fileUpload,
            imageUrl: imageUrl,
            id: key
          })
          //此刻上传才完毕，需要告知前台 修改loadedcurrentUploads = 0
          this.state.loadedcurrentUploads = 0;
          // console.log(this.state.loadedcurrentUploads);
        })
        .catch((error) => {
          console.log(error)
        })
    },
    addRating ({commit, getters}, payload) {
      let key
      const classname = payload.classname
      var fileUpload;
      if("user" in payload){
        var fileUpload= {
          rate: payload.rate,
          user: payload.user,
          time: payload.time,
          time_log: payload.time_log.toISOString(),
          usefulness: payload.usefulness,
        }

      }else{
        var fileUpload= {
          rate: payload.rate,
          time: payload.time,
          time_log: payload.time_log.toISOString(),
          usefulness: payload.usefulness,
        }
      }
      
      
      // push json information to database
      firebase.database().ref(classname).child('rating').push(fileUpload)
        .then((data) => {
          key = data.key // data we get back from firebase contains the key of this object
          return key
        })
        // commit locally
        .then(() => {
          commit('addRating', {
            ...fileUpload,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    addComment ({commit, getters}, payload) {
      let key
      const classname = payload.classname
      if(payload.user) {
        var photoURL = firebase.auth().currentUser.photoURL ? firebase.auth().currentUser.photoURL : '';
        var displayname = firebase.auth().currentUser.displayName ? firebase.auth().currentUser.displayName :　firebase.auth().currentUser.email
        var discipline = payload.discipline;
        
      }else {
        var photoURL = "";
        var displayname = "";
        var discipline = payload.discipline;
      }
      const fileUpload = {
        user: payload.user,
        comment: payload.comment,
        rate: payload.rate,
        // time: payload.time.toISOString(),
        time: payload.time.toString(),
        time_log: payload.time_log.toISOString(),
        usefulness: payload.usefulness,
        pname: payload.pname, // prof's name
        show_name: payload.show_name,
        avatar: photoURL,
        displayname: displayname,
        discipline: discipline
      }
      // push json information to database
      firebase.database().ref(classname).child('comment').push(fileUpload)
        .then((data) => {
          key = data.key // data we get back from firebase contains the key of this object
          return key
        })
        // commit locally
        .then(() => {
          commit('addComment', {
            ...fileUpload,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
        if(payload.user) {
          //push user records
          let userRecords = {
            comment: payload.comment,
            pname: payload.pname,
            classname: payload.classname,
            rate: payload.rate,
            time: payload.time,
            usefulness: payload.usefulness,
            show_name: payload.show_name,
            avatar: firebase.auth().currentUser.photoURL,
            displayname: firebase.auth().currentUser.displayName,
            discipline: payload.discipline
          }
          const uid = this.state.userProfile.uid;
          // firebase.database().ref('user/-'+uid).child('fav').once('value')
          firebase.database().ref('user/-' + uid).child('records').push(userRecords)
          .then((data) => {
            return data.key
          })
          .then(() => {
            // commit('addRating', {...userRecords,id:key})
            console.log('success');
          }).catch((error) => {
            console.log(error);
          })
        }
    },    
    signUserUp ({commit}, payload) {
      // loading
      commit('setSignLoading', true);
      commit('clearError');
      var actionCodeSettings = {
        url: 'https://uofthub.ca',
        // url: 'https://uofthub.ca/?email=' + firebase.auth().currentUser.email,
        // url: 'https://uofthub.firebaseapp.com//?email=' + firebase.auth().currentUser.email,
        handleCodeInApp: false,
        // dynamicLinkDomain: "example.page.link"
      };

      // firebase.auth().sendSignInLinkToEmail(payload.email, actionCodeSettings)
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(
          user => {
            commit('setSignLoading', false) // not loading anymore
            // commit('reset');
            // const newUser = {
            //   id: user.uid,
            //   registeredfileUploads: []
            // }

            //设置用户名为邮箱前缀
            console.log(payload.email.split("@")[0])
            var user1 = firebase.auth().currentUser;
            user1.updateProfile({
              displayName: payload.email.split("@")[0]
              // photoURL: user.photoURL
            })
            
            firebase.auth().currentUser.sendEmailVerification(actionCodeSettings)
            console.log(user1)
            console.log(user)
            //设置discipline！
            // dispatch('updateDiscipline', payload.discipline)
            const uid = user1.uid;
            firebase.database().ref('user/-'+uid).child('discipline').set(payload.discipline)
            
          }
        )
        .catch(
          error => {
            // commit('setSignLoading', false) // not loading anymore
            commit('reset');
            commit('setError', error) // saves the error
            console.log(error)
          }
        )
    },

    // signin有漏洞，以后改！
    signUserIn ({commit}, payload) {
      commit('setSignLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            if(user.user.emailVerified==false){
              firebase.auth().signOut()
              console.log("Email not verified")
              commit('setError', Error("Email not verified, please check your junk box for the link"))
              commit('setSignLoading', false)
              // commit('reset');
            }
            else{
              const newUser = {
                id: user.user.uid,
                registeredfileUploads: [],
                email: payload.email
              }
              commit('setUser', newUser)
              // commit('setSignLoading', false)
              commit('reset');
            }
          }
        )
        .catch(
          error => {
            // commit('setSignLoading', false)
            commit('reset');
            commit('setError', error)
            console.log(error)
          }
        )
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {id: payload.uid, registeredfileUploads: []})
    },
    getUserProfile ({commit}) {
      firebase.auth().onAuthStateChanged((user) => {
        // console.log(JSON.stringify(user));
        if (user) {
          const uid = this.state.userProfile.uid;
          // const discipline = firebase.database().ref('user/-'+ uid).child('discipline').once('value');
          firebase.database().ref('user/-'+ uid).child('discipline').once('value')
          .then((data) => {
            const discipline = data.val();
            var profile = {
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL,
              email: user.email,
              emailVerified: user.emailVerified,
              discipline: discipline
            }
            commit('setUserProfile', profile)
          })
        } else {
          // User is signed out
          // ...
        }
      });
    },
    sendEmailVerification({commit}, payload) {
      commit('setVerifyLoading', true);
      firebase.auth().currentUser.sendEmailVerification()
      .then(() => {
        // Email verification sent!
        // ...
        // commit('setVerifyLoading', false);
        commit('reset');
      }).catch((error) => {
        console.log(error);
        // commit('setVerifyLoading', false);
        commit('reset');
      });
    },
    //改 user name
    updateProfile ({commit}, payload) {
      commit('setSaveLoading', true);
      const user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: payload.displayName,
        // photoURL: user.photoURL
      }).then(() => {
        var profile = {
          displayName: payload.displayName,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
        }
        commit('setUserProfile', profile)
        commit('setSaveLoading', false)
        commit('reset');
      })
      .catch((error) => {
        commit('setSaveLoading', false)
        commit('reset');
        console.log(error)
      }); 
    },



    // 改 discipline
    updateDiscipline ({commit}, payload) {
      commit('setSaveLoading', true);
      const user = firebase.auth().currentUser;
      const uid = this.state.userProfile.uid;
      firebase.database().ref('user/-'+uid).child('discipline').set(payload)
      .then((data) => {
        // ...
        var profile = {
          displayName: this.state.userProfile.displayName,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
          discipline: payload,
        }
        commit('setUserProfile', profile)
        commit('setSaveLoading', false)
      }).catch((error) => {
        // commit('setSaveLoading', false)
        commit('reset');
        console.log(error)
      }); 
    },



    //上传用户图片
    updatePhoto ({commit}, payload) {
      commit('setUploadLoading', true);
      let imageUrl;
      const user = firebase.auth().currentUser;
      const filename = payload.photoURL.name
      firebase.storage().ref('fileUploads/AVATAR/' + filename).put(payload.photoURL)
      .then(snapshot => {
        return new Promise((resolve, reject) => {
          snapshot.ref.getDownloadURL().then(url => {
            snapshot.downloadURL = url
            resolve(snapshot)
          })
        })
      }).then((snapshot) => {
        imageUrl = snapshot.downloadURL;
        return user.updateProfile({
          photoURL: imageUrl
        }).then(()=>{
          var profile = {
            photoURL: imageUrl
          }
          commit('setUserProfile', profile)
          // commit('setUploadLoading', false);
          commit('reset');
        })
      }).catch((error) => {
        console.log(error)
        // commit('setUploadLoading', false);
        commit('reset');
      }); 
    },
    logout ({commit}) {
      // commit('setSignLoading', false)
      commit('reset');
      firebase.auth().signOut()
      sessionStorage.clear()
      commit('setUser', null)
    },
    
    clearError ({commit}) {
      commit('clearError')
    },
    getMyFav({commit}) {
      const uid = this.state.userProfile.uid;
      firebase.database().ref('user/-'+uid).child('fav').once('value')
        .then((data) => {
          const favs = [];
          const obj = data.val()
          for (let key in obj) {
            favs.push({
              id: key,
              classname: obj[key].classname,
              time: obj[key].time,
            })
          }
          // return
          commit('setLoadedFavs', favs)
        }).catch((error) => {
          console.log(error);
        })
    },
    loadedFav({commit}, payload) {
      commit('setLoadedFav', false)
      const uid = this.state.userProfile.uid;
      firebase.database().ref('user/-'+uid).child('fav').once('value')
        .then((data) => {
          const obj = data.val()
          for (let key in obj) {
            if(obj[key].classname == payload) {
              commit('setLoadedFav', true)
            }
          }
        }).catch((error) => {
          console.log(error);
        })
    },
    addFav({commit}, payload) {
      if(payload.tag) {//添加数据
        const uid = this.state.userProfile.uid;
        const fav = {
          classname: payload.classname,
          time: payload.time
        }
        firebase.database().ref('user/-'+uid).child('fav').push(fav)
          .then((data) => {
            return data.key
          })
          .then(()=>{
            commit('setLoadedFav', true)
          }).catch((error) => {
            console.log(error);
          })
      }else {//删除数据
        const uid = this.state.userProfile.uid;
        firebase.database().ref('user/-'+uid).child('fav').once('value')
        .then((data) => {
          const obj = data.val()
          for (let key in obj) {
            if(obj[key].classname == payload.classname) {
              // return firebase.database().ref('user/-'+uid).child('fav/'+key).remove();
              firebase.database().ref('user/-'+uid).child('fav/'+key).remove()
              .then((data) => {
                commit('setLoadedFav', false)
              }).catch((error) => {
                console.log(error);
              })
            }
          }
        }).catch((error) => {
          console.log(error);
        })
      }
      return 

    },
    getMyRecords({commit}) {
      const uid = this.state.userProfile.uid;
      firebase.database().ref('user/-'+uid).child('records').once('value')
        .then((data) => {
          const records = [];
          const obj = data.val()
          for (let key in obj) {
            records.push({
              id: key,
              comment: obj[key].comment,
              time: obj[key].time,
              rate: obj[key].rate,
              pname: obj[key].pname,
              usefulness: obj[key].usefulness
            })
          }
          // return
          commit('setLoadedRecords', records)
        }).catch((error) => {
          console.log(error);
        })
    },
    updatePassword({commit}, payload) {
      const user = firebase.auth().currentUser;
      const newPassword = payload;
      commit('setSaveLoading', true)
      user.updatePassword(newPassword).then(() => {
        // Update successful.
        // commit('setSaveLoading', false)
        commit('reset');
      }).catch((error) => {
        // An error ocurred
        // commit('setSaveLoading', false)
        commit('reset');
        console.log(error);
      });
    }
  },
  getters: {
    loadedfileUploads (state) {
      return state.loadedfileUploads
      // return state.loadedfileUploads.sort((fileUploadA, fileUploadB) => {
      //   return fileUploadA.date > fileUploadB.date
      // })
    },
    featuredfileUploads (state, getters) {
      return getters.loadedfileUploads.slice(0, 5)
    },
    loadedfileUpload (state) {
      return (fileUploadId) => {
        return state.loadedfileUploads.find((fileUpload) => {
          return fileUpload.id === fileUploadId
        })
      }
    },
    loadedcurrentUploads (state, getters) {
      return state.loadedcurrentUploads;
    },
    userProfile (state, getters) {
      return state.userProfile;
    },
    loadedRatings (state) {
      return state.loadedRatings
    },
    loadedFavs (state) {
      return state.loadedFavs
    }, 
    loadedFav (state) {
      return state.loadedFav
    }, 
    loadedRecords (state) {
      return state.loadedRecords
    }, 
    loadedComments (state) {
      return state.loadedComments
    },

    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    signloading (state) {
      return state.signLoading
    },
    saveloading (state) {
      return state.saveLoading
    },
    uploadloading (state) {
      return state.uploadLoading
    },
    verifyloading (state) {
      return state.verifyLoading
    },
    error (state) {
      return state.error
    }
  }
})
