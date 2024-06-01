// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDijOntkkkXZf-zCjpYCt5yUhFNyrIbfkk",
	authDomain: "vaya-69c29.firebaseapp.com",
	projectId: "vaya-69c29",
	storageBucket: "vaya-69c29.appspot.com",
	messagingSenderId: "985823838308",
	appId: "1:985823838308:web:f2305647686914a6ae9f71",
	measurementId: "G-MVQ3FV7P6Z",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
