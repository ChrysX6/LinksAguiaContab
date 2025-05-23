// Defina o usuário e senha desejados
const USERNAME_CORRETO = "aguiacontab"; // Substitua pelo nome de usuário que você deseja
const SENHA_CORRETA = "aguia2015"; // Substitua pela senha que você deseja

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const message = document.getElementById('message');

    if (username === USERNAME_CORRETO && password === SENHA_CORRETA) {
        message.textContent = 'Login bem-sucedido!';
        message.style.color = 'green';
        // Redirecionar para outra página após o login
        window.location.href = '../links/links.html'; // Exemplo de redirecionamento
    } else {
        message.textContent = 'Usuário ou senha incorretos. Tente novamente.';
        message.style.color = 'red';
    }
});