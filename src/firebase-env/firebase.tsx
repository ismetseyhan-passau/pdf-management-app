import {getAuth} from 'firebase/auth';

import {initializeApp} from 'firebase/app';

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
    apiKey: 'AIzaSyCwFl9NEkRw_W37z5P2SgUxAX7QwNZJR_o',
    authDomain: 'bmw-pdf-management.firebaseapp.com',
    databaseURL: 'your_database_url',
    projectId: 'bmw-pdf-management',
    storageBucket: 'bmw-pdf-management.appspot.com',
    messagingSenderId: '884960588233',
    appId: '1:884960588233:web:5518ac3562aba78fa8f818',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
