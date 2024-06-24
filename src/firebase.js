// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyAlm745Cru6wA8WV8b5dymb1ryEoR_yaH0",
  authDomain: "pick-3-81140.firebaseapp.com",
  databaseURL: "https://pick-3-81140-default-rtdb.firebaseio.com",
  projectId: "pick-3-81140",
  storageBucket: "pick-3-81140.appspot.com",
  messagingSenderId: "669416583311",
  appId: "1:669416583311:web:c5b999cbf67e43a39280fa",
  measurementId: "G-696D4Z593R"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default { app, analytics, db, storage };