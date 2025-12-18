// Base de dados de sistemas e serviços
const systemsDatabase = [
    {
        name: "E-CAC",
        description: "Sistema da Receita Federal - Centro Virtual de Atendimento",
        url: "https://cav.receita.fazenda.gov.br/",
        icon: "fas fa-file-invoice-dollar",
        tags: ["receita federal", "impostos", "declaracoes", "fiscal", "ecac"]
    },
    {
        name: "CONSULTA OPTANTES SIMPLES NACIONAL",
        description: "Sistema para consultar empresas optantes pelo Simples Nacional",
        url: "https://consopt.www8.receita.fazenda.gov.br/consultaoptantes",
        icon: "fas fa-users",
        tags: ["simples nacional", "consulta", "optantes"]
    },
    {
        name: "CONSULTA CNPJ",
        description: "Sistema de consulta de CNPJ da Receita Federal",
        url: "https://solucoes.receita.fazenda.gov.br/servicos/cnpjreva/cnpjreva_solicitacao.asp",
        icon: "fas fa-database",
        tags: ["cnpj", "consulta", "receita federal"]
    },
    {
        name: "JUCESP",
        description: "Junta Comercial do Estado de São Paulo",
        url: "https://www.jucesponline.sp.gov.br/",
        icon: "fas fa-landmark",
        tags: ["junta comercial", "sp", "empresas"]
    },
    {
        name: "SIMPLES NACIONAL",
        description: "Sistema de recolhimento de impostos para micro e pequenas empresas",
        url: "https://www8.receita.fazenda.gov.br/SIMPLESNACIONAL/",
        icon: "fas fa-building",
        tags: ["simples", "mei", "microempresa"]
    },
    {
        name: "PGMEI",
        description: "Programa Gerador do Documento de Arrecadação do MEI",
        url: "https://www8.receita.fazenda.gov.br/SimplesNacional/Aplicacoes/ATSPO/pgmei.app/Identificacao",
        icon: "fas fa-city",
        tags: ["mei", "pgmei", "recolhimento"]
    },
    {
        name: "NOTA FISCAL - PREFEITURA SP",
        description: "Sistema de emissão de Nota Fiscal Eletrônica de Serviços - Prefeitura de São Paulo",
        url: "https://nfe.prefeitura.sp.gov.br/contribuinte/inicio.aspx",
        icon: "fas fa-file-alt",
        tags: ["nota fiscal", "prefeitura sp", "nfs-e"]
    },
    {
        name: "SINTEGRA",
        description: "Sistema Integrado de Informações sobre Operações Interestaduais",
        url: "https://www.sintegra.gov.br/",
        icon: "fas fa-exchange-alt",
        tags: ["icms", "interestadual", "fiscal"]
    },
    {
        name: "ESOCIAL",
        description: "Sistema de Escrituração Digital das Obrigações Fiscais Trabalhistas",
        url: "https://www.esocial.gov.br/",
        icon: "fas fa-id-card",
        tags: ["trabalhista", "folha", "inss"]
    },
    {
        name: "DUC PREFEITURA SP",
        description: "O Demonstrativo Unificado do Contribuinte (DUC) - Prefeitura de São Paulo",
        url: "https://duc.prefeitura.sp.gov.br/portal/",
        icon: "fas fa-file-invoice",
        tags: ["duc", "prefeitura sp", "recolhimento"]
    },
    {
        name: "DAS",
        description: "Documento de Arrecadação do Simples Nacional",
        url: "https://www8.receita.fazenda.gov.br/SimplesNacional/Servicos/Grupo.aspx?grp=t&area=1",
        icon: "fas fa-receipt",
        tags: ["simples", "das", "recolhimento"]
    },
    {
        name: "DEC PREFEITURA SP",
        description: "Declaração Eletrônica de Serviços - Prefeitura de São Paulo",
        url: "https://dec.prefeitura.sp.gov.br/",
        icon: "fas fa-briefcase",
        tags: ["dec", "prefeitura sp", "servicos"]
    },
    {
        name: "DEC SEFAZ",
        description: "Declaração Eletrônica de Serviços - SEFAZ",
        url: "https://www.dec.fazenda.sp.gov.br/DEC/UCLogin/login.aspx",
        icon: "fas fa-briefcase",
        tags: ["dec", "sefaz", "servicos"]
    },
    {
        name: "PFE - POSTO FISCAL ELETRÔNICO",
        description: "Sistema de Posto Fiscal Eletrônico",
        url: "https://www3.fazenda.sp.gov.br/CAWEB/Account/Login.aspx/",
        icon: "fas fa-clipboard-check",
        tags: ["posto fiscal", "pfe", "fiscal"]
    },
    {
        name: "FGTS DIGITAL",
        description: "Sistema de recolhimento do FGTS",
        url: "https://fgtsdigital.sistema.gov.br/portal/login",
        icon: "fas fa-university",
        tags: ["fgts", "recolhimento", "trabalhista"]
    },
    {
        name: "EMPREGADOR WEB",
        description: "Tirar seguro-desemprego e outros serviços trabalhistas",
        url: "https://sd.maisemprego.mte.gov.br/sdweb/empregadorweb/index.jsf",
        icon: "fas fa-briefcase",
        tags: ["empregador", "trabalhista", "seguro desemprego"]
    },
    {
        name: "SAL - SISTEMA DE ACRÉSCIMOS LEGAIS",
        description: "Tirar guias de inss",
        url: "https://sal.rfb.gov.br/home",
        icon: "fas fa-file-invoice-dollar",
        tags: ["inss", "guias", "recolhimento"]
    },
    {
        name: "DET - DOMICÍLIO ELETRÔNICO TRABALHISTA",
        description: "sistema do governo federal brasileiro que centraliza a comunicação entre a Inspeção do Trabalho e os empregadores",
        url: "https://det.sit.trabalho.gov.br/",
        icon: "fas fa-envelope-open-text",
        tags: ["inspecao do trabalho", "trabalhista", "comunicacao"]
    },
    {
        name: "IOB ONLINE",
        description: "Plataforma de conteúdos e serviços para profissionais de contabilidade e gestão",
        url: "https://www.iobonline.com.br/",
        icon: "fas fa-envelope-open-text",
        tags: ["iob", "conteudos", "servicos"]
    },
    {
        name: "NFSE MEI",
        description: "Sistema de emissão de Nota Fiscal de Serviços Eletrônica para MEI",
        url: "https://www.nfse.gov.br/EmissorNacional/",
        icon: "fas fa-envelope-open-text",
        tags: ["nfse", "mei", "nota fiscal"]
    },
    {
        name: "GISS ONLINE",
        description: "Sistema de Gestão de ISS para Municípios",
        url: "https://www.iobonline.com.br/",
        icon: "fas fa-envelope-open-text",
        tags: ["giss", "iss", "municipios"]
    },
     {
        name: "DARE ICMS SP",
        description: "Documento de Arrecadação de Receitas Estaduais - ICMS São Paulo",
        url: "https://www4.fazenda.sp.gov.br/DareICMS/DareAvulso",
        icon: "fas fa-file-invoice-dollar",
        tags: ["dare", "icms", "sp"]
    },
];

