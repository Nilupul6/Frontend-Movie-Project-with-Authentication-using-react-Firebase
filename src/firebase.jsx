import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFIJZjmFSWj-VpdljrDNdORBPDxXEA_eU",
  authDomain: "react-movie-9ace7.firebaseapp.com",
  projectId: "react-movie-9ace7",
  storageBucket: "react-movie-9ace7.appspot.com",
  messagingSenderId: "242428331813",
  appId: "1:242428331813:web:3261cab7ed7e25ae6b7ccc"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);