import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAZTDFjVG2CfLZR9BMPtmcGshJpV3QwMcQ",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "habo-c94f3.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "habo-c94f3",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "habo-c94f3.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "414353963827",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:414353963827:web:0c4ddff2dab8f8d4725c46"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;