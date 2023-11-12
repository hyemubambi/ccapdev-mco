function login (e) {
    e.preventDefault();

    let email = document.getElementById("email-input").value;
    let password = document.getElementById("password-input").value;

    window.location.href = "profile.html";
}