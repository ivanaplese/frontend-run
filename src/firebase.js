import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBj2IelffGI6KRcpBzObf0oWmiB252nm_o",
    authDomain: "run-9c490.firebaseapp.com",
    projectId: "run-9c490",
    storageBucket: "run-9c490.appspot.com",
    messagingSenderId: "608596850083",
    appId: "1:608596850083:web:7034386064e1d797d49616",
};


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
    doc,
};