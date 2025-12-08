// Password default
const ADMIN_USER = "admin";
const ADMIN_PASS = "1995";

// LOGIN
function login() {
    const u = document.getElementById("user").value.trim();
    const p = document.getElementById("pass").value.trim();

    if (u === ADMIN_USER && p === ADMIN_PASS) {
        localStorage.setItem("login", "true");
        window.location.href = "index.html";
    } else {
        alert("Username / Password salah!");
    }
}

// LOGOUT
function logout() {
    localStorage.removeItem("login");
    window.location.href = "login.html";
}

// CEK LOGIN DI HALAMAN INDEX
function cekLogin() {
    if (!localStorage.getItem("login")) {
        window.location.href = "login.html";
    }
}

window.logout = logout;
window.login = login;
window.cekLogin = cekLogin;
