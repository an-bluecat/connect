
const axios = require('axios')

// axios.get('http://localhost:5000/mypage').then(res => {
//     console.log(res.data[0]["name"]);
// }).catch(err => {
//     console.log("fucked")
// })
axios.get('https://lexusfeedbacktestjerry.herokuapp.com/database').then(res => {
    console.log(res.data);
}).catch(err => {
    console.log("fucked")
})



// (function(res) {

// })();

/* function func(res) {

}

res => {

} */