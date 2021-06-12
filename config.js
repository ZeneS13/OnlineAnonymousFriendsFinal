import  firebase from 'firebase'
require('@firebase/firestore')
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAzzr9m0DhtgR8YMTu-tAZxjPUqyo0wlF4",
    authDomain: "anonymous-friends-c11b2.firebaseapp.com",
    projectId: "anonymous-friends-c11b2",
    storageBucket: "anonymous-friends-c11b2.appspot.com",
    messagingSenderId: "507608069624",
    appId: "1:507608069624:web:d3d1bc2befc221aac8920d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db= firebase.firestore()
export default db
