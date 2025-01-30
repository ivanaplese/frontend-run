import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
    getFirestore, //dohvaca bazu
    collection, //a ovu su sve fje koje omogucavaju manipulaciju firestor bazom
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    updateDoc,
    setDoc,
} from "firebase/firestore";

//storage moduli, omogućava pristup firebase storage servisu
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBj2IelffGI6KRcpBzObf0oWmiB252nm_o",
    authDomain: "run-9c490.firebaseapp.com",
    projectId: "run-9c490",
    storageBucket: "run-9c490.appspot.com",
    messagingSenderId: "608596850083",
    appId: "1:608596850083:web:7034386064e1d797d49616",
};
//konfiguracija

//inicijalizacija
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {
    app,
    auth,
    db,
    collection,
    addDoc,
    getDocs,
    storage,
    deleteDoc,
    ref,
    uploadBytes,
    getDownloadURL,
    setDoc,
    doc,
    updateDoc,
};