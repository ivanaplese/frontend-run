import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBj2IelffGI6KRcpBzObf0oWmiB252nm_o",
    authDomain: "run-9c490.firebaseapp.com",
    projectId: "run-9c490",
    storageBucket: "run-9c490.appspot.com",
    messagingSenderId: "608596850083",
    appId: "1:608596850083:web:7034386064e1d797d49616",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// export default {
//     firebase,
// };

export { app, auth, db };