// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAuth } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdsvSI-f68oOZfEvB3rLDP3UDLLGltYxc",
  authDomain: "redsocial2024-2.firebaseapp.com",
  projectId: "redsocial2024-2",
  storageBucket: "redsocial2024-2.appspot.com",
  messagingSenderId: "890361745035",
  appId: "1:890361745035:web:4e9e7564da6085225b8e8e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//export const auth = getAuth(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const db = getFirestore(app);