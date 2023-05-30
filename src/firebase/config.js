import { initializeApp } from "firebase/app";
import { Timestamp, getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = 'API_KEY_IS_HERE';

//initialize Firebase
initializeApp(firebaseConfig);

//initialize Firestore and set the Timestamp
const db = getFirestore();
const timestamp = Timestamp;

//initialize Authentication
const auth = getAuth();

//initialize storage
const storage = getStorage();

export { db, timestamp, auth, storage }
