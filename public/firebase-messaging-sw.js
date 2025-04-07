
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyD_9kApMf_AotAlYwvSmgY_hd9cOaFsWx0",
    authDomain: "flow4life.firebaseapp.com",
    projectId: "flow4life",
    storageBucket: "flow4life.firebasestorage.app",
    messagingSenderId: "360337861795",
    appId: "1:360337861795:web:1eace881dd5ef5c0762316",
};


firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});