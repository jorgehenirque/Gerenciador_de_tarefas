document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const registeredUser = JSON.parse(localStorage.getItem("user"));

    if (registeredUser && registeredUser.email === email && registeredUser.password === password) {
        localStorage.setItem("userEmail", email);
        window.location.href = "tarefas.html";
    } else {
        alert("Email ou senha incorretos!");
    }
});