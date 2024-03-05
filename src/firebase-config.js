import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSZj2yfcFwK7KmVd7IZw-OIOZFN2zK1Bk",
  authDomain: "rideshare-7c2e6.firebaseapp.com",
  databaseURL: "https://rideshare-7c2e6-default-rtdb.firebaseio.com",
  projectId: "rideshare-7c2e6",
  storageBucket: "rideshare-7c2e6.appspot.com",
  messagingSenderId: "316231140898",
  appId: "1:316231140898:web:85f95b7c5310f78beaec7b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
