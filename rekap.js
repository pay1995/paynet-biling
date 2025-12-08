let data = JSON.parse(localStorage.getItem("rekapan")) || [];
let editIndex = -1;

// ---------------- SIMPAN ----------------
document.getElementById("simpan").onclick = () => {
    let obj = {
        tgl: document.getElementById("tgl").value,
        penjual: document.getElementById("penjual").value,
        voucher: document.getElementById("voucher").value,
        titip: Number(document.getElementById("titip").value),
        jual: Number(document.getElementById("jual").value),
        harga: Number(document.getElementById("harga").value),
        catatan: document.getElementById("catatan").value
    };

    obj.sisa = obj.titip - obj.jual;
    obj.setoran = obj.jual * obj.harga;

    if (editIndex === -1) {
        data.push(obj);
    } else {
        data[editIndex] = obj;
        editIndex = -1;
    }

    localStorage.setItem("rekapan", JSON.stringify(data));
    tampilkan();
    kosongkanForm();
};

// ---------------- HAPUS SEMUA ----------------
document.getElementById("hapusSemua").onclick = () => {
    if (confirm("Yakin hapus semua?")) {
        data = [];
        localStorage.removeItem("rekapan");
        tampilkan();
    }
};

// ---------------- EDIT ----------------
function editData(i) {
    let d = data[i];

    document.getElementById("tgl").value = d.tgl;
    document.getElementById("penjual").value = d.penjual;
    document.getElementById("voucher").value = d.voucher;
    document.getElementById("titip").value = d.titip;
    document.getElementById("jual").value = d.jual;
    document.getElementById("harga").value = d.harga;
    document.getElementById("catatan").value = d.catatan;

    editIndex = i;
}

// ---------------- HAPUS ----------------
function hapusData(i) {
    if (confirm("Hapus data ini?")) {
        data.splice(i, 1);
        localStorage.setItem("rekapan", JSON.stringify(data));
        tampilkan();
    }
}

// ---------------- TAMPILKAN ----------------
function tampilkan() {
    let excel = "";
    let no = 1;

    data.forEach((d, i) => {
        excel += `
        <tr>
            <td>${no++}</td>
            <td>${d.tgl}</td>
            <td>${d.penjual}</td>
            <td>${d.voucher}</td>
            <td>${d.titip}</td>
            <td>${d.jual}</td>
            <td>${d.sisa}</td>
            <td>${d.setoran}</td>
            <td>${d.catatan}</td>
            <td>
                <button class="btn-edit" onclick="editData(${i})">Edit</button>
                <button class="btn-hapus" onclick="hapusData(${i})">X</button>
            </td>
        </tr>`;
    });

    document.getElementById("excelBody").innerHTML = excel;

    // RINGKASAN
    let sum = {};
    data.forEach(d => {
        if (!sum[d.penjual]) sum[d.penjual] = { titip: 0, jual: 0, sisa: 0, setoran: 0 };
        sum[d.penjual].titip += d.titip;
        sum[d.penjual].jual += d.jual;
        sum[d.penjual].sisa += d.sisa;
        sum[d.penjual].setoran += d.setoran;
    });

    let ring = "";
    let no2 = 1;

    Object.keys(sum).forEach(p => {
        ring += `
        <tr>
            <td>${no2++}</td>
            <td>${p}</td>
            <td>${sum[p].titip}</td>
            <td>${sum[p].jual}</td>
            <td>${sum[p].sisa}</td>
            <td>${sum[p].setoran}</td>
        </tr>`;
    });

    document.getElementById("ringkasBody").innerHTML = ring;
}

function kosongkanForm() {
    document.getElementById("tgl").value = "";
    document.getElementById("penjual").value = "";
    document.getElementById("voucher").value = "";
    document.getElementById("titip").value = "0";
    document.getElementById("jual").value = "0";
    document.getElementById("harga").value = "0";
    document.getElementById("catatan").value = "";
}

tampilkan();