// Variáveis globais para controle do modal
let currentControlType = '';
const monthLinks = {
    'lucro-presumido': {
        2024: {
            'todos': 'https://drive.google.com/drive/folders/1BIV1OYCNnqLA6AFtt74tri3cb9D7RnhB'
        },
        2025: {
            'janeiro': 'https://drive.google.com/drive/folders/1ykiBqOId1eyw9Vxuv5M6wDdrB0fut5s1',
            'fevereiro': 'https://drive.google.com/drive/folders/1cuP5LINjfQVmdBuMEEFdjUhIASgAKqIN',
            'março': 'https://drive.google.com/drive/folders/1elN9-Br-O9eCd19Sz7lNg3Bq5Fd0O4W7',
            'abril': 'https://drive.google.com/drive/folders/1PtCIeLrCc0_aNJXaFzZRlGcRRCziJVgu',
            'maio': 'https://drive.google.com/drive/folders/1wXU3nZwDe54mR9URFTGAH3xLNma9oiuS',
            'junho': 'https://drive.google.com/drive/folders/1aNgApurd8T540p2oHq5TqyWdJurfg0Pr',
            'julho': 'https://drive.google.com/drive/folders/1w_INrhgTi4ahVHz7Xa_V06wxZeKUnMPW',
            'agosto': 'https://drive.google.com/drive/folders/1bkp9_K5fWyYOSz9UZWRqToTqp_-vdI9G',
            'setembro': 'https://drive.google.com/drive/folders/1c6Kfp-GmrInteN1YIyZ3meMcdxxcgR3s',
            'outubro': 'https://drive.google.com/drive/folders/19IsvE2x1KFfjDEBU1KWm-yihk0UYiiwy',
            'novembro': 'https://drive.google.com/drive/folders/1TXXPTtN9ob2QHYf3z8W7HFTr0qZeCykD',
            'dezembro': 'https://drive.google.com/drive/folders/15Wkar3DSMYVPXBJ4G_KpGwrLzHn5ciit'
        }
    },
    'simples-nacional': {
        2024: {
            'todos': 'https://drive.google.com/drive/folders/1MxzHoAX6MYGpnzUt1Qu4j0cCaGxSgrfu'
        },
        2025: {
            'janeiro': 'https://drive.google.com/drive/folders/1PLUeH7eXGwuaXl7gry_H6fNlGfFXAfBl',
            'fevereiro': 'https://drive.google.com/drive/folders/1vC2ohs-RIT6GMcwD0eGvTTYh86SeQPoC',
            'março': 'https://drive.google.com/drive/folders/1_zRsOXMKML23Oqf4SAjHLwzSNuxo86Xe',
            'abril': 'https://drive.google.com/drive/folders/1txRhXA9LpWPREbcVM1HYBGbJWuApkVyH',
            'maio': 'https://drive.google.com/drive/folders/1HmX65TNajLCiA9KZsLClq0sr3UTZ3bzW',
            'junho': 'https://drive.google.com/drive/folders/1vTQuNDkspN7Uhdp0Q_4d29wHvn2okfj9',
            'julho': 'https://drive.google.com/drive/folders/1yfB8RdAbDg6GC01v0DexwRamAfoTzq6Q',
            'agosto': 'https://drive.google.com/drive/folders/1gNx_IAkvimMUFrHjogMoXho0ZvcVM5TT',
            'setembro': 'https://drive.google.com/drive/folders/1kQtzbhm5wgxC-QvDHYclmawN_nFCaGml',
            'outubro': 'https://drive.google.com/drive/folders/14Ync6AtztJ8ZVyA6H3poGYZx-eFURKXV',
            'novembro': 'https://drive.google.com/drive/folders/1w9l-3mEDS4fs4nQ6_3RfMl6nviKfVYWQ',
            'dezembro': 'https://drive.google.com/drive/folders/1SBOazBR5XnKfqfpziXwzkMZs-HqC4JN2'
        }
    }
};

