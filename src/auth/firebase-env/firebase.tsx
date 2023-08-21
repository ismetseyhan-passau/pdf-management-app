import {getAuth} from 'firebase/auth';

import {initializeApp} from 'firebase/app';
import {getFirestore} from "firebase/firestore";

/*
usage for .env.local file
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    //...
}*/

const firebaseConfig = {
    apiKey: "AIzaSyDHZ6tp9PJaBvSk_YmjfmeUX4KBjRrMfP0",
    authDomain: "bmw-pdf-management-5c264.firebaseapp.com",
    projectId: "bmw-pdf-management-5c264",
    storageBucket: "bmw-pdf-management-5c264.appspot.com",
    messagingSenderId: "112557768282",
    appId: "1:112557768282:web:c4129ea0f44d15473ba263",
    measurementId: "G-0HF2M27EFE"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
