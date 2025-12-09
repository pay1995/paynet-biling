// ---------------------------
// Firebase CONFIG
// ---------------------------
const firebaseConfig = {
    apiKey: "AIzaSyCLdTI_qgNPKa9JgQ1qNVYGy-f1o-WYUN8",
    authDomain: "paynet-billing.firebaseapp.com",
    projectId: "paynet-billing",
    storageBucket: "paynet-billing.firebasestorage.app",
    messagingSenderId: "1073884574562",
    appId: "1:1073884574562:web:a702b421fabfe1679bb23b"
};

// ---------------------------
// Firebase Init
// ---------------------------
import { initializeApp } 
    from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

const app = initializeApp(firebaseConfig);

export { app };
