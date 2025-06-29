document.getElementById('cadastro-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmar-senha').value;

    if (senha !== confirmarSenha) {
        alert('As senhas não coincidem!');
        return;
    }

    // Salva como objeto JSON na chave "user"
    const user = { email: email, password: senha };
    localStorage.setItem('user', JSON.stringify(user));

    alert('Cadastro realizado com sucesso!');
    window.location.href = 'index.html'; // Redireciona para tela de login
});