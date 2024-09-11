
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyB76lWTuseKSDrp-hZekTup4nOOU3bYfVg",
  authDomain: "crm-system-b70fe.firebaseapp.com",
  projectId: "crm-system-b70fe",
  storageBucket: "crm-system-b70fe.appspot.com",
  messagingSenderId: "936707162662",
  appId: "1:936707162662:web:e92162edebc68566555ce7",
  measurementId: "G-YR0XBF6GC8"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore= getFirestore(app);
const storage= getStorage(app);
export {analytics,firestore,storage}