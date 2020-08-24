import app from 'firebase';
import {storage} from './fbConfig';
import 'firebase/auth'


/*
const config = {
    apiKey: "AIzaSyB9OBm-j62frEd7qY8_2tDjekqNdiSOyEA",
    authDomain: "social-c0aa9.firebaseapp.com",
    databaseURL: "https://social-c0aa9.firebaseio.com",
    projectId: "social-c0aa9",
    storageBucket: "social-c0aa9.appspot.com",
    messagingSenderId: "811649540102",
    appId: "1:811649540102:web:75b733a6517a4e4be9a387"
}
*/

const auth = app.auth()
const  firestore = app.firestore()


class Services {
    login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password)
    }

    logout = () => {
        return auth.signOut()
    }

    async register(name, email, password) {
        await auth.createUserWithEmailAndPassword(email, password)
        return auth.currentUser.updateProfile({
            displayName: name
        })
    }


    isAutorized() {
        return new Promise(resolve => {
            auth.onAuthStateChanged(resolve)
        })
    }
    getCurrentUser() {return auth.currentUser}

    getCurrentUsername() {
        return auth.currentUser && auth.currentUser.displayName
    }

    getCurrentUserId() {
        return auth.currentUser && auth.currentUser.uid
    }


    getAdv = response => {
       firestore
            .collection('adv')
            .onSnapshot(serverUpdate => {
                const flats = serverUpdate.docs.map(doc => {
                    const data = doc.data();
                    data['id'] = doc.id;
                    return data;
                });
                response(flats)
            });
    };


    getAdvById = async id => {
         let data
         await  firestore
             .collection("adv")
             .doc(id)
             .get()
             .then(doc => {
                 if (doc.exists) {
                     data = doc.data()
                     data['id'] = doc.id;
                     return data
                 }
                 else {
                 //doc.data() will be undefined in this case
                   console.log("No such document!");
                 }
             })
             .catch(function (error) {
                 console.log("Error getting document:", error);
             });
         return data
     }


    getAdvByUserId = async userId => {
        let data=[]
        await  firestore
            .collection("adv")
            .where("userId", "==", userId)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    const id = doc.id
                    data.push({...doc.data(),id})
                });
            })

            .catch( error => {console.log("Error getting document:", error)})
        return data
    }

    addAdv = (imgUrl, address, price, priceHistory, phone, rooms, square, floor, description, date, userId) => {
         firestore
            .collection("adv")
            .add({imgUrl, address, price, priceHistory, phone, rooms, square, floor, description, date, userId});
    };


    addPriceHistory = (advId, priceHistory) => {
        firestore
            .collection("price_history")
            .add({
                advId: advId,
                priceHistory: priceHistory
            })
    }
    getPriceHistoryById = async id => {
        var data = null
        await  firestore
            .collection("price_history")
            .doc(id)
            .get()
            .then(doc => {
                if (doc.exists) {
                    data = doc.data()
                    data['id'] = doc.id;
                    console.log(data)
                    return data
                }
                else {
                    //doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            })
            .catch(function (error) {
                console.log("Error getting document:", error);
            });
        return data
    }

    updateAdv = (id, imgUrl, address, price, priceHistory, phone, rooms, square, floor, description, date, userId) => {
         firestore
            .collection("adv")
            .doc(id)
            .set({
                imgUrl: imgUrl,
                address: address,
                price: price,
                priceHistory: priceHistory,
                phone: phone,
                rooms: rooms,
                square: square,
                floor: floor,
                description: description,
                date: date,
                userId: userId
            }, {merge: true})
    }


    deleteAdv = id => {
         firestore
            .collection("adv")
            .doc(id).delete()
    }




    getFavoritesByUserId = async userId => {
        let data=[]
        await  firestore
            .collection("favorites")
            .where("userId", "==", userId)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    const id = doc.id
                    data.push({...doc.data()})
                });
            })
            .catch( error => {console.log("Error getting document:", error)})
        return data
    }

    isFollowedFlatIdByUserId = async (flatId,userId) => {
        let user
        await  firestore
            .collection("favorites")
            .where("flatId", "==", flatId)
            .where("userId","==", userId)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    const id = doc.id
                    user = {...doc.data(),id}
                })

            })
            .catch( error => {console.log("Error getting document:", error)})

        if (user && user.userId === userId) {
            return true
        } else {
            return false
        }
    }


    addFavoritesById = (userId, flatId) => {
        firestore
            .collection("favorites")
            .add({
                userId: userId,
                flatId: flatId
            })
    }

    removeFromFavoriteById =  (flatId, userId) => {
         firestore
            .collection("favorites")
            .where("flatId", "==", flatId)
            .where("userId","==", userId)
            .get()
             .then(function(querySnapshot) {
                 querySnapshot.forEach(function(doc) {
                     // doc.data() is never undefined for query doc snapshots
                     const id = doc.id
                     firestore
                         .collection("favorites")
                         .doc(id).delete()

                 })
             })
            .catch(function (error) {
                console.log("Error getting document:", error);
            });


    }
}

const api = new Services()
export default api







