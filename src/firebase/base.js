// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
  apiKey: "AIzaSyA2sHvoHBLu9ZiyxQzbU8C95VNRTA4NOE0",
  authDomain: "kickinsights-ccc1e.firebaseapp.com",
  projectId: "kickinsights-ccc1e",
  storageBucket: "kickinsights-ccc1e.appspot.com",
  messagingSenderId: "489611157233",
  appId: "1:489611157233:web:f64d2707fcdb5f53db9350",
  measurementId: "G-M3EX1V1R97"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;