// Funções para o modal de seleção
function showYearSelection(controlType) {
    currentControlType = controlType;
    const modalTitle = document.getElementById('modalTitle');
    
    if (controlType === 'lucro-presumido') {
        modalTitle.textContent = 'Lucro Presumido/Real - Selecionar Período';
    } else {
        modalTitle.textContent = 'Simples Nacional - Selecionar Período';
    }
    
    document.getElementById('monthSelection').style.display = 'none';
    document.getElementById('yearMonthModal').style.display = 'block';
}

function showMonthSelection(year) {
    const monthGrid = document.getElementById('monthGrid');
    monthGrid.innerHTML = '';
    
    const months = monthLinks[currentControlType][year];
    const monthNames = {
        'todos': 'TODOS OS MESES',
        'janeiro': 'JANEIRO',
        'fevereiro': 'FEVEREIRO', 
        'março': 'MARÇO',
        'abril': 'ABRIL',
        'maio': 'MAIO',
        'junho': 'JUNHO',
        'julho': 'JULHO',
        'agosto': 'AGOSTO',
        'setembro': 'SETEMBRO',
        'outubro': 'OUTUBRO',
        'novembro': 'NOVEMBRO',
        'dezembro': 'DEZEMBRO'
    };
    
    // Adiciona botão "TODOS OS MESES" se existir
    if (months.todos) {
        const allMonthsBtn = document.createElement('button');
        allMonthsBtn.className = 'month-btn';
        allMonthsBtn.textContent = monthNames['todos'];
        allMonthsBtn.onclick = () => redirectToLink(months.todos);
        monthGrid.appendChild(allMonthsBtn);
    }
    
    // Adiciona os meses individuais
    Object.keys(months).forEach(month => {
        if (month !== 'todos') {
            const monthBtn = document.createElement('button');
            monthBtn.className = 'month-btn';
            monthBtn.textContent = monthNames[month];
            monthBtn.onclick = () => redirectToLink(months[month]);
            monthGrid.appendChild(monthBtn);
        }
    });
    
    document.getElementById('monthSelection').style.display = 'block';
}

