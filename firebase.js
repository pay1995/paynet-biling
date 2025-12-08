// --- Firebase SDK (gunakan versi modul) ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getDatabase, ref, set, get, child } 
    from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";

// --- Konfigurasi Firebase PROJECT KAKAK ---
const firebaseConfig = {
    apiKey: "AIzaSyCLdTI_qgNPKa9JgQ1qNVYGv-flo-WYUN8",
    authDomain: "paynet-billing.firebaseapp.com",
    projectId: "paynet-billing",
    storageBucket: "paynet-billing.appspot.com",
    messagingSenderId: "1073884574562",
    appId: "1:1073884574562:web:a702b421fabfe1679bb23b",
    databaseURL: "https://paynet-billing-default-rtdb.firebaseio.com/"
};

// --- Inisialisasi Firebase ---
export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

// --- Fungsi SIMPAN ke Firebase ---
export async function simpanData(path, data) {
    await set(ref(db, path), data);
    return true;
}

// --- Fungsi BACA dari Firebase ---
export async function ambilData(path) {
    const snapshot = await get(child(ref(db), path));
    return snapshot.exists() ? snapshot.val() : null;
}
