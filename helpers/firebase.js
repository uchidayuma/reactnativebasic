// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEo0I-Ah50cZdbEt6Xjp89Mx7tuweu8rU",
  authDomain: "reactnative-demo-9c3b7.firebaseapp.com",
  projectId: "reactnative-demo-9c3b7",
  storageBucket: "reactnative-demo-9c3b7.appspot.com",
  messagingSenderId: "440016685283",
  appId: "1:440016685283:web:89f1340d504dc1484b9dd6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firestore = initializeFirestore(app, { experimentalForceLongPolling: true });
export const storage = getStorage(app);