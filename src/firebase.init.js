// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAvDohSBesKmEKUCn22GTf0D2bwXSJNEE4",
    authDomain: "ema-jhon-clone-3c58e.firebaseapp.com",
    projectId: "ema-jhon-clone-3c58e",
    storageBucket: "ema-jhon-clone-3c58e.appspot.com",
    messagingSenderId: "429359415439",
    appId: "1:429359415439:web:98765ae123edd56128f0fa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth