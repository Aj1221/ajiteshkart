import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAY1my1mb9THk5o4zUxcn4qhFmDuDkfLlc",
  authDomain: "ajiteshkart.firebaseapp.com",
  projectId: "ajiteshkart",
  storageBucket: "ajiteshkart.firebasestorage.app",
  messagingSenderId: "569348559018",
  appId: "1:569348559018:web:8f2bf22b71f47daeb480d3",
  measurementId: "G-MTJLBHEYQN"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
