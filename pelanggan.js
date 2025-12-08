const paketList = {
	"PAKET-BULANAN-UNTUK-1-ORANG ": 50000, 
	"PAKET-BULANAN-UNTUK-2-ORANG ": 100000, 
	"PAKET-BULANAN-UNTUK-3-ORANG ": 150000, 
	"PAKET-BULANAN-UNTUK-4-ORANG ": 150000, 
};





let pelanggan = JSON.parse(localStorage.getItem('pelanggan') || '[]');

function initPaketSelect() {
  const sel = document.getElementById('paketSelect');
  sel.innerHTML = '<option value="">Pilih Paket</option>' +
    Object.keys(paketList).map(p => `<option value="${p}">${p}</option>`).join('');
}

function simpanPelangganStorage() {
  localStorage.setItem('pelanggan', JSON.stringify(pelanggan));
}

function renderPelanggan() {
  const tbody = document.getElementById('list');
  if (!tbody) return;
  tbody.innerHTML = pelanggan.map((p, i) => `
    <tr>
      <td>${i+1}</td>
      <td>${p.nama}</td>
      <td>${p.alamat}</td>
      <td>${p.wa}</td>
      <td>${p.paket}</td>
      <td>
        <button class="secondary" onclick="editPelanggan(${i})">Edit</button>
        <button class="danger" onclick="hapusPelanggan(${i})">Hapus</button>
      </td>
    </tr>
  `).join('');
}

function tambahPelanggan() {
  const nama = document.getElementById('nama').value.trim();
  const alamat = document.getElementById('alamat').value.trim();
  const wa = document.getElementById('wa').value.trim();
  const paket = document.getElementById('paketSelect').value;

  if (!nama || !wa || !paket) {
    alert('Nama, WA, dan paket wajib diisi');
    return;
  }

  // cek jika sudah ada -> update
  const idx = pelanggan.findIndex(p => p.wa === wa);
  if (idx >= 0) {
    pelanggan[idx] = { nama, alamat, wa, paket };
  } else {
    pelanggan.push({ nama, alamat, wa, paket });
  }
  simpanPelangganStorage();
  renderPelanggan();
  document.getElementById('nama').value = '';
  document.getElementById('alamat').value = '';
  document.getElementById('wa').value = '';
  document.getElementById('paketSelect').value = '';
}

function editPelanggan(i) {
  const p = pelanggan[i];
  document.getElementById('nama').value = p.nama;
  document.getElementById('alamat').value = p.alamat;
  document.getElementById('wa').value = p.wa;
  document.getElementById('paketSelect').value = p.paket;
}

function hapusPelanggan(i) {
  if (!confirm('Hapus pelanggan ini?')) return;
  pelanggan.splice(i,1);
  simpanPelangganStorage();
  renderPelanggan();
}

function hapusSemuaPelanggan() {
  if (!confirm('Hapus semua pelanggan?')) return;
  pelanggan = [];
  simpanPelangganStorage();
  renderPelanggan();
}

window.addEventListener('DOMContentLoaded', () => {
  initPaketSelect();
  renderPelanggan();
});
