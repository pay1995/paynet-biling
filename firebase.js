// --- Firebase SDK import (Modular V9) ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

// --- Konfigurasi Firebase Web App kamu ---
const firebaseConfig = {
    apiKey: "AIzaSyCLdT_qgNPKa9JgQ1qNVYGy-flo-WYUN8",
    authDomain: "paynet-billing.firebaseapp.com",
    projectId: "paynet-billing",
    storageBucket: "paynet-billing.firebasestorage.app",
    messagingSenderId: "1073884574562",
    appId: "1:1073884574562:web:a702b421fabfe1679bb23b"
};

// --- Initialize Firebase ---
export const app = initializeApp(firebaseConfig);

// --- Services yang bisa dipakai seluruh aplikasi ---
export const db = getFirestore(app);   // Database Firestore
export const auth = getAuth(app);      // Authentication

console.log("Firebase berhasil terhubung 👍");
