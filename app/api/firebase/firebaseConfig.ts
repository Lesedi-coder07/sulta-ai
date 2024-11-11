// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const firebaseConfig : Object = {
  apiKey: "AIzaSyCSyyvK8b1pfwYC4PusmP9Qsq5R3Jjhxr4",
  authDomain: "sulta-ai.firebaseapp.com",
  projectId: "sulta-ai",
  storageBucket: "sulta-ai.firebasestorage.app",
  messagingSenderId: "749322137169",
  appId: "1:749322137169:web:215f597b629d8788ddd270",
  measurementId: "G-ZMRMPEWJWN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);