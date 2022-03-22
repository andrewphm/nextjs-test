// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_SEC,
  authDomain: 'margatsni-bd11b.firebaseapp.com',
  projectId: 'margatsni-bd11b',
  storageBucket: 'margatsni-bd11b.appspot.com',
  messagingSenderId: '884710935018',
  appId: '1:884710935018:web:7ab26d11526d961cfc8a93',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export default app
