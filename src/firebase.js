// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAoFE2h8YlF8c27FLuxXLID2R1N3uXEdp4",
    authDomain: "messaging-fcm-bc512.firebaseapp.com",
    projectId: "messaging-fcm-bc512",
    storageBucket: "messaging-fcm-bc512.appspot.com",
    messagingSenderId: "639481499969",
    appId: "1:639481499969:web:9ca3aab6356d862bd451c0",
    measurementId: "G-VSFDVEWR40"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);