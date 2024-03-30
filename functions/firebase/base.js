import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";
import { initializeAuth, getAuth } from 'firebase/auth';

// credentials for firebase
const apiKey="AIzaSyA2sHvoHBLu9ZiyxQzbU8C95VNRTA4NOE0"
const authDomain="kickinsights-ccc1e.firebaseapp.com"
const projectId="kickinsights-ccc1e"
//storageBucket="kickinsights-ccc1e.appspot.com"
const messagingSenderId="489611157233"
const appId="1:489611157233:web:f64d2707fcdb5f53db9350"
const measurementId="G-M3EX1V1R97"
const storageBucket="gs://kickinsights-ccc1e.appspot.com"

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