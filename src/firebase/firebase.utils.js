import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDnJu4NjmKyooQ830tFPGzzhZ-IjvHEPz0",
    authDomain: "crwn-db-f79eb.firebaseapp.com",
    databaseURL: "https://crwn-db-f79eb.firebaseio.com",
    projectId: "crwn-db-f79eb",
    storageBucket: "crwn-db-f79eb.appspot.com",
    messagingSenderId: "533862916441",
    appId: "1:533862916441:web:1d721d16b4975c51886c48",
    measurementId: "G-3XK3MNXWEB"
};

export const createUserProfileDocument = async(userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapShot = await userRef.get()

    if (!snapShot.exists){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message)
        }

        return userRef;
    }
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;