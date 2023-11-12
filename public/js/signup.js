const pwdInput = document.getElementById("password-input");
const pwdContent = document.querySelector(".pwd-content");
const requirements = [
    { regex: /.{8,}/, text: "At least 8 characters" },
    { regex: /[0-9]/, text: "At least 1 number" },
    { regex: /[^A-Za-z0-9]/, text: "At least 1 special symbol" }
];


function checkPassword(password) {
    const missing = [];
    requirements.forEach(item => {
        if (!item.regex.test(password)) {
            missing.push(item.text);
        }
    });
    return missing;
}

pwdInput.addEventListener("blur", () => {
    const password = pwdInput.value;
    const missing = checkPassword(password);

    if (missing.length > 0) {
        pwdContent.innerHTML = "<p>Password must contain:</p><ul class='pwd-req'></ul>";

        const reqlist = document.querySelector(".pwd-req");

        missing.forEach(text => {
            const li = document.createElement("li");
            li.innerHTML = `<span>${text}</span>`;
            reqlist.appendChild(li);
        });

        pwdContent.style.display = "block";
    } else {
        pwdContent.style.display = "none";
    }
});

function signup (e) {
    e.preventDefault();

    let email = document.getElementById("email-input").value;
    let password = document.getElementById("password-input").value;
    let confirmpwd = document.getElementById("confirm-pwd").value;

    const missing = checkPassword(password);

    if (password == confirmpwd && missing.length < 1){
        window.location.href = "profile.html";
    } else if (password != confirmpwd){
        document.getElementById("signup-warning").innerHTML = `<strong>Passwords do not match.</strong>`;
        document.getElementById("signup-warning").style.display = "block";
    } else {
        document.getElementById("signup-warning").innerHTML = `<strong>Password does not meet requirements.</strong>`;
        document.getElementById("signup-warning").style.display = "block";
    }
}