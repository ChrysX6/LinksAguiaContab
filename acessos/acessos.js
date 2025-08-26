// Função para alternar entre modo escuro e claro
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    alterarLogo(); // Mudar a logo quando mudar o modo
}

// Função para alterar a logo dependendo do modo
function alterarLogo() {
    const logo = document.getElementById('logo');
    if (document.body.classList.contains('dark-mode')) {
        logo.src = 'img/logo2.png'; // Logo para o modo escuro
    } else {
        logo.src = 'img/logo1.png'; // Logo para o modo claro
    }
}

// Verifica o modo escuro ao carregar a página
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// Alterar a logo quando a página carregar
alterarLogo();

// Função para adicionar um emissor
function adicionarEmissor() {
    let nome = prompt('Nome da Empresa:');
    let login = prompt('Login:');
    let senha = prompt('Senha:');
    let emissor = prompt('Nome do Emissor (que será o link):');
    let linkEmissor = prompt('URL para o emissor:');

    if (nome && login && senha && emissor && linkEmissor) {
        let tabela = document.getElementById('tabelaEmissores').getElementsByTagName('tbody')[0];
        let novaLinha = tabela.insertRow();
        novaLinha.innerHTML = `
                    <td><a href="${linkEmissor}" target="_blank">${emissor}</a></td>
                    <td>${nome}</td>
                    <td>${login}</td>
                    <td>${senha}</td>
                    <td>
                        <button onclick="editarEmissor(this)">Editar</button>
                        <button onclick="excluirEmissor(this)">Excluir</button>
                    </td>
                `;
        salvarDados();
    }
}

// Função para editar um emissor
function editarEmissor(button) {
    let linha = button.closest('tr');
    let nome = prompt('Novo Nome da Empresa:', linha.cells[1].textContent);
    let login = prompt('Novo Login:', linha.cells[2].textContent);
    let senha = prompt('Nova Senha:', linha.cells[3].textContent);
    let emissor = prompt('Novo Nome do Emissor (que será o link):', linha.cells[0].textContent);
    let linkEmissor = prompt('Nova URL para o emissor:', linha.cells[0].querySelector('a').href);

    if (nome && login && senha && emissor && linkEmissor) {
        linha.cells[1].textContent = nome;
        linha.cells[2].textContent = login;
        linha.cells[3].textContent = senha;
        linha.cells[0].innerHTML = `<a href="${linkEmissor}" target="_blank">${emissor}</a>`;
        salvarDados();
    }
}

// Função para excluir um emissor
function excluirEmissor(button) {
    if (confirm('Tem certeza que deseja excluir?')) {
        let linha = button.closest('tr');
        linha.remove();
        salvarDados();
    }
}

// Função para salvar os dados no localStorage
function salvarDados() {
    let tabela = document.getElementById('tabelaEmissores').getElementsByTagName('tbody')[0];
    let emissores = [];
    for (let i = 0; i < tabela.rows.length; i++) {
        let linha = tabela.rows[i];
        emissores.push({
            emissor: linha.cells[0].querySelector('a').textContent,
            link: linha.cells[0].querySelector('a').href,
            nome: linha.cells[1].textContent,
            login: linha.cells[2].textContent,
            senha: linha.cells[3].textContent
        });
    }
    localStorage.setItem('emissores', JSON.stringify(emissores));
}

// Função para carregar os dados salvos no localStorage
function carregarDados() {
    let emissores = JSON.parse(localStorage.getItem('emissores') || '[]');
    let tabela = document.getElementById('tabelaEmissores').getElementsByTagName('tbody')[0];
    emissores.forEach(emissor => {
        let novaLinha = tabela.insertRow();
        novaLinha.innerHTML = `
                    <td><a href="${emissor.link}" target="_blank">${emissor.emissor}</a></td>
                    <td>${emissor.nome}</td>
                    <td>${emissor.login}</td>
                    <td>${emissor.senha}</td>
                    <td>
                        <button onclick="editarEmissor(this)">Editar</button>
                        <button onclick="excluirEmissor(this)">Excluir</button>
                    </td>
                `;
    });
}

// Carregar os dados ao carregar a página
carregarDados();