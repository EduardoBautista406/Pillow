// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getDocs, getFirestore, collection, addDoc, doc, setDoc, getDoc, updateDoc} from 'firebase/firestore';
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';
import { FIREBASE_API } from "./Backend/api_key";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: FIREBASE_API,
  authDomain: "pillowcwru.firebaseapp.com",
  projectId: "pillowcwru",
  storageBucket: "pillowcwru.appspot.com",
  messagingSenderId: "725591702165",
  appId: "1:725591702165:web:fa259c3b90a290a690399c",
  measurementId: "G-CYPQJ3RSKV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

export { getDocs, ref, addDoc, setDoc, collection, getStorage, app, doc, getDoc, updateDoc, uploadString, getDownloadURL };

const analytics = getAnalytics(app);