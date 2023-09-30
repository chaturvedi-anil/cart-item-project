import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { initializeApp } from "firebase/app";
import 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCskKr-T54h9aVAiL1b2YcnEPMJcnP6y2g",
  authDomain: "cart-18e96.firebaseapp.com",
  projectId: "cart-18e96",
  storageBucket: "cart-18e96.appspot.com",
  messagingSenderId: "41266670511",
  appId: "1:41266670511:web:393a80d2ba428e7fc6dd5a"
};

// Initialize Firebase
export const app= initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

