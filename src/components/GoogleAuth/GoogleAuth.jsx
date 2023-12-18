import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBnCnXqQl_V_QzfHn5ZoUH7MsTyD4ti5E4",
  authDomain: "inhouse-c77d7.firebaseapp.com",
  projectId: "inhouse-c77d7",
  storageBucket: "inhouse-c77d7.appspot.com",
  messagingSenderId: "843304820458",
  appId: "1:843304820458:web:f7796a32eb99e728060193",
  measurementId: "G-FCKWPFSSY0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();

export {auth,provider};