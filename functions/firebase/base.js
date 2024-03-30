// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";
import { initializeAuth, getAuth } from 'firebase/auth';

// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

import { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, measurementId } from "../env.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
  measurementId: measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

// Initialize Authentication
const auth = initializeAuth(app, {
  // persistence means that the user will stay logged in even if the app is closed
  // https://firebase.google.com/docs/auth/web/auth-state-persistence
  // it is set to local by default, but we want to use async storage
  // if local is used, the user will be logged out when the app is closed
  // persistence: reactNativePersistence(ReactNativeAsyncStorage)
});

export default app;
export { storage, getAuth, auth};