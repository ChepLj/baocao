// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase, ref } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA93WGno_ad7hnh3W-B4xwF1c7hHXwakBw",
  authDomain: "report-a1483.firebaseapp.com",
  projectId: "report-a1483",
  storageBucket: "report-a1483.appspot.com",
  messagingSenderId: "339216867134",
  appId: "1:339216867134:web:74177c77b5f5fcfe9f966f",
  databaseURL:
    "https://report-a1483-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const dbFT = getFirestore(app);
const dbRT = ref(getDatabase(app));
const providerFB = new FacebookAuthProvider();
const providerGG = new GoogleAuthProvider();

export { dbFT, auth, providerFB, providerGG, dbRT };
