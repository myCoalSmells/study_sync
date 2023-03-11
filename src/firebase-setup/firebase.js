// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbDYuiDIauEpGZ7FAWqqGWRyf2xPjCf3w",
  authDomain: "study-sync-23.firebaseapp.com",
  projectId: "study-sync-23",
  storageBucket: "study-sync-23.appspot.com",
  messagingSenderId: "260998556088",
  appId: "1:260998556088:web:30001060157b121856074d",
  measurementId: "G-XJKYC11SGP"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);

