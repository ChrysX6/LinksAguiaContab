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
        },
        2026: {
            'janeiro': 'https://drive.google.com/drive/folders/1wRZCDogRXtmLFOkNtYI6Jt7OBEKAw1qB?usp=drive_link',
            'fevereiro': 'https://drive.google.com/drive/folders/1IsLBfSuS_3fYUSG4eaYgn4Cyz9_DihBg?usp=drive_link',
            'março': 'https://drive.google.com/drive/folders/1hel_PCcbQ7eordwcDS_quj2yvQkta2i4?usp=drive_link',
            'abril': 'https://drive.google.com/drive/folders/1S33RWlzZK2kH_3uHY2Cg5up9M30US469?usp=drive_link',
            'maio': 'https://drive.google.com/drive/folders/1PRlq8rS61KBvndPq1IxsrEBGr_uPGLJ1?usp=drive_link',
            'junho': 'https://drive.google.com/drive/folders/1bDaPzWIXWD_keWIDgeH4MTA-nekTm8X7?usp=drive_link',
            'julho': 'https://drive.google.com/drive/folders/1_p1tWJ5M2qZzGzHHsVljOVznZjRIo_q9?usp=drive_link',
            'agosto': 'https://drive.google.com/drive/folders/1-uf2926nJhyyka2BJyZuSnQo3jJm83x2?usp=drive_link',
            'setembro': 'https://drive.google.com/drive/folders/1JqT0jxqwbGretxBeOsH6g3EeV8DZCyns?usp=drive_link',
            'outubro': 'https://drive.google.com/drive/folders/15DvjIjceDIHRzYIXb0GFfpZbZ2CLCoOi?usp=drive_link',
            'novembro': 'https://drive.google.com/drive/folders/1HAuLNhECCbhV9CA0yjkNinaTb5B-U3zk?usp=drive_link',
            'dezembro': 'https://drive.google.com/drive/folders/1Z5evXqJkpFOugl_CXeN4s6XtqnvfusTv?usp=drive_link'
        }
    },
    'simples-nacional': {
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
        },
        2026: {
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
            logo.src = 'links/img/logo2.png';
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

// Sistema do balão do DeepSeek
document.addEventListener('DOMContentLoaded', function() {
    const deepseekIcon = document.getElementById('deepseekIcon');
    const deepseekTooltip = document.getElementById('deepseekTooltip');
    
    // URL do DeepSeek
    const DEEPSEEK_URL = "https://chat.deepseek.com/";
    
    // Adicionar evento de clique para abrir o DeepSeek
    deepseekIcon.addEventListener('click', function() {
        window.open(DEEPSEEK_URL, '_blank');
    });
    
    // Tooltip automático ao carregar
    setTimeout(() => {
        deepseekTooltip.style.opacity = '1';
        deepseekTooltip.style.transform = 'translateY(0)';
        
        setTimeout(() => {
            deepseekTooltip.style.opacity = '0';
            deepseekTooltip.style.transform = 'translateY(10px)';
        }, 3000);
    }, 1000);
    
    // Adicionar efeito de hover para tooltip
    deepseekIcon.addEventListener('mouseenter', function() {
        deepseekTooltip.style.opacity = '1';
        deepseekTooltip.style.transform = 'translateY(0)';
    });
    
    deepseekIcon.addEventListener('mouseleave', function() {
        deepseekTooltip.style.opacity = '0';
        deepseekTooltip.style.transform = 'translateY(10px)';
    });
});

// ========== BALÃO DE FERRAMENTAS ==========
document.addEventListener('DOMContentLoaded', function() {
    // Base de dados das ferramentas
    const toolsDatabase = [
        {
            id: 'numero-extenso',
            name: 'Número por Extenso',
            description: 'Converte números em texto',
            icon: 'fas fa-font',
            category: 'conversao',
            popular: true
        },
        {
            id: 'calculo-horas',
            name: 'Calculadora de Horas',
            description: 'Soma e subtrai horas e minutos',
            icon: 'fas fa-clock',
            category: 'calculo',
            popular: true
        },
        {
            id: 'maiusculo-minusculo',
            name: 'Converter Texto',
            description: 'MAIÚSCULO ↔ minúsculo',
            icon: 'fas fa-text-height',
            category: 'conversao',
            popular: true
        },
        {
            id: 'calculadora-idade',
            name: 'Calculadora de Idade',
            description: 'Idade exata em anos, meses e dias',
            icon: 'fas fa-birthday-cake',
            category: 'data',
            popular: true
        },
        {
            id: 'dias-uteis',
            name: 'Dias Úteis',
            description: 'Calcula dias úteis entre datas',
            icon: 'fas fa-calendar-check',
            category: 'data',
            popular: false
        },
        {
            id: 'porcentagem',
            name: 'Calculadora de %',
            description: 'Porcentagem e descontos',
            icon: 'fas fa-percent',
            category: 'calculo',
            popular: true
        },
        {
            id: 'formatar-cnpj',
            name: 'Formatar CNPJ/CPF',
            description: 'Formata e valida documentos',
            icon: 'fas fa-id-card',
            category: 'conversao',
            popular: false
        },
        {
            id: 'remover-acentos',
            name: 'Remover Acentos',
            description: 'Remove acentos e caracteres especiais',
            icon: 'fas fa-spell-check',
            category: 'conversao',
            popular: false
        },
        {
            id: 'validador-email',
            name: 'Validar E-mail',
            description: 'Verifica se e-mail é válido',
            icon: 'fas fa-envelope',
            category: 'conversao',
            popular: false
        }
    ];

    // Elementos do DOM
    const toolsIcon = document.getElementById('toolsIcon');
    const toolsPanel = document.getElementById('toolsPanel');
    const closeTools = document.getElementById('closeTools');
    const toolsGrid = document.getElementById('toolsGrid');
    const categoryBtns = document.querySelectorAll('.category-btn');
    const toolsCount = document.getElementById('toolsCount');
    const toolModal = document.getElementById('toolModal');
    const closeToolModal = document.getElementById('closeToolModal');
    const toolModalTitle = document.getElementById('toolModalTitle');
    const toolModalBody = document.getElementById('toolModalBody');

    // Atualizar contador de ferramentas populares
    const popularCount = toolsDatabase.filter(tool => tool.popular).length;
    toolsCount.textContent = popularCount;

    // Renderizar ferramentas
    function renderTools(category = 'todas') {
        let filteredTools = toolsDatabase;
        
        if (category !== 'todas') {
            filteredTools = toolsDatabase.filter(tool => tool.category === category);
        }
        
        toolsGrid.innerHTML = filteredTools.map(tool => `
            <div class="tool-item" data-tool-id="${tool.id}">
                <div class="tool-icon">
                    <i class="${tool.icon}"></i>
                </div>
                <div class="tool-info">
                    <div class="tool-name">${tool.name}</div>
                    <div class="tool-description">${tool.description}</div>
                </div>
                ${tool.popular ? '<span class="tool-badge">Popular</span>' : ''}
            </div>
        `).join('');
        
        document.querySelectorAll('.tool-item').forEach(item => {
            item.addEventListener('click', function(e) {
                e.stopPropagation();
                const toolId = this.dataset.toolId;
                const tool = toolsDatabase.find(t => t.id === toolId);
                if (tool) {
                    openToolModal(tool);
                }
            });
        });
    }

    // Abrir modal da ferramenta
    function openToolModal(tool) {
        toolModalTitle.innerHTML = `<i class="${tool.icon}"></i> ${tool.name}`;
        toolModalBody.innerHTML = getToolContent(tool.id);
        toolModal.classList.add('active');
        
        setTimeout(() => {
            initializeTool(tool.id);
        }, 150);
    }

    // Conteúdo das ferramentas
    function getToolContent(toolId) {
        switch(toolId) {
            case 'numero-extenso':
                return `
                    <div class="tool-container">
                        <div class="tool-input-group">
                            <label><i class="fas fa-hashtag"></i> Digite um número:</label>
                            <input type="text" id="numeroInput" class="tool-input" placeholder="Ex: 1234,56" value="1500">
                        </div>
                        <button id="converterNumero" class="tool-button">
                            <i class="fas fa-sync-alt"></i> Converter
                        </button>
                        <div id="resultadoExtenso" class="tool-result" style="display: none;">
                            <span id="extensoTexto"></span>
                            <small>Por extenso</small>
                        </div>
                        <div class="tool-actions">
                            <button id="copiarExtenso" class="tool-action-btn" style="display: none;">
                                <i class="fas fa-copy"></i> Copiar
                            </button>
                        </div>
                    </div>
                `;
            
            case 'calculo-horas':
                return `
                    <div class="tool-container">
                        <div class="tool-input-group">
                            <label><i class="fas fa-hourglass-start"></i> Hora inicial:</label>
                            <input type="time" id="horaInicial" class="tool-input" value="08:00">
                        </div>
                        <div class="tool-input-group">
                            <label><i class="fas fa-hourglass-end"></i> Hora final:</label>
                            <input type="time" id="horaFinal" class="tool-input" value="17:00">
                        </div>
                        <div class="tool-input-group">
                            <label><i class="fas fa-coffee"></i> Intervalo (minutos):</label>
                            <input type="number" id="intervaloHoras" class="tool-input" value="60" min="0" step="5">
                        </div>
                        <button id="calcularHoras" class="tool-button">
                            <i class="fas fa-clock"></i> Calcular
                        </button>
                        <div id="resultadoHoras" class="tool-result" style="display: none;">
                            <span id="horasTexto"></span>
                            <small>Total de horas trabalhadas</small>
                        </div>
                        <div class="tool-actions">
                            <button id="copiarHoras" class="tool-action-btn" style="display: none;">
                                <i class="fas fa-copy"></i> Copiar
                            </button>
                        </div>
                    </div>
                `;
            
            case 'maiusculo-minusculo':
                return `
                    <div class="tool-container">
                        <div class="tool-input-group">
                            <label><i class="fas fa-pencil-alt"></i> Digite seu texto:</label>
                            <textarea id="textoConverter" class="tool-textarea" placeholder="Digite aqui..."></textarea>
                        </div>
                        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                            <button id="paraMaiusculo" class="tool-button" style="flex: 1;">
                                <i class="fas fa-arrow-up"></i> MAIÚSCULO
                            </button>
                            <button id="paraMinusculo" class="tool-button" style="flex: 1;">
                                <i class="fas fa-arrow-down"></i> minúsculo
                            </button>
                        </div>
                        <button id="capitalizarTexto" class="tool-button">
                            <i class="fas fa-format"></i> Primeira Letra Maiúscula
                        </button>
                        <div id="resultadoTexto" class="tool-result" style="display: none;">
                            <span id="textoConvertido"></span>
                        </div>
                        <div class="tool-actions">
                            <button id="copiarTexto" class="tool-action-btn" style="display: none;">
                                <i class="fas fa-copy"></i> Copiar
                            </button>
                        </div>
                    </div>
                `;
            
            case 'calculadora-idade':
                return `
                    <div class="tool-container">
                        <div class="tool-input-group">
                            <label><i class="fas fa-calendar"></i> Data de Nascimento:</label>
                            <input type="date" id="dataNascimento" class="tool-input">
                        </div>
                        <button id="calcularIdade" class="tool-button">
                            <i class="fas fa-birthday-cake"></i> Calcular Idade
                        </button>
                        <div id="resultadoIdade" class="tool-result" style="display: none;">
                            <span id="idadeTexto"></span>
                            <small>Idade completa</small>
                        </div>
                    </div>
                `;
            
            case 'dias-uteis':
                return `
                    <div class="tool-container">
                        <div class="tool-input-group">
                            <label><i class="fas fa-calendar-alt"></i> Data inicial:</label>
                            <input type="date" id="dataInicial" class="tool-input">
                        </div>
                        <div class="tool-input-group">
                            <label><i class="fas fa-calendar-alt"></i> Data final:</label>
                            <input type="date" id="dataFinal" class="tool-input">
                        </div>
                        <button id="calcularDiasUteis" class="tool-button">
                            <i class="fas fa-briefcase"></i> Calcular Dias Úteis
                        </button>
                        <div id="resultadoDiasUteis" class="tool-result" style="display: none;">
                            <span id="diasUteisTexto"></span>
                            <small>Exclui sábados e domingos</small>
                        </div>
                    </div>
                `;
            
            case 'porcentagem':
                return `
                    <div class="tool-container">
                        <div class="tool-input-group">
                            <label><i class="fas fa-percent"></i> Calcular:</label>
                            <select id="tipoPorcentagem" class="tool-input">
                                <option value="quanto-e">Quanto é X% de Y?</option>
                                <option value="desconto">Desconto - X% de Y</option>
                                <option value="aumento">Aumento - X% de Y</option>
                            </select>
                        </div>
                        <div style="display: flex; gap: 10px;">
                            <div class="tool-input-group" style="flex: 1;">
                                <label>Valor %:</label>
                                <input type="number" id="porcentagemValor" class="tool-input" placeholder="Ex: 10">
                            </div>
                            <div class="tool-input-group" style="flex: 1;">
                                <label>Total:</label>
                                <input type="number" id="totalValor" class="tool-input" placeholder="Ex: 200">
                            </div>
                        </div>
                        <button id="calcularPorcentagem" class="tool-button">
                            <i class="fas fa-equals"></i> Calcular
                        </button>
                        <div id="resultadoPorcentagem" class="tool-result" style="display: none;">
                            <span id="porcentagemTexto"></span>
                        </div>
                    </div>
                `;
            
            case 'formatar-cnpj':
                return `
                    <div class="tool-container">
                        <div class="tool-input-group">
                            <label><i class="fas fa-id-card"></i> Digite CPF ou CNPJ:</label>
                            <input type="text" id="documentoInput" class="tool-input" placeholder="Ex: 12345678900123 ou 12345678901">
                        </div>
                        <button id="formatarDocumento" class="tool-button">
                            <i class="fas fa-magic"></i> Formatar / Validar
                        </button>
                        <div id="resultadoDocumento" class="tool-result" style="display: none;">
                            <span id="documentoTexto"></span>
                            <small id="documentoStatus"></small>
                        </div>
                    </div>
                `;
            
            case 'remover-acentos':
                return `
                    <div class="tool-container">
                        <div class="tool-input-group">
                            <label><i class="fas fa-spell-check"></i> Texto com acentos:</label>
                            <textarea id="textoComAcentos" class="tool-textarea" placeholder="Digite aqui..."></textarea>
                        </div>
                        <button id="removerAcentosBtn" class="tool-button">
                            <i class="fas fa-eraser"></i> Remover Acentos
                        </button>
                        <div id="resultadoSemAcentos" class="tool-result" style="display: none;">
                            <span id="textoSemAcentos"></span>
                        </div>
                        <div class="tool-actions">
                            <button id="copiarSemAcentos" class="tool-action-btn" style="display: none;">
                                <i class="fas fa-copy"></i> Copiar
                            </button>
                        </div>
                    </div>
                `;
            
            case 'validador-email':
                return `
                    <div class="tool-container">
                        <div class="tool-input-group">
                            <label><i class="fas fa-envelope"></i> Digite o e-mail:</label>
                            <input type="email" id="emailValidar" class="tool-input" placeholder="exemplo@dominio.com">
                        </div>
                        <button id="validarEmailBtn" class="tool-button">
                            <i class="fas fa-check-circle"></i> Validar
                        </button>
                        <div id="resultadoEmail" class="tool-result" style="display: none;">
                            <span id="emailTexto"></span>
                            <small id="emailStatus"></small>
                        </div>
                    </div>
                `;
            
            default:
                return '<p>Ferramenta em desenvolvimento...</p>';
        }
    }

    // Inicializar ferramenta específica
    function initializeTool(toolId) {
        switch(toolId) {
            case 'numero-extenso':
                initNumeroExtenso();
                break;
            case 'calculo-horas':
                initCalculoHoras();
                break;
            case 'maiusculo-minusculo':
                initConversaoTexto();
                break;
            case 'calculadora-idade':
                initCalculadoraIdade();
                break;
            case 'dias-uteis':
                initDiasUteis();
                break;
            case 'porcentagem':
                initPorcentagem();
                break;
            case 'formatar-cnpj':
                initFormatarDocumento();
                break;
            case 'remover-acentos':
                initRemoverAcentos();
                break;
            case 'validador-email':
                initValidadorEmail();
                break;
        }
    }

    // ========== FUNÇÕES DAS FERRAMENTAS ==========

    // 1. Número por Extenso
    function initNumeroExtenso() {
        const converterBtn = document.getElementById('converterNumero');
        if (!converterBtn) return;
        
        const novoBotao = converterBtn.cloneNode(true);
        converterBtn.parentNode.replaceChild(novoBotao, converterBtn);
        
        novoBotao.addEventListener('click', function(e) {
            e.preventDefault();
            
            const numeroInput = document.getElementById('numeroInput');
            if (!numeroInput) return;
            
            let valor = numeroInput.value.trim().replace(',', '.');
            if (valor === '') {
                alert('Digite um número!');
                return;
            }
            
            const numeroFloat = parseFloat(valor);
            if (isNaN(numeroFloat)) {
                alert('Digite um número válido!');
                return;
            }
            
            const numeroExtenso = numeroPorExtenso(numeroFloat);
            
            const extensoTexto = document.getElementById('extensoTexto');
            const resultadoDiv = document.getElementById('resultadoExtenso');
            const copiarBtn = document.getElementById('copiarExtenso');
            
            if (extensoTexto) extensoTexto.textContent = numeroExtenso;
            if (resultadoDiv) resultadoDiv.style.display = 'block';
            if (copiarBtn) copiarBtn.style.display = 'inline-flex';
        });
        
        const copiarBtn = document.getElementById('copiarExtenso');
        if (copiarBtn) {
            const novoCopiar = copiarBtn.cloneNode(true);
            copiarBtn.parentNode.replaceChild(novoCopiar, copiarBtn);
            
            novoCopiar.addEventListener('click', function(e) {
                e.preventDefault();
                const extensoTexto = document.getElementById('extensoTexto');
                if (extensoTexto && extensoTexto.textContent) {
                    navigator.clipboard.writeText(extensoTexto.textContent)
                        .then(() => alert('Texto copiado!'));
                }
            });
        }
    }

    // Função de número por extenso
    function numeroPorExtenso(valor) {
        if (valor === 0 || valor === '0') return 'Zero reais';
        
        const valorStr = valor.toFixed(2).toString().replace('.', '').padStart(3, '0');
        const reais = parseInt(valorStr.slice(0, -2)) || 0;
        const centavos = parseInt(valorStr.slice(-2)) || 0;
        
        const unidades = ['', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove'];
        const especiais = ['dez', 'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'];
        const dezenas = ['', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'];
        const centenas = ['', 'cento', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setecentos', 'oitocentos', 'novecentos'];
        
        function converterTresDigitos(num) {
            if (num === 0) return '';
            if (num === 100) return 'cem';
            
            let resultado = '';
            const centena = Math.floor(num / 100);
            
            if (centena > 0) {
                resultado += centenas[centena];
                if (num % 100 !== 0) resultado += ' e ';
            }
            
            const resto = num % 100;
            if (resto > 0) {
                if (resto < 10) resultado += unidades[resto];
                else if (resto < 20) resultado += especiais[resto - 10];
                else {
                    resultado += dezenas[Math.floor(resto / 10)];
                    if (resto % 10 > 0) resultado += ' e ' + unidades[resto % 10];
                }
            }
            
            return resultado;
        }
        
        function converterMilhar(num) {
            if (num === 0) return '';
            
            const milhar = Math.floor(num / 1000);
            const resto = num % 1000;
            let resultado = '';
            
            if (milhar > 0) {
                if (milhar === 1) resultado += 'mil';
                else resultado += converterTresDigitos(milhar) + ' mil';
            }
            
            if (resto > 0) {
                if (milhar > 0) resultado += ' e ';
                resultado += converterTresDigitos(resto);
            }
            
            return resultado;
        }
        
        function converterMilhao(num) {
            if (num === 0) return '';
            
            const milhao = Math.floor(num / 1000000);
            const resto = num % 1000000;
            let resultado = '';
            
            if (milhao > 0) {
                if (milhao === 1) resultado += 'um milhão';
                else resultado += converterTresDigitos(milhao) + ' milhões';
            }
            
            if (resto > 0) {
                if (milhao > 0) resultado += ' e ';
                resultado += converterMilhar(resto);
            }
            
            return resultado;
        }
        
        let extenso = '';
        
        if (reais > 0) {
            if (reais >= 1000000) extenso = converterMilhao(reais);
            else if (reais >= 1000) extenso = converterMilhar(reais);
            else extenso = converterTresDigitos(reais);
            
            if (extenso === '') extenso = 'zero';
            extenso += reais === 1 ? ' real' : ' reais';
        }
        
        if (centavos > 0) {
            if (reais > 0) extenso += ' e ';
            
            if (centavos === 1) extenso += 'um centavo';
            else if (centavos === 100) extenso += 'cem centavos';
            else {
                const centavosExtenso = converterTresDigitos(centavos);
                extenso += (centavosExtenso || centavos) + ' centavos';
            }
        }
        
        if (reais === 0 && centavos > 0) {
            if (centavos === 1) extenso = 'um centavo';
            else if (centavos === 100) extenso = 'cem centavos';
            else {
                const centavosExtenso = converterTresDigitos(centavos);
                extenso = (centavosExtenso || centavos) + ' centavos';
            }
        }
        
        extenso = extenso.replace('undefined', '').trim();
        if (extenso.startsWith('e ')) extenso = extenso.substring(2);
        
        return extenso.charAt(0).toUpperCase() + extenso.slice(1);
    }

    // 2. Cálculo de Horas
    function initCalculoHoras() {
        const btn = document.getElementById('calcularHoras');
        if (!btn) return;
        
        const novoBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(novoBtn, btn);
        
        novoBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const horaInicial = document.getElementById('horaInicial').value;
            const horaFinal = document.getElementById('horaFinal').value;
            const intervalo = parseInt(document.getElementById('intervaloHoras').value) || 0;
            const resultadoDiv = document.getElementById('resultadoHoras');
            const horasTexto = document.getElementById('horasTexto');
            const copiarBtn = document.getElementById('copiarHoras');
            
            if (!horaInicial || !horaFinal) {
                alert('Preencha os horários!');
                return;
            }
            
            const [h1, m1] = horaInicial.split(':').map(Number);
            const [h2, m2] = horaFinal.split(':').map(Number);
            
            let minutosInicio = h1 * 60 + m1;
            let minutosFim = h2 * 60 + m2;
            
            if (minutosFim < minutosInicio) minutosFim += 24 * 60;
            
            let totalMinutos = minutosFim - minutosInicio - intervalo;
            if (totalMinutos < 0) totalMinutos = 0;
            
            const horas = Math.floor(totalMinutos / 60);
            const minutos = totalMinutos % 60;
            
            horasTexto.innerHTML = `${horas}h ${minutos}min <br> <small style="font-size: 14px;">${(totalMinutos / 60).toFixed(2)} horas decimais</small>`;
            resultadoDiv.style.display = 'block';
            if (copiarBtn) copiarBtn.style.display = 'inline-flex';
        });
        
        const copiarBtn = document.getElementById('copiarHoras');
        if (copiarBtn) {
            const novoCopiar = copiarBtn.cloneNode(true);
            copiarBtn.parentNode.replaceChild(novoCopiar, copiarBtn);
            
            novoCopiar.addEventListener('click', function(e) {
                e.preventDefault();
                const horasTexto = document.getElementById('horasTexto');
                const texto = horasTexto.childNodes[0].nodeValue.trim();
                navigator.clipboard.writeText(texto);
                alert('Horário copiado!');
            });
        }
    }

    // 3. Conversão de Texto
    function initConversaoTexto() {
        const paraMaiusculo = document.getElementById('paraMaiusculo');
        const paraMinusculo = document.getElementById('paraMinusculo');
        const capitalizar = document.getElementById('capitalizarTexto');
        const resultadoDiv = document.getElementById('resultadoTexto');
        const textoConvertido = document.getElementById('textoConvertido');
        const copiarBtn = document.getElementById('copiarTexto');
        const textoInput = document.getElementById('textoConverter');
        
        function converterTexto(tipo) {
            const texto = textoInput.value;
            if (!texto) {
                alert('Digite algum texto!');
                return;
            }
            
            let resultado = '';
            if (tipo === 'maiusculo') resultado = texto.toUpperCase();
            else if (tipo === 'minusculo') resultado = texto.toLowerCase();
            else if (tipo === 'capitalizar') resultado = texto.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
            
            textoConvertido.textContent = resultado;
            resultadoDiv.style.display = 'block';
            if (copiarBtn) copiarBtn.style.display = 'inline-flex';
        }
        
        if (paraMaiusculo) {
            const novoMaiusculo = paraMaiusculo.cloneNode(true);
            paraMaiusculo.parentNode.replaceChild(novoMaiusculo, paraMaiusculo);
            novoMaiusculo.addEventListener('click', () => converterTexto('maiusculo'));
        }
        
        if (paraMinusculo) {
            const novoMinusculo = paraMinusculo.cloneNode(true);
            paraMinusculo.parentNode.replaceChild(novoMinusculo, paraMinusculo);
            novoMinusculo.addEventListener('click', () => converterTexto('minusculo'));
        }
        
        if (capitalizar) {
            const novoCapitalizar = capitalizar.cloneNode(true);
            capitalizar.parentNode.replaceChild(novoCapitalizar, capitalizar);
            novoCapitalizar.addEventListener('click', () => converterTexto('capitalizar'));
        }
        
        if (copiarBtn) {
            const novoCopiar = copiarBtn.cloneNode(true);
            copiarBtn.parentNode.replaceChild(novoCopiar, copiarBtn);
            novoCopiar.addEventListener('click', function() {
                navigator.clipboard.writeText(textoConvertido.textContent);
                alert('Texto copiado!');
            });
        }
    }

    // 4. Calculadora de Idade
    function initCalculadoraIdade() {
        const btn = document.getElementById('calcularIdade');
        if (!btn) return;
        
        const novoBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(novoBtn, btn);
        
        novoBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const dataNasc = document.getElementById('dataNascimento').value;
            const resultadoDiv = document.getElementById('resultadoIdade');
            const idadeTexto = document.getElementById('idadeTexto');
            
            if (!dataNasc) {
                alert('Selecione a data de nascimento!');
                return;
            }
            
            const hoje = new Date();
            const nasc = new Date(dataNasc);
            
            let idade = hoje.getFullYear() - nasc.getFullYear();
            const mes = hoje.getMonth() - nasc.getMonth();
            
            if (mes < 0 || (mes === 0 && hoje.getDate() < nasc.getDate())) idade--;
            
            let meses = hoje.getMonth() - nasc.getMonth();
            if (meses < 0) meses += 12;
            
            let dias = hoje.getDate() - nasc.getDate();
            if (dias < 0) {
                const ultimoMes = new Date(hoje.getFullYear(), hoje.getMonth(), 0);
                dias = ultimoMes.getDate() - nasc.getDate() + hoje.getDate();
                meses--;
                if (meses < 0) meses += 12;
            }
            
            idadeTexto.innerHTML = `${idade} anos, ${meses} meses e ${dias} dias`;
            resultadoDiv.style.display = 'block';
        });
    }

    // 5. Dias Úteis
    function initDiasUteis() {
        const btn = document.getElementById('calcularDiasUteis');
        if (!btn) return;
        
        const novoBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(novoBtn, btn);
        
        novoBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const dataInicial = document.getElementById('dataInicial').value;
            const dataFinal = document.getElementById('dataFinal').value;
            const resultadoDiv = document.getElementById('resultadoDiasUteis');
            const diasUteisTexto = document.getElementById('diasUteisTexto');
            
            if (!dataInicial || !dataFinal) {
                alert('Selecione as datas!');
                return;
            }
            
            let inicio = new Date(dataInicial);
            let fim = new Date(dataFinal);
            let diasUteis = 0;
            
            while (inicio <= fim) {
                const diaSemana = inicio.getDay();
                if (diaSemana !== 0 && diaSemana !== 6) diasUteis++;
                inicio.setDate(inicio.getDate() + 1);
            }
            
            diasUteisTexto.textContent = `${diasUteis} dias úteis`;
            resultadoDiv.style.display = 'block';
        });
    }

    // 6. Porcentagem
    function initPorcentagem() {
        const btn = document.getElementById('calcularPorcentagem');
        if (!btn) return;
        
        const novoBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(novoBtn, btn);
        
        novoBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const tipo = document.getElementById('tipoPorcentagem').value;
            const porcentagem = parseFloat(document.getElementById('porcentagemValor').value) || 0;
            const total = parseFloat(document.getElementById('totalValor').value) || 0;
            const resultadoDiv = document.getElementById('resultadoPorcentagem');
            const porcentagemTexto = document.getElementById('porcentagemTexto');
            
            if (porcentagem === 0 || total === 0) {
                alert('Preencha todos os valores!');
                return;
            }
            
            let resultado = 0;
            let texto = '';
            
            if (tipo === 'quanto-e') {
                resultado = (porcentagem * total) / 100;
                texto = `${porcentagem}% de R$ ${total.toFixed(2)} = R$ ${resultado.toFixed(2)}`;
            } else if (tipo === 'desconto') {
                resultado = total - (total * porcentagem / 100);
                texto = `${porcentagem}% de desconto: R$ ${resultado.toFixed(2)}`;
            } else if (tipo === 'aumento') {
                resultado = total + (total * porcentagem / 100);
                texto = `${porcentagem}% de aumento: R$ ${resultado.toFixed(2)}`;
            }
            
            porcentagemTexto.textContent = texto;
            resultadoDiv.style.display = 'block';
        });
    }

    // 7. Formatar CPF/CNPJ
    function initFormatarDocumento() {
        const btn = document.getElementById('formatarDocumento');
        if (!btn) return;
        
        const novoBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(novoBtn, btn);
        
        novoBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const doc = document.getElementById('documentoInput').value.replace(/\D/g, '');
            const resultadoDiv = document.getElementById('resultadoDocumento');
            const documentoTexto = document.getElementById('documentoTexto');
            const documentoStatus = document.getElementById('documentoStatus');
            
            if (!doc) {
                alert('Digite o número do documento!');
                return;
            }
            
            let formatado = '';
            let valido = false;
            let tipo = '';
            
            if (doc.length === 11) {
                formatado = doc.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
                valido = validarCPF(doc);
                tipo = 'CPF';
            } else if (doc.length === 14) {
                formatado = doc.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
                valido = validarCNPJ(doc);
                tipo = 'CNPJ';
            } else {
                documentoTexto.textContent = 'Documento inválido!';
                documentoStatus.textContent = 'Verifique a quantidade de dígitos';
                resultadoDiv.style.display = 'block';
                return;
            }
            
            documentoTexto.textContent = formatado;
            documentoStatus.textContent = `${tipo} ${valido ? 'válido ✓' : 'inválido ✗'}`;
            documentoStatus.style.color = valido ? 'var(--accent-color)' : '#dc3545';
            resultadoDiv.style.display = 'block';
        });
    }

    // 8. Remover Acentos
    function initRemoverAcentos() {
        const btn = document.getElementById('removerAcentosBtn');
        if (!btn) return;
        
        const novoBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(novoBtn, btn);
        
        novoBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const texto = document.getElementById('textoComAcentos').value;
            const resultadoDiv = document.getElementById('resultadoSemAcentos');
            const textoSemAcentos = document.getElementById('textoSemAcentos');
            const copiarBtn = document.getElementById('copiarSemAcentos');
            
            if (!texto) {
                alert('Digite algum texto!');
                return;
            }
            
            const semAcentos = texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            textoSemAcentos.textContent = semAcentos;
            resultadoDiv.style.display = 'block';
            if (copiarBtn) copiarBtn.style.display = 'inline-flex';
        });
        
        const copiarBtn = document.getElementById('copiarSemAcentos');
        if (copiarBtn) {
            const novoCopiar = copiarBtn.cloneNode(true);
            copiarBtn.parentNode.replaceChild(novoCopiar, copiarBtn);
            
            novoCopiar.addEventListener('click', function(e) {
                e.preventDefault();
                const texto = document.getElementById('textoSemAcentos').textContent;
                navigator.clipboard.writeText(texto);
                alert('Texto copiado!');
            });
        }
    }

    // 9. Validador de E-mail
    function initValidadorEmail() {
        const btn = document.getElementById('validarEmailBtn');
        if (!btn) return;
        
        const novoBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(novoBtn, btn);
        
        novoBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('emailValidar').value;
            const resultadoDiv = document.getElementById('resultadoEmail');
            const emailTexto = document.getElementById('emailTexto');
            const emailStatus = document.getElementById('emailStatus');
            
            if (!email) {
                alert('Digite um e-mail!');
                return;
            }
            
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const valido = regex.test(email);
            
            emailTexto.textContent = email;
            emailStatus.textContent = valido ? 'E-mail válido ✓' : 'E-mail inválido ✗';
            emailStatus.style.color = valido ? 'var(--accent-color)' : '#dc3545';
            resultadoDiv.style.display = 'block';
        });
    }

    // ========== FUNÇÕES AUXILIARES ==========
    function validarCPF(cpf) {
        cpf = cpf.replace(/\D/g, '');
        if (cpf.length !== 11) return false;
        if (/^(\d)\1+$/.test(cpf)) return false;
        
        let soma = 0;
        let resto;
        
        for (let i = 1; i <= 9; i++) {
            soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.substring(9, 10))) return false;
        
        soma = 0;
        for (let i = 1; i <= 10; i++) {
            soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.substring(10, 11))) return false;
        
        return true;
    }

    function validarCNPJ(cnpj) {
        cnpj = cnpj.replace(/\D/g, '');
        if (cnpj.length !== 14) return false;
        if (/^(\d)\1+$/.test(cnpj)) return false;
        
        let tamanho = cnpj.length - 2;
        let numeros = cnpj.substring(0, tamanho);
        let digitos = cnpj.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;
        
        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) pos = 9;
        }
        
        let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
        if (resultado !== parseInt(digitos.charAt(0))) return false;
        
        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        
        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) pos = 9;
        }
        
        resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
        if (resultado !== parseInt(digitos.charAt(1))) return false;
        
        return true;
    }

    // ========== EVENT LISTENERS DO BALÃO DE FERRAMENTAS ==========
    
    toolsIcon.addEventListener('click', function() {
        toolsPanel.classList.add('active');
        renderTools('todas');
        categoryBtns.forEach(btn => btn.classList.remove('active'));
        document.querySelector('[data-category="todas"]').classList.add('active');
    });

    closeTools.addEventListener('click', function() {
        toolsPanel.classList.remove('active');
    });

    document.addEventListener('click', function(event) {
        const toolsBubble = document.getElementById('toolsBubble');
        if (!toolsBubble.contains(event.target) && toolsPanel.classList.contains('active')) {
            toolsPanel.classList.remove('active');
        }
    });

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            renderTools(category);
        });
    });

    closeToolModal.addEventListener('click', function() {
        toolModal.classList.remove('active');
    });

    window.addEventListener('click', function(event) {
        if (event.target === toolModal) {
            toolModal.classList.remove('active');
        }
    });

    toolsPanel.addEventListener('click', function(event) {
        event.stopPropagation();
    });
});

