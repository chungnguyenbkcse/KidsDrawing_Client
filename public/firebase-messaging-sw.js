importScripts('https://www.gstatic.com/firebasejs/7.14.6/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.6/firebase-messaging.js');

var firebaseConfig = {
    apiKey: "AIzaSyAoFE2h8YlF8c27FLuxXLID2R1N3uXEdp4",
    authDomain: "messaging-fcm-bc512.firebaseapp.com",
    projectId: "messaging-fcm-bc512",
    storageBucket: "messaging-fcm-bc512.appspot.com",
    messagingSenderId: "639481499969",
    appId: "1:639481499969:web:7503bd2b1cb5005cd451c0",
    measurementId: "G-Q7X6XDMNFS"
};

firebase.initializeApp(firebaseConfig);
const messaging=firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    console.log(payload);
    const notification=JSON.parse(payload);
    const notificationOption={
        body:notification.data.body,
        icon:notification.data.icon
    };
    return self.registration.showNotification(payload.data.title,notificationOption);
});