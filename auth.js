// ====== AUTH SYSTEM PAY.NET ======

// Default login jika pertama kali
if (!localStorage.getItem("adminUser")) {
    localStorage.setItem("adminUser", "admin");
    localStorage.setItem("adminPass", "1234");
}

// === LOGIN FUNCTION ===
function login() {
    const u = document.getElementById("username").value.trim();
    const p = document.getElementById("password").value.trim();

    const user = localStorage.getItem("adminUser");
    const pass = localStorage.getItem("adminPass");

    if (u === user && p === pass) {
        localStorage.setItem("loggedIn", "true");
        window.location.href = "index.html";
    } else {
        alert("Username atau password salah!");
    }
}

// === LOGOUT FUNCTION ===
function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "login.html";
}

// === PROTECT HALAMAN ===
function checkLogin() {
    if (localStorage.getItem("loggedIn") !== "true") {
        window.location.href = "login.html";
    }
}

// === CHANGE PASSWORD ===
function changePassword() {
    const oldP = document.getElementById("oldPass").value;
    const newP = document.getElementById("newPass").value;

    const savedPass = localStorage.getItem("adminPass");

    if (oldP !== savedPass) {
        alert("Password lama salah!");
        return;
    }

    localStorage.setItem("adminPass", newP);
    alert("Password berhasil diganti!");
    window.location.href = "login.html";
}
