// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3okH8ynr6u9ookEoLh7hZyPTy4AiF4bA",
  authDomain: "crypto-sim-9b9c4.firebaseapp.com",
  projectId: "crypto-sim-9b9c4",
  storageBucket: "crypto-sim-9b9c4.appspot.com",
  messagingSenderId: "946777266166",
  appId: "1:946777266166:web:c7196817603253eee2d9d7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };