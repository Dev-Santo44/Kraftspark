import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyC7zN8d8YHJNxPx93bi7v_YQp_4IJztFfA",
    authDomain: "kraftspark-cb0d8.firebaseapp.com",
    projectId: "kraftspark-cb0d8",
    storageBucket: "kraftspark-cb0d8.firebasestorage.app",
    messagingSenderId: "291047627099",
    appId: "1:291047627099:web:bec3713ec5409aa279227e",
    measurementId: "G-CFDTPPF9Y8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app,{experimentalForceLongPolling: true});
