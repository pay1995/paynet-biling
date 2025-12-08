let historyData = JSON.parse(localStorage.getItem("history") || "[]");

function tampilkanPendapatan() {

    const container = document.getElementById("listPendapatan");
    const totalText = document.getElementById("totalSemuaText");

    if (!container) return;

    container.innerHTML = "";
    totalText.innerHTML = "";

    if (historyData.length === 0) {
        container.innerHTML = `<span style="opacity:.6;">Belum ada pendapatan</span>`;
        return;
    }

    // Hitung pendapatan per orang
    const perOrang = {};
    let totalSemua = 0;

    historyData.forEach(item => {
        if (item.status !== "LUNAS") return;

        if (!perOrang[item.nama]) perOrang[item.nama] = 0;

        perOrang[item.nama] += Number(item.harga || 0);
        totalSemua += Number(item.harga || 0);
    });

    // Jika tidak ada yang lunas
    if (Object.keys(perOrang).length === 0) {
        container.innerHTML = `<span style="opacity:.6;">Belum ada pendapatan LUNAS</span>`;
        return;
    }

    // Tampilkan per orang (format dua kolom: Nama   Rp 10000)
    let html = "";

    Object.keys(perOrang).forEach(nama => {
        html += `
            <div style="
                display:flex;
                justify-content:space-between;
                padding:8px 20px;
                border-bottom:1px solid #0ff3;">
                <span>${nama}</span>
                <span>Rp ${perOrang[nama].toLocaleString("id-ID")}</span>
            </div>
        `;
    });

    container.innerHTML = html;

    totalText.innerHTML =
        `Total Semua: Rp ${totalSemua.toLocaleString("id-ID")}`;
}

function hapusSemuaPendapatan() {
    if (!confirm("Hapus semua pendapatan?")) return;
    localStorage.removeItem("history");
    historyData = [];
    tampilkanPendapatan();
}

window.addEventListener("DOMContentLoaded", tampilkanPendapatan);
