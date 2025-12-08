// Load data pelanggan
let pelanggan = JSON.parse(localStorage.getItem("pelanggan") || "[]");
let history = JSON.parse(localStorage.getItem("history") || "[]");
let lastBill = null;

// Isi dropdown pelanggan
function isiDropdownPelanggan() {
    const sel = document.getElementById("pelSelect");
    if (!sel) return;

    sel.innerHTML = '<option value=""></option>' +
        pelanggan.map((p, i) => `<option value="${i}">${p.nama}</option>`).join("");
}

// Jika pelanggan dipilih → hanya isi nama, harga & paket tetap manual
function onPelangganChange() {
    const sel = document.getElementById("pelSelect");
    const idx = sel.value;

    if (idx === "") return;
    const p = pelanggan[idx];

    document.getElementById("paket").value = "";
    document.getElementById("harga").value = "";
}

// Simpan 1 data ke history
function simpanHistory(obj) {
    history.push(obj);
    localStorage.setItem("history", JSON.stringify(history));
}

// Simpan Tagihan
function simpanTagihan() {
    const sel = document.getElementById("pelSelect");
    const idx = sel.value;
    if (idx === "") {
        alert("Pilih pelanggan dulu");
        return;
    }

    const p = pelanggan[idx];

    const paket = document.getElementById("paket").value;
    const harga = document.getElementById("harga").value;
    const periode = document.getElementById("periode").value;
    const status = document.getElementById("status").value;
    const catatan = document.getElementById("catatan").value;

    if (!harga || !periode) {
        alert("Harga & Periode wajib diisi");
        return;
    }

    const data = {
        id: Date.now(),
        nama: p.nama,
        alamat: p.alamat,
        wa: p.wa,
        paket,
        harga,
        periode,
        status,
        catatan,
        tanggal: new Date().toLocaleString()
    };

    lastBill = data;
    simpanHistory(data);
    renderPreview();
    alert("Tagihan berhasil disimpan!");
}

// Preview tagihan terakhir
function renderPreview() {
    const box = document.getElementById("previewTagihan");
    if (!lastBill) {
        box.innerHTML = "Belum ada tagihan tersimpan.";
        return;
    }

    box.innerHTML = `
        <b>${lastBill.nama}</b><br>
        Paket: ${lastBill.paket}<br>
        Harga: Rp ${Number(lastBill.harga).toLocaleString()}<br>
        Periode: ${lastBill.periode}<br>
        Status: ${lastBill.status}<br>
        Catatan: ${lastBill.catatan || "-"}<br>
        <br><i>Disimpan: ${lastBill.tanggal}</i>
    `;
}

// Kirim WA
function kirimWATagihan() {
    if (!lastBill) return alert("Belum ada tagihan!");

    const msg =
`TAGIHAN INTERNET
Nama: ${lastBill.nama}
Paket: ${lastBill.paket}
Harga: Rp ${Number(lastBill.harga).toLocaleString()}
Periode: ${lastBill.periode}
Status: ${lastBill.status}
Catatan: ${lastBill.catatan || "-"}`;

    const url = "https://wa.me/" + lastBill.wa + "?text=" + encodeURIComponent(msg);
    window.open(url, "_blank");
}


// =============================
// CETAK STRUK 58MM
// =============================
function cetakStruk() {
    if (!lastBill) {
        alert("Belum ada tagihan tersimpan.");
        return;
    }

    const w = window.open("", "_blank");
    w.document.write(`
        <html>
        <head>
        <style>
            body { font-family: monospace; padding: 5px; }
            .center { text-align:center; }
            img { width:150px; }
        </style>
        </head>
        <body>
            <div class="center"><b>PAY.Net Billing</b></div>
            <div class="center">STRUK PEMBAYARAN</div>
            <hr>
            Nama : ${lastBill.nama}<br>
            Paket : ${lastBill.paket}<br>
            Harga : Rp ${Number(lastBill.harga).toLocaleString()}<br>
            Periode : ${lastBill.periode}<br>
            Status : ${lastBill.status}<br>
            Catatan : ${lastBill.catatan || "-"}<br>
            <hr>
            <div class="center">Terima kasih 🙏</div>
            <script>window.print(); setTimeout(()=>window.close(),500);</script>
        </body>
        </html>
    `);
}

// =============================
// SAAT HALAMAN SIAP
// =============================
window.addEventListener("DOMContentLoaded", () => {
    isiDropdownPelanggan();
    renderPreview();

    document.getElementById("pelSelect").addEventListener("change", onPelangganChange);
});
