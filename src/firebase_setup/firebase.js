// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
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
export const analytics = getAnalytics(app);
export const db = getFirestore(app);