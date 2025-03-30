document.addEventListener("DOMContentLoaded", function () {
    loadProfile();
});

function saveProfile() {
    const name = document.getElementById("profileName").value;
    localStorage.setItem("profileName", name);
}

function loadProfile() {
    document.getElementById("profileName").value = localStorage.getItem("profileName") || "";
}
