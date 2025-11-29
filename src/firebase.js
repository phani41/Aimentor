import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
 apiKey: "AIzaSyDLW_tPe5jtHumb7o_8fK0JwwMsVDYy7jY",
  authDomain: "aimentor-e9edb.firebaseapp.com",
  projectId: "aimentor-e9edb",
  storageBucket: "aimentor-e9edb.firebasestorage.app",
  messagingSenderId: "43161610297",
  appId: "1:43161610297:web:ab893bc4a853b3803005e8",
  
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export { signInWithPopup, collection, addDoc, getDocs, query, orderBy, serverTimestamp };
