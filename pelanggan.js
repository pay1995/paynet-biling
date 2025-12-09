import { db } from "./firebase.js";
import { 
    collection, addDoc, getDocs, doc, updateDoc, deleteDoc 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ------------------------------
// List Paket Harga
// ------------------------------
const paketList = {
    "PAKET-BULANAN-UNTUK-1-ORANG": 50000,
    "PAKET-BULANAN-UNTUK-2-ORANG": 100000,
    "PAKET-BULANAN-UNTUK-3-ORANG": 150000,
    "PAKET-BULANAN-UNTUK-4-ORANG": 150000,
};

// ------------------------------
// LOAD DATA PELANGGAN (ONLINE FIRESTORE)
// ------------------------------
async function loadPelanggan() {
    const querySnapshot = await getDocs(collection(db, "pelanggan"));
    let data = [];

    querySnapshot.forEach((docx) => {
        data.push({ id: docx.id, ...docx.data() });
    });

    renderPelanggan(data);
}

document.addEventListener("DOMContentLoaded", loadPelanggan);

// ------------------------------
// RENDER TABEL
// ------------------------------
function renderPelanggan(data) {
    const tbody = document.getElementById("list");
    if (!tbody) return;

    tbody.innerHTML = data.map((p, i) => `
        <tr>
            <td>${i + 1}</td>
            <td>${p.nama}</td>
            <td>${p.alamat}</td>
            <td>${p.wa}</td>
            <td>${p.paket}</td>
            <td>
                <button onclick="editPelanggan('${p.id}')" class="secondary">Edit</button>
                <button onclick="hapusPelanggan('${p.id}')" class="danger">Hapus</button>
            </td>
        </tr>
    `).join("");
}

// ------------------------------
// TAMBAH PELANGGAN
// ------------------------------
async function tambahPelanggan() {
    const nama = document.getElementById("nama").value;
    const alamat = document.getElementById("alamat").value;
    const wa = document.getElementById("wa").value;
    const paket = document.getElementById("paketSelect").value;

    await addDoc(collection(db, "pelanggan"), {
        nama, alamat, wa, paket
    });

    alert("Data pelanggan berhasil ditambahkan!");
    loadPelanggan();
}

// ------------------------------
// HAPUS DATA
// ------------------------------
async function hapusPelanggan(id) {
    await deleteDoc(doc(db, "pelanggan", id));
    alert("Data berhasil dihapus!");
    loadPelanggan();
}

// ------------------------------
// EDIT DATA (AMBIL DETAIL)
// ------------------------------
async function editPelanggan(id) {
    localStorage.setItem("editID", id);
    window.location.href = "edit-pelanggan.html";
}

window.tambahPelanggan = tambahPelanggan;
window.hapusPelanggan = hapusPelanggan;
window.editPelanggan = editPelanggan;
