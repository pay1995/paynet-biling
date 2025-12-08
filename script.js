// =============== LOGIN SYSTEM ===============
function login() {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;

    if (user === "admin" && pass === "1995") {
        localStorage.setItem("loggedIn", "yes");
        window.location.href = "index.html";
    } else {
        alert("Username atau Password salah!");
    }
}

// =============== LOGOUT SYSTEM ===============
function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "login.html";
}

window.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", logout);
    }

    // Jika belum login → kembalikan ke login.html
    const currentPage = location.pathname.split("/").pop();
    if (currentPage !== "login.html") {
        if (!localStorage.getItem("loggedIn")) {
            window.location.href = "login.html";
        }
    }
});
