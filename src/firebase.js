import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyAoFE2h8YlF8c27FLuxXLID2R1N3uXEdp4",
  authDomain: "messaging-fcm-bc512.firebaseapp.com",
  projectId: "messaging-fcm-bc512",
  storageBucket: "messaging-fcm-bc512.appspot.com",
  messagingSenderId: "639481499969",
  appId: "1:639481499969:web:7503bd2b1cb5005cd451c0",
  measurementId: "G-Q7X6XDMNFS"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase;