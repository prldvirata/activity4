import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLKiA1T3ZieJgHDrIRWutHziqZjINkWtw",
  authDomain: "subsc-5c4ba.firebaseapp.com",
  projectId: "subsc-5c4ba",
  storageBucket: "subsc-5c4ba.firebasestorage.app",
  messagingSenderId: "733660298716",
  appId: "1:733660298716:web:110c2ff9ad90c2af36e319"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
export default db;
