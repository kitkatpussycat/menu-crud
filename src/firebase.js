// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase } from 'firebase/database';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyARE46ZThhorOBtqu_gGW6-avDDzLSRTWY',
  authDomain: 'menu-crud-firebase.firebaseapp.com',
  projectId: 'menu-crud-firebase',
  storageBucket: 'menu-crud-firebase.appspot.com',
  messagingSenderId: '799200718701',
  appId: '1:799200718701:web:1200e044a3c0b51ec57464',
  databaseURL:
    'https://menu-crud-firebase-default-rtdb.asia-southeast1.firebasedatabase.app',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
