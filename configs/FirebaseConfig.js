// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqBTvJKfGbHjovAB2Ei-5fbBGYrwY4CI0",
  authDomain: "react-native-8fb04.firebaseapp.com",
  projectId: "react-native-8fb04",
  storageBucket: "react-native-8fb04.firebasestorage.app",
  messagingSenderId: "137727029922",
  appId: "1:137727029922:web:6c34d9c7e8449459feddfb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)