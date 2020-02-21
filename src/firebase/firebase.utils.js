import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyA1y6hSSHbN-LP-0MnuJVyFUW92NrYD3O4",
    authDomain: "e-commerce-db-b5f5f.firebaseapp.com",
    databaseURL: "https://e-commerce-db-b5f5f.firebaseio.com",
    projectId: "e-commerce-db-b5f5f",
    storageBucket: "e-commerce-db-b5f5f.appspot.com",
    messagingSenderId: "362086655666",
    appId: "1:362086655666:web:f472a4a0841c50695acbab",
    measurementId: "G-VRXSEB4M2H"
  };

export const createUserProfileDocument = async( userAuth, additionalData) =>{
    if(!userAuth) return;

    const userRef= firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const { displayName, email } = userAuth;
        const createAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createAt,
                ...additionalData
            })
        }catch(error){
            console.log('error creating user', error.message);
        }
    }
    return userRef;
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;