import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAo1HEaanJL3p3mbn9i6Jn2IUhTwEJn4iA",
  authDomain: "vinculacion-d0dfd.firebaseapp.com",
  projectId: "vinculacion-d0dfd",
  storageBucket: "vinculacion-d0dfd.appspot.com",
  messagingSenderId: "419176336900",
  appId: "1:419176336900:web:221e6f06d59dbe95992f51",
  measurementId: "G-XDRKRS0V9X"
};


const app = initializeApp(firebaseConfig);


const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);


export { app, db, auth, analytics };