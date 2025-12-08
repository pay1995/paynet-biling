let history = JSON.parse(localStorage.getItem("history") || "[]");

function renderHistory(filtered = null) {
    const tbody = document.getElementById("listHistory");
    tbody.innerHTML = "";

    const data = filtered || history;

    if (data.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center; opacity:0.6;">Belum ada data</td>
            </tr>
        `;
        return;
    }

    data.forEach((item, i) => {
        tbody.innerHTML += `
            <tr>
                <td>${i + 1}</td>
                <td>${item.nama}</td>
                <td>${item.paket}</td>
                <td>Rp ${Number(item.harga).toLocaleString()}</td>
                <td>${item.periode}</td>
                <td>
                    <span class="badge ${item.status === "LUNAS" ? "badge-lunas" : "badge-belum"}">
                        ${item.status}
                    </span>
                </td>
            </tr>
        `;
    });
}

function filterByMonth() {
    const val = document.getElementById("filterPeriode").value;

    if (!val) {
        renderHistory();
        return;
    }

    // val = "2025-01"
    const filtered = history.filter(item => {
        if (!item.periode) return false;
        return item.periode.includes(val);
    });

    renderHistory(filtered);
}

function hapusSemuaHistory() {
    if (!confirm("Hapus semua history?")) return;
    history = [];
    localStorage.setItem("history", "[]");
    renderHistory();
}

window.addEventListener("DOMContentLoaded", () => {
    renderHistory();
});
