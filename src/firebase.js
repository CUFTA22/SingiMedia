import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDIpxMknLho96voSZJdAjVjCRXnKbIauog",
  authDomain: "singi-media.firebaseapp.com",
  databaseURL: "https://singi-media.firebaseio.com",
  projectId: "singi-media",
  storageBucket: "singi-media.appspot.com",
  messagingSenderId: "996840572723",
  appId: "1:996840572723:web:b678ba838aa8319e866046",
  measurementId: "G-2KQGFB1QS1",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export { db, auth, storage };
