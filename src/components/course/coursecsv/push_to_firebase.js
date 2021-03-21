// import * as firebase from 'firebase'
var firebase = require("firebase");

firebase.initializeApp({
    apiKey: 'AIzaSyCP9jwDxfUZFewPpqNTB0qEAJx6rVQayS0',
    authDomain: 'uofthub.firebaseapp.com',
    databaseURL: 'https://uofthub.firebaseio.com',
    projectId: 'uofthub',
    storageBucket: 'uofthub.appspot.com'
  });

firebase.auth().signInWithEmailAndPassword("jerryyu8883@gmail.com", "123456")
.then(
console.log("good")
)
.catch(
  error => {
    commit('setLoading', false)
    commit('setError', error)
    console.log(error)
  }
)

const fileUpload = {
  rate: "0",
  user: "user"
  // creatorId: getters.user.id
}
firebase.database().ref("ECE110").child('rating').once('value').then((data)=>{
  console.log(data)
}).catch((error)=>{
  console.log("error:",error)
})



// firebase.database().ref("coursetree").set(fileUpload).then((data) => {
//   key = data.key // data we get back from firebase contains the key of this object
//   // console.log(data)
//   console.log("data",data)
// }).catch((error) =>{
//   console.log("error",error)
// }

// )