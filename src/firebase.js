


import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
 import { getAuth } from "firebase/auth";
const firebaseConfig = {
 apiKey: "AIzaSyA8BtYSRJ-nzEKEUZXbnwYrycE5RDO-weM",
  authDomain: "staffaccess-30df8.firebaseapp.com",
  projectId: "staffaccess-30df8",
  storageBucket: "staffaccess-30df8.appspot.com",
  messagingSenderId: "726139754345",
  appId: "1:726139754345:web:71dce6ca836960498d0ff8"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export const auth = getAuth(app);



