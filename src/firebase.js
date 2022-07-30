// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDFzSxsVL4hsZ6YEtUjkFflwdb9sVsuYy4",
  authDomain: "ecommerce-d068a.firebaseapp.com",
  projectId: "ecommerce-d068a",
  storageBucket: "ecommerce-d068a.appspot.com",
  messagingSenderId: "21240902588",
  appId: "1:21240902588:web:ceb1556736f73eec3931b9",
  measurementId: "G-P0QJYNV9XE"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
