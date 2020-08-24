import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth'


const config = {
    apiKey: "AIzaSyB9OBm-j62frEd7qY8_2tDjekqNdiSOyEA",
    authDomain: "social-c0aa9.firebaseapp.com",
    databaseURL: "https://social-c0aa9.firebaseio.com",
    projectId: "social-c0aa9",
    storageBucket: "social-c0aa9.appspot.com",
    messagingSenderId: "811649540102",
    appId: "1:811649540102:web:75b733a6517a4e4be9a387"
};


const app = firebase.initializeApp(config)
app.firestore()

const storage = app.storage()
export {storage,   app as default}