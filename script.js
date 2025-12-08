import { simpanData, ambilData } from "./firebase.js";

// ======== LOAD PELANGGAN KE SELECT (menu tagihan) =========
async function loadPelangganToSelect() {
    const data = await ambilData("pelanggan");
    const sel = document.getElementById("pelangganSelect");

    if (!sel) return;

    sel.innerHTML = `<option value="">Pilih Pelanggan</option>`;

    if (data) {
        Object.keys(data).forEach(id => {
            sel.innerHTML += `<option value="${id}">${data[id].nama}</option>`;
        });
    }
}

// ======== SIMPAN DATA PELANGGAN =========
async function tambahPelanggan() {
    const nama = document.getElementById("nama").value;
    const alamat = document.getElementById("alamat").value;
    const wa = document.getElementById("wa").value;
    const paket = document.getElementById("paketSelect").value;

    if (!nama || !alamat || !wa || !paket) {
        alert("Mohon isi lengkap!");
        return;
    }

    const id = Date.now();

    await simpanData("pelanggan/" + id, {
        nama, alamat, wa, paket
    });

    alert("Pelanggan berhasil ditambahkan!");
    location.reload();
}

// ======== TAMPILKAN LIST PELANGGAN DI halaman pelanggan.html ========
async function renderPelanggan() {
    const tbody = document.getElementById("list");
    if (!tbody) return;

    const data = await ambilData("pelanggan");

    tbody.innerHTML = "";

    if (!data) {
        tbody.innerHTML = "<tr><td colspan='5'>Belum ada data pelanggan</td></tr>";
        return;
    }

    Object.keys(data).forEach((id, i) => {
        const p = data[id];
        tbody.innerHTML += `
            <tr>
                <td>${i + 1}</td>
                <td>${p.nama}</td>
                <td>${p.alamat}</td>
                <td>${p.wa}</td>
                <td>${p.paket}</td>
            </tr>
        `;
    });
}

window.tambahPelanggan = tambahPelanggan;
window.renderPelanggan = renderPelanggan;
window.loadPelangganToSelect = loadPelangganToSelect;

// Jalankan otomatis di semua halaman
document.addEventListener("DOMContentLoaded", () => {
    renderPelanggan();
    loadPelangganToSelect();
});