// ========== BALÃO DE RECADOS COMPARTILHADO ==========
document.addEventListener('DOMContentLoaded', function() {
    // ===== URL DO GOOGLE APPS SCRIPT =====
    const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbzVd7j35SWxbCTJvK8QBXe8ZE5j_QTDHDxBYfR20pncdI55E2BDgXgB4UOKZk2ZYrZO/exec';
    // =======================================
    
    // Elementos do DOM
    const recadosIcon = document.getElementById('recadosIcon');
    const recadosPanel = document.getElementById('recadosPanel');
    const closeRecados = document.getElementById('closeRecados');
    const recadosList = document.getElementById('recadosList');
    const novoRecado = document.getElementById('novoRecado');
    const btnPublicar = document.getElementById('publicarRecado');
    const chkAnonimo = document.getElementById('recadoAnonimo');
    const recadosCount = document.getElementById('recadosCount');
    
    let recados = [];
    let recadosLidos = JSON.parse(localStorage.getItem('recadosLidos') || '[]');
    
    // ===== CARREGAR RECADOS DO GOOGLE SHEETS =====
    async function carregarRecados() {
        try {
            const response = await fetch(GOOGLE_SHEETS_URL);
            recados = await response.json();
            
            // Marcar quais já foram lidos por este usuário
            recados.forEach(recado => {
                recado.lido = recadosLidos.includes(recado.id);
            });
            
            renderizarRecados();
            atualizarContador();
        } catch (error) {
            console.error('Erro ao carregar recados:', error);
            
            // Fallback: mostrar mensagem de erro amigável
            if (recadosList) {
                recadosList.innerHTML = `
                    <div style="text-align: center; padding: 40px 20px; color: var(--text-secondary);">
                        <i class="fas fa-exclamation-triangle" style="font-size: 48px; margin-bottom: 15px; opacity: 0.5;"></i>
                        <p style="margin-bottom: 5px;">Não foi possível carregar os recados</p>
                        <small style="font-size: 12px;">Tente novamente mais tarde</small>
                    </div>
                `;
            }
        }
    }
    
    // ===== PUBLICAR RECADO NO GOOGLE SHEETS =====
    async function publicarRecado() {
        if (!novoRecado) return;
        
        const texto = novoRecado.value.trim();
        if (!texto) {
            alert('Digite um recado!');
            return;
        }
        
        // Desabilitar botão enquanto publica
        const btn = document.getElementById('publicarRecado');
        const textoOriginal = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Publicando...';
        btn.disabled = true;
        
        try {
            // Pegar nome do usuário
            let autor = chkAnonimo && chkAnonimo.checked ? 'Anônimo' : localStorage.getItem('userName');
            
            if (!autor || autor === 'Anônimo') {
                autor = prompt('Digite seu nome:');
                if (!autor) {
                    btn.innerHTML = textoOriginal;
                    btn.disabled = false;
                    return;
                }
                localStorage.setItem('userName', autor);
            }
            
            const novoRecadoObj = {
                id: Date.now(),
                texto: texto,
                autor: autor,
                data: new Date().toISOString(),
                visualizacoes: 0
            };
            
            // Enviar para o Google Sheets
            const response = await fetch(GOOGLE_SHEETS_URL, {
                method: 'POST',
                mode: 'no-cors', // Importante para Apps Script
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(novoRecadoObj)
            });
            
            // Como é no-cors, não podemos verificar response.ok
            // Então assumimos que deu certo
            novoRecado.value = '';
            if (chkAnonimo) chkAnonimo.checked = false;
            
            // Feedback visual
            btn.innerHTML = '<i class="fas fa-check"></i> Publicado!';
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-paper-plane"></i> Publicar';
                btn.disabled = false;
            }, 1500);
            
            // Aguarda 1 segundo e recarrega os recados
            setTimeout(() => {
                carregarRecados();
            }, 1000);
            
        } catch (error) {
            console.error('Erro ao publicar:', error);
            alert('Erro ao publicar recado. Tente novamente!');
            
            btn.innerHTML = textoOriginal;
            btn.disabled = false;
        }
    }
    
    // ===== MARCAR COMO VISTO =====
    async function marcarComoVisto(id) {
        const recado = recados.find(r => r.id === id);
        if (!recado || recado.lido) return;
        
        try {
            // Atualizar visualizações
            recado.visualizacoes = (recado.visualizacoes || 0) + 1;
            recado.lido = true;
            
            // Salvar no localStorage que este usuário viu
            if (!recadosLidos.includes(id)) {
                recadosLidos.push(id);
                localStorage.setItem('recadosLidos', JSON.stringify(recadosLidos));
            }
            
            // Atualizar no Google Sheets
            await fetch(GOOGLE_SHEETS_URL, {
                method: 'PUT',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: recado.id,
                    visualizacoes: recado.visualizacoes
                })
            });
            
            renderizarRecados();
            atualizarContador();
        } catch (error) {
            console.error('Erro ao atualizar visualização:', error);
        }
    }
    
    // ===== ATUALIZAR CONTADOR =====
    function atualizarContador() {
        const naoLidos = recados.filter(r => !r.lido).length;
        recadosCount.textContent = naoLidos;
        recadosCount.style.display = naoLidos > 0 ? 'flex' : 'none';
    }
    
    // ===== FORMATAR DATA =====
    function formatarData(data) {
        const hoje = new Date();
        const ontem = new Date();
        ontem.setDate(ontem.getDate() - 1);
        const dataObj = new Date(data);
        
        if (dataObj.toDateString() === hoje.toDateString()) {
            return `Hoje às ${dataObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
        } else if (dataObj.toDateString() === ontem.toDateString()) {
            return `Ontem às ${dataObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
        } else {
            return dataObj.toLocaleDateString('pt-BR') + ' às ' + 
                   dataObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        }
    }
    
    // ===== RENDERIZAR RECADOS =====
    function renderizarRecados() {
        if (!recadosList) return;
        
        if (recados.length === 0) {
            recadosList.innerHTML = `
                <div style="text-align: center; padding: 40px 20px; color: var(--text-secondary);">
                    <i class="fas fa-sticky-note" style="font-size: 48px; margin-bottom: 15px; opacity: 0.5;"></i>
                    <p style="margin-bottom: 5px;">Nenhum recado ainda</p>
                    <small style="font-size: 12px;">Seja o primeiro a publicar!</small>
                </div>
            `;
            return;
        }
        
        // Ordenar por data (mais recente primeiro)
        const recadosOrdenados = [...recados].sort((a, b) => new Date(b.data) - new Date(a.data));
        
        recadosList.innerHTML = recadosOrdenados.map(recado => {
            const dataFormatada = formatarData(recado.data);
            const lido = recado.lido || false;
            
            return `
                <div class="recado-item" data-id="${recado.id}" style="${lido ? 'opacity: 0.8;' : ''}">
                    <div class="recado-header">
                        <span class="recado-autor">
                            <i class="fas fa-user-circle"></i> ${recado.autor}
                        </span>
                        <span class="recado-data">
                            <i class="fas fa-clock"></i> ${dataFormatada}
                        </span>
                    </div>
                    <div class="recado-texto">${recado.texto.replace(/\n/g, '<br>')}</div>
                    <div class="recado-footer">
                        <span class="recado-visualizacoes">
                            <i class="fas fa-eye"></i> ${recado.visualizacoes || 0} visualizações
                        </span>
                        <button class="btn-visualizado" data-id="${recado.id}" ${lido ? 'disabled' : ''}>
                            <i class="fas ${lido ? 'fa-check-circle' : 'fa-check'}"></i> 
                            ${lido ? 'Visto' : 'Marcar como visto'}
                        </button>
                    </div>
                </div>
            `;
        }).join('');
        
        // Adicionar eventos aos botões de visualização
        document.querySelectorAll('.btn-visualizado').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const id = parseInt(this.dataset.id);
                marcarComoVisto(id);
            });
        });
        
        atualizarContador();
    }
    
    // ===== EVENT LISTENERS =====
    if (recadosIcon) {
        recadosIcon.addEventListener('click', function() {
            recadosPanel.classList.add('active');
            carregarRecados(); // Recarrega sempre que abrir
        });
    }
    
    if (closeRecados) {
        closeRecados.addEventListener('click', function() {
            recadosPanel.classList.remove('active');
        });
    }
    
    if (btnPublicar) {
        const novoPublicar = btnPublicar.cloneNode(true);
        btnPublicar.parentNode.replaceChild(novoPublicar, btnPublicar);
        novoPublicar.addEventListener('click', publicarRecado);
    }
    
    if (novoRecado) {
        novoRecado.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                publicarRecado();
            }
        });
    }
    
    // Fechar painel ao clicar fora
    document.addEventListener('click', function(event) {
        const recadosBubble = document.getElementById('recadosBubble');
        if (recadosBubble && !recadosBubble.contains(event.target) && recadosPanel.classList.contains('active')) {
            recadosPanel.classList.remove('active');
        }
    });
    
    // Carregar recados ao iniciar
    carregarRecados();
    
    // Recarregar a cada 30 segundos para ver novos recados
    setInterval(carregarRecados, 30000);
});
