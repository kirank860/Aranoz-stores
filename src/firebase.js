import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDXMbD-YmMF7R3KLvxT2ABlk_m2nJ3Dh_I",
    authDomain: "aranoz-14390.firebaseapp.com",
    projectId: "aranoz-14390",
    storageBucket: "aranoz-14390.firebasestorage.app",
    messagingSenderId: "672012953710",
    appId: "1:672012953710:web:ddffb05e1c4a09d0509e7f"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(); 