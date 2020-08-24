import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth'



const app = firebase.initializeApp(config)
app.firestore()

const storage = app.storage()
export {storage,   app as default}