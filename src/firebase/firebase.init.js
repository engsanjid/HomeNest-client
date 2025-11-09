
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyDntUCdUNTdpdh4vXQZOvW4C-6wJssDtrU",
  authDomain: "homenest-e6fc4.firebaseapp.com",
  projectId: "homenest-e6fc4",
  storageBucket: "homenest-e6fc4.firebasestorage.app",
  messagingSenderId: "757961937288",
  appId: "1:757961937288:web:a23868e573c114fa1aaa3d",
  measurementId: "G-359R90JNDE"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);


export default app;
