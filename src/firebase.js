import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

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

export default {
    firebase,
};