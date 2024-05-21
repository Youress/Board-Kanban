import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyAkBxwOP9h29kDpJFTgaEoZQi1Ni4w1w4g",
  authDomain: "flowboard-12762.firebaseapp.com",
  projectId: "flowboard-12762",
  storageBucket: "flowboard-12762.appspot.com",
  messagingSenderId: "511177585481",
  appId: "1:511177585481:web:ce67cb2e2d3a057927a098"
};

// const app = initializeApp(firebaseConfig);
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const fbFunctions = getFunctions(app);

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === "development") {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, "localhost", 8082);
  connectFunctionsEmulator(fbFunctions, "localhost", 5002);
}