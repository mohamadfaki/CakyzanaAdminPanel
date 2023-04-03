import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCX2KFYohl1j-zySzLl03F2RRjMmnqgQ1I",
  authDomain: "cakyzana.firebaseapp.com",
  projectId: "cakyzana",
  storageBucket: "cakyzana.appspot.com",
  messagingSenderId: "544001275088",
  appId: "1:544001275088:web:c16027d8f4f4301a6a1ad5",
  measurementId: "G-M2CNXZ9KWG",
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
db.settings({ experimentalForceLongPolling: true, merge: true });

export { auth, db, storage, firebase };
