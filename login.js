// Default password jika belum ada di localStorage
if (!localStorage.getItem("adminPass")) {
    localStorage.setItem("adminPass", "1995");
}

function login() {
    const user = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value.trim();
    const savedPass = localStorage.getItem("adminPass");

    if (user === "admin" && pass === savedPass) {
        localStorage.setItem("loggedIn", "yes");
        window.location.href = "index.html";
    } else {
        alert("Username atau password salah!");
    }
}

// -------- GANTI PASSWORD ----------
function showChangePass() {
    document.getElementById("popupPass").style.display = "flex";
}

function closePopup() {
    document.getElementById("popupPass").style.display = "none";
}

function changePass() {
    const oldPass = document.getElementById("oldPass").value;
    const newPass = document.getElementById("newPass").value;
    const savedPass = localStorage.getItem("adminPass");

    if (oldPass !== savedPass) {
        alert("Password lama salah!");
        return;
    }

    if (newPass.length < 3) {
        alert("Password baru terlalu pendek!");
        return;
    }

    localStorage.setItem("adminPass", newPass);
    alert("Password berhasil diganti!");
    closePopup();
}