function redirectToLink(url) {
    window.open(url, '_blank');
    closeModal();
}

function closeModal() {
    document.getElementById('yearMonthModal').style.display = 'none';
    currentControlType = '';
}

// Fechar modal ao clicar fora
document.getElementById('yearMonthModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Fechar modal com ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Função para inicializar os resultados
function initializeSearchResults() {
    const searchResults = document.getElementById('searchResults');
    // Exibe todos os sistemas inicialmente
    displayResults(systemsDatabase, '');
}

// Função para exibir resultados
function displayResults(results, searchTerm) {
    const searchResults = document.getElementById('searchResults');
    
    if (results.length === 0) {
        searchResults.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <p>Nenhum sistema encontrado para "${searchTerm}"</p>
                <small>Tente buscar por: E-CAC, SEFIP, DCTF, SPED, etc.</small>
            </div>
        `;
        return;
    }

    searchResults.innerHTML = results.map(system => {
        const highlightedName = highlightText(system.name, searchTerm);
        const highlightedDescription = highlightText(system.description, searchTerm);
        
        return `
            <a href="${system.url}" target="_blank" class="system-link">
                <div class="system-icon">
                    <i class="${system.icon}"></i>
                </div>
                <div class="system-info">
                    <div class="system-name">${highlightedName}</div>
                    <div class="system-description">${highlightedDescription}</div>
                    <div class="system-tags">
                        ${system.tags.map(tag => `<span class="system-tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </a>
        `;
    }).join('');
}

// Função para destacar o texto buscado
function highlightText(text, searchTerm) {
    if (!searchTerm.trim()) return text;
    
    const regex = new RegExp(`(${escapeRegex(searchTerm)})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
}

// Função para escapar caracteres especiais no regex
function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Função principal de busca
function filterLinks() {
    const searchTerm = document.getElementById('search-bar').value.toLowerCase().trim();
    
    if (searchTerm === '') {
        // Se a busca estiver vazia, mostra todos os sistemas
        displayResults(systemsDatabase, '');
        return;
    }

    const results = systemsDatabase.filter(system => {
        // Busca no nome
        if (system.name.toLowerCase().includes(searchTerm)) return true;
        
        // Busca na descrição
        if (system.description.toLowerCase().includes(searchTerm)) return true;
        
        // Busca nas tags
        if (system.tags.some(tag => tag.toLowerCase().includes(searchTerm))) return true;
        
        return false;
    });

    displayResults(results, searchTerm);
}

// Tema dark/light
document.getElementById('theme-toggle').addEventListener('click', () => {
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    const logo = document.getElementById('logo');

    // Alterna o modo escuro
    body.classList.toggle('dark-mode');

    // Muda o ícone do botão e a logo dependendo do modo
    if (body.classList.contains('dark-mode')) {
        themeToggle.textContent = '🌙';
        if (logo) {
            logo.src = 'links/img/logo2natal.png';
        }
    } else {
        themeToggle.textContent = '☀️';
        if (logo) {
            logo.src = 'links/img/logo1.png';
        }
    }
    
    // Salva a preferência no localStorage
    localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// Aplica o tema salvo ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    const logo = document.getElementById('logo');
    
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.textContent = '🌙';
        if (logo) {
            logo.src = 'links/img/logo2.png';
        }
    }
    
    // Inicializa o sistema de busca
    initializeSearchResults();
});

// Sistema de Chat com Senha
document.addEventListener('DOMContentLoaded', function() {
    const chatBubble = document.getElementById('chatBubble');
    const chatIcon = chatBubble.querySelector('.chat-icon');
    const chatWindow = document.getElementById('chatWindow');
    const closeChat = document.getElementById('closeChat');
    const passwordInput = document.getElementById('passwordInput');
    const submitPassword = document.getElementById('submitPassword');
    const errorMessage = document.getElementById('errorMessage');
    
    // Senha correta
    const CORRECT_PASSWORD = "Gestao2025@";
    // Link que será acessado após a senha correta
    const TARGET_LINK = "https://docs.google.com/spreadsheets/d/1fmeTfc1coBy_8LMT8aSjxfh6b9VC1slv/edit?usp=sharing&ouid=104502217953424660775&rtpof=true&sd=true";
    
    // Abrir chat
    chatIcon.addEventListener('click', function() {
        chatWindow.classList.add('active');
        passwordInput.focus();
    });
    
    // Fechar chat
    closeChat.addEventListener('click', function() {
        chatWindow.classList.remove('active');
        resetForm();
    });
    
    // Fechar chat clicando fora
    document.addEventListener('click', function(event) {
        if (!chatBubble.contains(event.target) && chatWindow.classList.contains('active')) {
            chatWindow.classList.remove('active');
            resetForm();
        }
    });
    
    // Submeter senha
    submitPassword.addEventListener('click', validatePassword);
    
    // Submeter com Enter
    passwordInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            validatePassword();
        }
    });
    
    function validatePassword() {
        const enteredPassword = passwordInput.value.trim();
        
        if (enteredPassword === CORRECT_PASSWORD) {
            // Senha correta - redirecionar para o link
            window.open(TARGET_LINK, '_blank');
            resetForm();
            chatWindow.classList.remove('active');
        } else {
            // Senha incorreta
            errorMessage.textContent = "Senha incorreta. Tente novamente.";
            errorMessage.classList.add('show');
            passwordInput.value = '';
            passwordInput.focus();
            
            // Remover mensagem de erro após 3 segundos
            setTimeout(() => {
                errorMessage.classList.remove('show');
            }, 3000);
        }
    }
    
    function resetForm() {
        passwordInput.value = '';
        errorMessage.classList.remove('show');
    }
    
    // Prevenir que cliques no chat fechem o window
    chatWindow.addEventListener('click', function(event) {
        event.stopPropagation();
    });
});

// EFEITOS NATALINOS ADICIONAIS

// Função para criar efeito de neve
function createSnow() {
    const snowContainer = document.createElement('div');
    snowContainer.className = 'snow-container';
    snowContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    
    document.body.appendChild(snowContainer);
    
    // Criar flocos de neve
    for (let i = 0; i < 50; i++) {
        createSnowflake(snowContainer);
    }
}

function createSnowflake(container) {
    const snowflake = document.createElement('div');
    snowflake.innerHTML = '❄';
    snowflake.style.cssText = `
        position: absolute;
        top: -20px;
        font-size: ${Math.random() * 20 + 10}px;
        color: white;
        opacity: ${Math.random() * 0.5 + 0.3};
        user-select: none;
    `;
    
    // Posição aleatória
    const startX = Math.random() * window.innerWidth;
    snowflake.style.left = `${startX}px`;
    
    // Animação
    const duration = Math.random() * 10 + 10;
    const delay = Math.random() * 5;
    
    snowflake.style.animation = `
        snowFall ${duration}s linear ${delay}s infinite
    `;
    
    container.appendChild(snowflake);
    
    // Remover floco após animação e criar novo
    setTimeout(() => {
        if (snowflake.parentNode) {
            snowflake.remove();
            createSnowflake(container);
        }
    }, (duration + delay) * 1000);
}

// Mensagem de Natal no botão flutuante
document.addEventListener('DOMContentLoaded', function() {
    // Criar efeito de neve
    createSnow();
    
    // Mensagem de Natal
    const christmasMessageBtn = document.getElementById('christmasMessage');
    if (christmasMessageBtn) {
        christmasMessageBtn.addEventListener('click', function() {
            showChristmasMessage();
        });
    }
    
    // Adicionar emojis natalinos aos sistemas
    addChristmasEmojis();
    
    // Efeito especial ao carregar
    setTimeout(() => {
        document.body.classList.add('christmas-loaded');
    }, 100);
});

// Mostrar mensagem de Natal especial
function showChristmasMessage() {
    const message = document.createElement('div');
    message.className = 'christmas-popup';
    message.innerHTML = `
        <div class="christmas-popup-content">
            <button class="close-popup">&times;</button>
            <h3>🎅 Feliz Natal! 🎄</h3>
            <p>Que esta época festiva traga muita paz, alegria e prosperidade para todos nós!</p>
            <p>Desejamos um Natal repleto de bênçãos e um Ano Novo cheio de sucesso!</p>
            <div class="popup-emojis">🎁🎄🌟❄️🔔</div>
            <p><small>Equipe Aguiacontab Tatuapé</small></p>
        </div>
    `;
    
    message.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
    `;
    
    document.body.appendChild(message);
    
    // Fechar popup
    message.querySelector('.close-popup').addEventListener('click', function() {
        message.remove();
    });
    
    // Fechar ao clicar fora
    message.addEventListener('click', function(e) {
        if (e.target === this) {
            message.remove();
        }
    });
    
    // Estilos do conteúdo do popup
    const content = message.querySelector('.christmas-popup-content');
    content.style.cssText = `
        background: linear-gradient(135deg, #1a472a, #2e8b57);
        padding: 30px;
        border-radius: 20px;
        max-width: 400px;
        text-align: center;
        border: 3px solid #ffd700;
        color: white;
        position: relative;
        animation: popupShow 0.5s ease;
    `;
    
    // Animação do popup
    const style = document.createElement('style');
    style.textContent = `
        @keyframes popupShow {
            from {
                opacity: 0;
                transform: scale(0.5) translateY(-50px);
            }
            to {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
        }
        .close-popup {
            position: absolute;
            top: 10px;
            right: 15px;
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
        }
        .popup-emojis {
            font-size: 30px;
            margin: 15px 0;
            animation: pulse 1s infinite;
        }
    `;
    document.head.appendChild(style);
}

// Adicionar emojis natalinos aos sistemas
function addChristmasEmojis() {
    const systems = document.querySelectorAll('.system-name');
    const christmasEmojis = ['🎄', '🎁', '🎅', '🌟', '❄️', '🔔'];
    
    systems.forEach(system => {
        const randomEmoji = christmasEmojis[Math.floor(Math.random() * christmasEmojis.length)];
        system.innerHTML = randomEmoji + ' ' + system.innerHTML;
    });
}

// Modificar a função filterLinks para incluir efeitos natalinos
const originalFilterLinks = filterLinks;
filterLinks = function() {
    originalFilterLinks();
    
    // Adicionar efeito especial aos resultados
    const results = document.querySelectorAll('.system-link');
    results.forEach((link, index) => {
        link.style.transitionDelay = `${index * 0.05}s`;
        link.classList.add('christmas-result');
    });
};

// Adicionar classe especial ao body para efeitos natalinos
document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('christmas-theme');
    
    // Efeito de entrada natalino
    setTimeout(() => {
        const h1 = document.querySelector('h1');
        if (h1) {
            h1.style.animation = 'glow 2s infinite alternate';
        }
    }, 500);
});

// Atualizar o tema toggle para modo natalino
const originalThemeToggle = document.getElementById('theme-toggle').onclick;
document.getElementById('theme-toggle').onclick = function() {
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    const logo = document.getElementById('logo');
    
    // Alterna o modo escuro
    body.classList.toggle('dark-mode');
    
    // Muda o ícone do botão para tema natalino
    if (body.classList.contains('dark-mode')) {
        themeToggle.textContent = '🌟';
        themeToggle.style.background = 'linear-gradient(135deg, #2e8b57 0%, #1a472a 100%)';
        if (logo) {
            logo.style.filter = 'hue-rotate(90deg)';
        }
    } else {
        themeToggle.textContent = '🎄';
        themeToggle.style.background = 'linear-gradient(135deg, #d32f2f 0%, #b71c1c 100%)';
        if (logo) {
            logo.style.filter = 'none';
        }
    }
    
    // Salva a preferência no localStorage
    localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
};

// Efeitos especiais para o chat
const chatIcon = document.querySelector('.chat-icon');
if (chatIcon) {
    chatIcon.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(-10deg)';
    });
    
    chatIcon.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
}
