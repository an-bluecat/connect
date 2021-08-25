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
    loadedTableData: [],
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
    userProfile: {},
    alertGiftCard: true,
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
    // for data table
    clearTableData (state){
      state.loadedTableData=[]
    },
    addTableData (state, payload){
      console.log("pushed")
      state.loadedTableData.push(payload)
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
    // only set the ones in payload!!! Don't overwrite
    setUserProfile (state, payload) {
      // console.log("payload",payload)
      for(let key in payload){
        // console.log(key)
        state.userProfile[key] = payload[key]
      }
    },
    // clear it
    cleanUserProfile(state){
      state.userProfile={};
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
    },
    setAlertState (state, payload) {
      state.alertGiftCard = payload
    }
  },

  // asynchronous tasks
  actions: {
    // fetch data for course table
    // loadTableData({commit,dispatch}, payload){
      
    // },

    // fetch data for individule course
    loadcourseRating({commit}, fullname){
      var courseCode=fullname.split("-")[0].trim();
      if(courseCode=="RSM100"){
        courseCode="\ufeffRSM100"
      }
      commit('setLoading', true)
      var usefulness=0
      var diff=0
      var num_rating=0


    // get usefulness, difficulty, rating
      firebase.database().ref("courses/"+courseCode).child('avg_use').once('value')
      .then((data) => {

          // if not in database ->no comment yet, push all 0s
          if(data.val()==null){
            var courseInfo={
              courseName: fullname,
              difficulty: 0,
              usefulness: 0,
              numRatings: 0
            }
            commit('addTableData', courseInfo)
          }
          // if in database, then continue to get the other specs
          else{
            usefulness = data.val().toFixed(1)
            firebase.database().ref("courses/"+courseCode).child('avg_diff').once('value')
            .then((data) => {
              diff = data.val().toFixed(1)
              // console.log("2")
              firebase.database().ref("courses/"+courseCode).child('num_rate').once('value')
              .then((data) => {
                  num_rating = data.val()
                  //create an object and append into loadedTableData
                  var courseInfo={
                    courseName: fullname,
                    difficulty: diff,
                    usefulness: usefulness,
                    numRatings: num_rating
                  }
                commit('addTableData', courseInfo)
                commit('reset')
              })
            })
          }
      })
      .catch(
        (error) => {
          console.log(error)
          // commit('setLoading', false)
          commit('reset');
        }
      )

      // push into course data
      


    },


    loadfileUploads ({commit}, payload) {
      commit('setLoading', true)
      // reach out to the fileUpload node
      // on('value'): listen to any value changes and get push notifications
      // once('value'): get the snapshot once
      firebase.database().ref("courses/"+payload).child('files').once('value')
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
          commit('setLoadedfileUploads', fileUploads)
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
      firebase.database().ref("courses/"+payload).child('rating').once('value')
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
      firebase.database().ref("courses/"+payload.name).child('comment').once('value')
        .then((data) => {
          const fileUploads = []
          const obj1 = data.val() // .val() will get you the value of the response

          // obj是最后用到的
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
          
          const comment_per_page=4;
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
      let uid = this.state.userProfile.uid
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
      firebase.database().ref("courses/"+classname).child('files').push(fileUpload)
        .then((data) => {
          key = data.key // data we get back from firebase contains the key of this object

          //add a copy of the data to user/files database
          firebase.database().ref('user/-' + uid).child('files').push(
            {...fileUpload, classname: classname, filekey: key}
          )
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
          return firebase.database().ref("courses/"+classname).child('files').child(key).update({imageUrl: imageUrl})
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

        })
        .catch((error) => {
          console.log(error)
        })
    },
    // add current rating to firebase, also recalculate the average
    // TODO: current design needs to be reordered???
    addRating ({commit, getters}, payload) {
      let key
      const classname = payload.classname
      var fileUpload,avg_use,avg_diff;
      var total_useRate=0;
      var total_diffRate=0;
      var ratings=0;
    
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
      //calculate the average rating 
      //load previous rating

     
      // reach out to the fileUpload node
      // on('value'): listen to any value changes and get push notifications
      // once('value'): get the snapshot once
      firebase.database().ref("courses/"+classname).child('rating').once('value')
        .then((data) => {

          const obj = data.val() // .val() will get you the value of the response
          // data.val is an object, not an array
          // The "let" statement declares a block-scoped local variable, optionally initializing it to a value.
          // loop through the object, same as for(key in obj), but limit key to block scope by "let"
          for (let key in obj) {
              total_useRate+=obj[key].usefulness;
              total_diffRate+=obj[key].rate;   
              ratings+=1; 
              console.log(obj[key]);
              console.log("total_diff: "+total_diffRate);
              console.log("ratings: "+ratings);
          }
          avg_use=total_useRate/ratings;
          avg_diff=total_diffRate/ratings;
          console.log("avg_use:"+ avg_use);     
          console.log("avg_diff:"+ avg_diff);   
        })
        .catch((error) => {
          console.log(error)
        }).then(()=>{
          // upload new calculated avg usefulness
          firebase.database().ref("courses/"+classname).child('avg_use').set(avg_use);
          //upload new calculated avg diff
          firebase.database().ref("courses/"+classname).child('avg_diff').set(avg_diff);
          //upload num of rating
          firebase.database().ref("courses/"+classname).child('num_rate').set(ratings);
        })
      
      
  
      
   
      // push json information to database
      firebase.database().ref("courses/"+classname).child('rating').push(fileUpload)
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
      firebase.database().ref("courses/"+classname).child('comment').push(fileUpload)
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

    },   
    addUserRatingRecord({commit},payload){
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
          // console.log('success');
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


            //设置用户名为邮箱前缀
            var user1 = firebase.auth().currentUser;
            user1.updateProfile({
              displayName: payload.email.split("@")[0]
              // photoURL: user.photoURL
            })
            
            firebase.auth().currentUser.sendEmailVerification(actionCodeSettings)
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
    signUserIn ({commit, dispatch}, payload) {
      const whitelist=["test2@mail.utoronto.ca"]
      commit('setSignLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            if(user.user.emailVerified==false && (whitelist.includes(payload.email)!=true)){
              firebase.auth().signOut()
              console.log("Email not verified")
              commit('setError', Error("Email not verified, please check your junk box for the link"))
              commit('setSignLoading', false)
              // commit('reset');
            }
            else{

              // email verified, continue signin
              const newUser = {
                id: user.user.uid,
                registeredfileUploads: [],
                email: payload.email
              }
              commit('setUser', newUser)
              

              // set the new profile
              dispatch('getUserProfile');

              commit('setSignLoading', false)
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

    googleSignin({commit, dispatch}, payload) {
      var provider = new firebase.auth.GoogleAuthProvider();
      // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
          /** @type {firebase.auth.OAuthCredential} */
          var credential = result.credential;

          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // console.log("user",user.uid)
          // console.log(token)


          const newUser = {
                id: user.uid,
                registeredfileUploads: [],
                email: user.email
              }
              commit('setUser', newUser)
             

              // get user profile
              // dispatch('getUserProfile');
              // console.log(this.state.userProfile.photoURL)

              commit('reset');
        }).then((result)=>{
          dispatch('getUserProfile');
        }).then((result)=>{
          // console.log("this.state.userProfile",this.state.userProfile)
        }).catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
    },

    autoSignIn ({commit}, payload) {
      commit('setUser', {id: payload.uid, registeredfileUploads: []})
    },

    // the first time getting and setting user profile 
    getUserProfile ({commit}) {
      firebase.auth().onAuthStateChanged((user) => {
      // const user = firebase.auth().currentUser;
        // console.log(JSON.stringify(user));
        if (user) {
          // const uid = this.state.userProfile.uid;
          const uid = user.uid;

          // get discipline
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
          // get graduation year
          firebase.database().ref('user/-'+ uid).child('gradyear').once('value')
          .then((data) => {
            const gradyear = data.val();
            var profile = {
              gradyear: gradyear
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
    deleteComment ({ commit }, payload) {
      const userEmail = this.state.user.email;
      const uid = this.state.userProfile.uid;
      const records = this.state.loadedRecords;
      records.splice(payload.commentIndex, 1)
      firebase.database().ref('user/-' + uid).child('records').set(records)
        .then((data) => {
          // return
          commit('setLoadedRecords', records)
        }).catch((error) => {
          console.log(error);
        })
      let obj1 = {};
      firebase.database().ref("courses/"+payload.className).child('comment').once('value')
        .then((data) => {
          obj1 = data.val() // .val() will get you the value of the response
          for (let i in obj1) {
            if (obj1[i].user.email === userEmail) {
              delete obj1[i];
            }
          };
        })
        .catch(
          (error) => {
              console.log(error)
              commit('reset');
            }
          )
      firebase.database().ref("courses/" + payload.className).child('comment').set(obj1)
        .then((data) => {
          commit('reset');
        })
        .catch((error) => {
          console.error(error)
          commit('reset');
        })
      let obj = {};
      let total_useRate = 0;
      let total_diffRate = 0;
      let ratings = 0;
      let avg_diff, avg_use;
      firebase.database().ref("courses/" + payload.className).child('rating').once('value')
        .then((data) => {
          obj = data.val()
          for (let key in obj) {
            if (obj[key].user.email === userEmail) {
              delete obj[key];
            } else {
              total_useRate += obj[key].usefulness;
              total_diffRate += obj[key].rate;
              ratings += 1;
              console.log(obj[key]);
              console.log("ratings: " + ratings);
            }
          };
          avg_use = total_useRate / ratings;
          avg_diff = total_diffRate / ratings;
          console.log("avg_use:" + avg_use);
          console.log("avg_diff:" + avg_diff);
        })
        .catch((error) => {
          console.log(error)
        })
        .then(() => {
          // upload new calculated avg usefulness
          firebase.database().ref("courses/" + payload.className).child('avg_use').set(avg_use);
          // //upload new calculated avg diff
          firebase.database().ref("courses/" + payload.className).child('avg_diff').set(avg_diff);
          // //upload num of rating
          firebase.database().ref("courses/" + payload.className).child('num_rate').set(ratings);
        })

        firebase.database().ref("courses/" + payload.className).child('rating').set(obj)
          .then((data) => {
            commit('reset');
          })
          .catch((error) => {
            console.error(error)
            commit('reset');
          })
    },



    // 改 discipline
    updateDiscipline ({commit}, payload) {
      commit('setSaveLoading', true);
      const user = firebase.auth().currentUser;
      const uid = this.state.userProfile.uid;
      // console.log("this.state.userProfile.uid in update discipline",this.state.userProfile.uid)
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

    // 改 discipline
    updateGradYear ({commit}, payload) {
      commit('setSaveLoading', true);
      const user = firebase.auth().currentUser;
      const uid = this.state.userProfile.uid;
      // console.log("this.state.userProfile.uid in update discipline",this.state.userProfile.uid)
      firebase.database().ref('user/-'+uid).child('gradyear').set(payload)
      .then((data) => {
        var profile = {
          gradyear: payload,
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
      commit('cleanUserProfile')


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
              classname: obj[key].classname,
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
    },
    setAlertState({commit}, payload) {
      return commit('setAlertState', payload)
    }
  },
  getters: {
    loadedTableData (state){
      return state.loadedTableData
    },
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
    },
    alertGiftCard(state) {
      return state.alertGiftCard
    }
  }
})
