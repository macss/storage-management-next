import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from 'firebase/auth'

/**
 * Firebase configuration
 */
const firebaseConfig = {
  apiKey: "AIzaSyAUNoXm-lyhy07QDFFe7FMKRe-boTy4gfs",
  authDomain: "storage-management-33cc6.firebaseapp.com",
  databaseURL: "https://storage-management-33cc6-default-rtdb.firebaseio.com",
  projectId: "storage-management-33cc6",
  storageBucket: "storage-management-33cc6.appspot.com",
  messagingSenderId: "73906943058",
  appId: "1:73906943058:web:6bbd1afa86d1edd14f1b8b",
  measurementId: "G-MNB59B8J77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

/**
 * Access to the app firestore instance
 */
export const firestore = getFirestore(app)

/**
 * Access to the app auth instance
 */
export const auth = getAuth(app)
