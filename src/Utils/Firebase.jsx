import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD_9kApMf_AotAlYwvSmgY_hd9cOaFsWx0",
  authDomain: "flow4life.firebaseapp.com",
  projectId: "flow4life",
  storageBucket: "flow4life.firebasestorage.app",
  messagingSenderId: "360337861795",
  appId: "1:360337861795:web:1eace881dd5ef5c0762316",
  measurementId: "G-RCKYFN5NER",
  databaseURL:"https://flow4life-default-rtdb.firebaseio.com/"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const database = getDatabase(app);


