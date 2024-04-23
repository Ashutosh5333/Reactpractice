// import React, { useEffect } from 'react';
// import firebase from 'firebase/app';
// import 'firebase/messaging';


// const Pushnotification = () => {
//     useEffect(() => {
//         const initializeFirebase = () => {
//             const firebaseConfig = {
//                 apiKey: "AIzaSyByNhK0Y6f7SGBCCF-MWH8OJY_0-IT1JrM",
//                 authDomain: "react-auth-a65ef.firebaseapp.com",
//                 projectId: "react-auth-a65ef",
//                 storageBucket: "react-auth-a65ef.appspot.com",
//                 messagingSenderId: "265628479670",
//                 appId: "1:265628479670:web:61e0df6a341824b33b7617",
//                 measurementId: "G-28KMX3M0X9"
//               };
//           firebase.initializeApp(firebaseConfig);
//           const messaging = firebase.messaging();
    
//           messaging
//             .requestPermission()
//             .then(() => {
//               console.log('Notification permission granted.');
//               return messaging.getToken();
//             })
//             .then((token) => {
//               console.log('FCM Token:', token);
//               // Send this token to your server to send notifications to this device
//             })
//             .catch((error) => {
//               console.error('Error in getting FCM token:', error);
//             });
    
//           messaging.onMessage((payload) => {
//             console.log('Message received:', payload);
//             // Handle the received message (e.g., display a notification)
//           });
    
//           messaging.onBackgroundMessage((payload) => {
//             console.log('Background message received:', payload);
//             // Handle background message (optional, if needed)
//           });
//         };
    
//         initializeFirebase();
//       }, []);

//   return (
//     <div>Pushnotification</div>
//   )
// }

// export default Pushnotification