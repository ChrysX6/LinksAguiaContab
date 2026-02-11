// ========== CONFIGURAÇÃO DO GOOGLE SHEETS ==========
const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbzVd7j35SWxbCTJvK8QBXe8ZE5j_QTDHDxBYfR20pncdI55E2BDgXgB4UOKZk2ZYrZO/exec';

// ========== SISTEMA DE BUSCA ==========
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
        name: "DARE ICMS SP",
        description: "Documento de Arrecadação de Receitas Estaduais - ICMS São Paulo",
        url: "https://www4.fazenda.sp.gov.br/DareICMS/DareAvulso",
        icon: "fas fa-file-invoice-dollar",
        tags: ["dare", "icms", "sp"]
    },
];

// ========== MODAL DE ANO/MÊS ==========
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

function showYearSelection(controlType) {
    currentControlType = controlType;
    const modalTitle = document.getElementById('modalTitle');
    modalTitle.textContent = controlType === 'lucro-presumido' ? 'Lucro Presumido/Real - Selecionar Período' : 'Simples Nacional - Selecionar Período';
    document.getElementById('monthSelection').style.display = 'none';
    document.getElementById('yearMonthModal').style.display = 'block';
}

function showMonthSelection(year) {
    const monthGrid = document.getElementById('monthGrid');
    monthGrid.innerHTML = '';
    
    const months = monthLinks[currentControlType][year];
    const monthNames = {
        'janeiro': 'JANEIRO', 'fevereiro': 'FEVEREIRO', 'março': 'MARÇO',
        'abril': 'ABRIL', 'maio': 'MAIO', 'junho': 'JUNHO',
        'julho': 'JULHO', 'agosto': 'AGOSTO', 'setembro': 'SETEMBRO',
        'outubro': 'OUTUBRO', 'novembro': 'NOVEMBRO', 'dezembro': 'DEZEMBRO'
    };
    
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

// ========== SISTEMA DE BUSCA ==========
function initializeSearchResults() {
    displayResults(systemsDatabase, '');
}

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

function highlightText(text, searchTerm) {
    if (!searchTerm.trim()) return text;
    const regex = new RegExp(`(${escapeRegex(searchTerm)})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
}

function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function filterLinks() {
    const searchTerm = document.getElementById('search-bar').value.toLowerCase().trim();
    
    if (searchTerm === '') {
        displayResults(systemsDatabase, '');
        return;
    }

    const results = systemsDatabase.filter(system => {
        return system.name.toLowerCase().includes(searchTerm) ||
               system.description.toLowerCase().includes(searchTerm) ||
               system.tags.some(tag => tag.toLowerCase().includes(searchTerm));
    });

    displayResults(results, searchTerm);
}

// ========== TEMA DARK/LIGHT ==========
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const logo = document.getElementById('logo');
    
    // Aplicar tema salvo
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '🌙';
        if (logo) logo.src = 'links/img/logo2.png';
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            themeToggle.textContent = '🌙';
            localStorage.setItem('theme', 'dark');
            if (logo) logo.src = 'links/img/logo2.png';
        } else {
            themeToggle.textContent = '☀️';
            localStorage.setItem('theme', 'light');
            if (logo) logo.src = 'links/img/logo1.png';
        }
    });
}

// ========== CHAT COM SENHA ==========
function initChat() {
    const chatIcon = document.querySelector('.chat-icon');
    const chatWindow = document.getElementById('chatWindow');
    const closeChat = document.getElementById('closeChat');
    const passwordInput = document.getElementById('passwordInput');
    const submitPassword = document.getElementById('submitPassword');
    const errorMessage = document.getElementById('errorMessage');
    const CORRECT_PASSWORD = "Gestao2025@";
    const TARGET_LINK = "https://docs.google.com/spreadsheets/d/1fmeTfc1coBy_8LMT8aSjxfh6b9VC1slv/edit?usp=sharing&ouid=104502217953424660775&rtpof=true&sd=true";
    
    chatIcon.addEventListener('click', () => {
        chatWindow.classList.add('active');
        passwordInput.focus();
    });
    
    closeChat.addEventListener('click', () => {
        chatWindow.classList.remove('active');
        resetForm();
    });
    
    document.addEventListener('click', (event) => {
        if (!chatIcon.closest('.chat-bubble').contains(event.target) && chatWindow.classList.contains('active')) {
            chatWindow.classList.remove('active');
            resetForm();
        }
    });
    
    submitPassword.addEventListener('click', validatePassword);
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') validatePassword();
    });
    
    function validatePassword() {
        if (passwordInput.value.trim() === CORRECT_PASSWORD) {
            window.open(TARGET_LINK, '_blank');
            resetForm();
            chatWindow.classList.remove('active');
        } else {
            errorMessage.textContent = "Senha incorreta. Tente novamente.";
            errorMessage.classList.add('show');
            passwordInput.value = '';
            passwordInput.focus();
            setTimeout(() => errorMessage.classList.remove('show'), 3000);
        }
    }
    
    function resetForm() {
        passwordInput.value = '';
        errorMessage.classList.remove('show');
    }
}

// ========== DEEPSEEK ==========
function initDeepSeek() {
    const deepseekIcon = document.getElementById('deepseekIcon');
    deepseekIcon.addEventListener('click', () => window.open('https://chat.deepseek.com/', '_blank'));
}

// ========== BALÃO DE FERRAMENTAS ==========
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
        description: 'Calcula horas trabalhadas (4 horários)',
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
        id: 'porcentagem',
        name: 'Porcentagem e Regra de 3',
        description: 'Calculadora de % e Regra de 3',
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
    }
];

let toolModal, toolModalTitle, toolModalBody, toolsGrid, toolsPanel, toolsIcon, closeTools, categoryBtns, toolsCount;

function initTools() {
    // Elementos do DOM
    toolsIcon = document.getElementById('toolsIcon');
    toolsPanel = document.getElementById('toolsPanel');
    closeTools = document.getElementById('closeTools');
    toolsGrid = document.getElementById('toolsGrid');
    categoryBtns = document.querySelectorAll('.category-btn');
    toolsCount = document.getElementById('toolsCount');
    toolModal = document.getElementById('toolModal');
    closeToolModal = document.getElementById('closeToolModal');
    toolModalTitle = document.getElementById('toolModalTitle');
    toolModalBody = document.getElementById('toolModalBody');

    if (!toolsIcon) return;

    // Atualizar contador
    const popularCount = toolsDatabase.filter(tool => tool.popular).length;
    if (toolsCount) toolsCount.textContent = popularCount;

    // Event listeners
    toolsIcon.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toolsPanel.classList.add('active');
        renderTools('todas');
    });

    closeTools.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toolsPanel.classList.remove('active');
    });

    document.addEventListener('click', (event) => {
        const toolsBubble = document.getElementById('toolsBubble');
        if (toolsBubble && !toolsBubble.contains(event.target) && toolsPanel.classList.contains('active')) {
            toolsPanel.classList.remove('active');
        }
    });

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            renderTools(this.dataset.category);
        });
    });

    closeToolModal.addEventListener('click', () => toolModal.classList.remove('active'));
    window.addEventListener('click', (e) => {
        if (e.target === toolModal) toolModal.classList.remove('active');
    });

    renderTools('todas');
}

function renderTools(category = 'todas') {
    if (!toolsGrid) return;
    
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
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            const tool = toolsDatabase.find(t => t.id === item.dataset.toolId);
            if (tool) openToolModal(tool);
        });
    });
}

function openToolModal(tool) {
    toolModalTitle.innerHTML = `<i class="${tool.icon}"></i> ${tool.name}`;
    toolModalBody.innerHTML = getToolContent(tool.id);
    toolModal.classList.add('active');
    setTimeout(() => initializeTool(tool.id), 150);
}

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
                    <h4 style="margin:0 0 15px 0; color:var(--accent-color);">Período Manhã</h4>
                    <div style="display: flex; gap: 10px; margin-bottom: 15px;">
                        <div class="tool-input-group" style="flex:1;">
                            <label><i class="fas fa-sun"></i> Entrada:</label>
                            <input type="time" id="entradaManha" class="tool-input" value="08:00">
                        </div>
                        <div class="tool-input-group" style="flex:1;">
                            <label><i class="fas fa-cloud"></i> Saída:</label>
                            <input type="time" id="saidaManha" class="tool-input" value="12:00">
                        </div>
                    </div>
                    
                    <h4 style="margin:15px 0; color:var(--accent-color);">Período Tarde</h4>
                    <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                        <div class="tool-input-group" style="flex:1;">
                            <label><i class="fas fa-cloud-sun"></i> Entrada:</label>
                            <input type="time" id="entradaTarde" class="tool-input" value="13:00">
                        </div>
                        <div class="tool-input-group" style="flex:1;">
                            <label><i class="fas fa-moon"></i> Saída:</label>
                            <input type="time" id="saidaTarde" class="tool-input" value="18:00">
                        </div>
                    </div>
                    
                    <button id="calcularHoras" class="tool-button">
                        <i class="fas fa-calculator"></i> Calcular Horas
                    </button>
                    
                    <div id="resultadoHoras" class="tool-result" style="display: none;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                            <span>⏰ Manhã:</span> <span id="horasManha"></span>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                            <span>🌆 Tarde:</span> <span id="horasTarde"></span>
                        </div>
                        <div style="display: flex; justify-content: space-between; font-size: 20px; margin-top: 10px; padding-top: 10px; border-top: 2px solid var(--border-color);">
                            <span><strong>TOTAL:</strong></span>
                            <span id="horasTotal" style="color: var(--accent-color); font-weight: 700;"></span>
                        </div>
                        <small id="horasDecimais" style="display: block; margin-top: 10px;"></small>
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
        
        case 'porcentagem':
            return `
                <div class="tool-container">
                    <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                        <button id="tipoPorcentagem" class="tool-button" style="flex:1; background: var(--gradient-primary);">
                            <i class="fas fa-percent"></i> Porcentagem
                        </button>
                        <button id="tipoRegra3" class="tool-button" style="flex:1; background: var(--bg-secondary); color: var(--text-primary);">
                            <i class="fas fa-equals"></i> Regra de 3
                        </button>
                    </div>
                    
                    <div id="porcentagemContainer">
                        <div class="tool-input-group">
                            <label><i class="fas fa-calculator"></i> Calcular:</label>
                            <select id="tipoPorcentagemCalc" class="tool-input">
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
                    </div>
                    
                    <div id="regra3Container" style="display: none;">
                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
                            <div class="tool-input-group" style="flex:1;">
                                <label>A:</label>
                                <input type="number" id="regraA" class="tool-input" placeholder="Ex: 10">
                            </div>
                            <div style="font-size: 20px;">→</div>
                            <div class="tool-input-group" style="flex:1;">
                                <label>B:</label>
                                <input type="number" id="regraB" class="tool-input" placeholder="Ex: 20">
                            </div>
                        </div>
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <div class="tool-input-group" style="flex:1;">
                                <label>C:</label>
                                <input type="number" id="regraC" class="tool-input" placeholder="Ex: 30">
                            </div>
                            <div style="font-size: 20px;">=</div>
                            <div class="tool-input-group" style="flex:1;">
                                <label>X:</label>
                                <input type="text" id="regraD" class="tool-input" placeholder="Resultado" readonly style="background: var(--bg-accent); font-weight: 700;">
                            </div>
                        </div>
                        <p style="font-size: 12px; color: var(--text-secondary); margin-top: 10px;">
                            <i class="fas fa-info-circle"></i> A → B = C → X
                        </p>
                    </div>
                    
                    <button id="calcularPorcentagem" class="tool-button" style="margin-top: 20px;">
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
                        <input type="text" id="documentoInput" class="tool-input" placeholder="Ex: 12345678900123">
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
        
        default:
            return '<p>Ferramenta em desenvolvimento...</p>';
    }
}

function initializeTool(toolId) {
    switch(toolId) {
        case 'numero-extenso': initNumeroExtenso(); break;
        case 'calculo-horas': initCalculoHoras(); break;
        case 'maiusculo-minusculo': initConversaoTexto(); break;
        case 'porcentagem': initPorcentagemERegra3(); break;
        case 'formatar-cnpj': initFormatarDocumento(); break;
    }
}

// ========== FERRAMENTA 1: NÚMERO POR EXTENSO ==========
function initNumeroExtenso() {
    const btn = document.getElementById('converterNumero');
    if (!btn) return;
    
    const novoBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(novoBtn, btn);
    
    novoBtn.addEventListener('click', () => {
        const input = document.getElementById('numeroInput');
        if (!input.value.trim()) return alert('Digite um número!');
        
        const valor = parseFloat(input.value.replace(',', '.'));
        if (isNaN(valor)) return alert('Digite um número válido!');
        
        const resultado = numeroPorExtenso(valor);
        document.getElementById('extensoTexto').textContent = resultado;
        document.getElementById('resultadoExtenso').style.display = 'block';
        document.getElementById('copiarExtenso').style.display = 'inline-flex';
    });
    
    const copiar = document.getElementById('copiarExtenso');
    if (copiar) {
        const novoCopiar = copiar.cloneNode(true);
        copiar.parentNode.replaceChild(novoCopiar, copiar);
        novoCopiar.addEventListener('click', () => {
            const texto = document.getElementById('extensoTexto').textContent;
            navigator.clipboard.writeText(texto).then(() => alert('Copiado!'));
        });
    }
}

function numeroPorExtenso(valor) {
    if (valor === 0) return 'Zero reais';
    
    const valorStr = valor.toFixed(2).replace('.', '').padStart(3, '0');
    const reais = parseInt(valorStr.slice(0, -2)) || 0;
    const centavos = parseInt(valorStr.slice(-2)) || 0;
    
    const unidades = ['', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove'];
    const especiais = ['dez', 'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'];
    const dezenas = ['', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'];
    const centenas = ['', 'cento', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setecentos', 'oitocentos', 'novecentos'];
    
    function converter(n) {
        if (n === 0) return '';
        if (n === 100) return 'cem';
        
        let r = '';
        const c = Math.floor(n / 100);
        if (c > 0) {
            r += centenas[c];
            if (n % 100 !== 0) r += ' e ';
        }
        
        const resto = n % 100;
        if (resto > 0) {
            if (resto < 10) r += unidades[resto];
            else if (resto < 20) r += especiais[resto - 10];
            else {
                r += dezenas[Math.floor(resto / 10)];
                if (resto % 10 > 0) r += ' e ' + unidades[resto % 10];
            }
        }
        return r;
    }
    
    function milhar(n) {
        if (n === 0) return '';
        const m = Math.floor(n / 1000);
        const r = n % 1000;
        let res = '';
        if (m > 0) res += m === 1 ? 'mil' : converter(m) + ' mil';
        if (r > 0) res += (m > 0 ? ' e ' : '') + converter(r);
        return res;
    }
    
    function milhao(n) {
        if (n === 0) return '';
        const m = Math.floor(n / 1000000);
        const r = n % 1000000;
        let res = '';
        if (m > 0) res += m === 1 ? 'um milhão' : converter(m) + ' milhões';
        if (r > 0) res += (m > 0 ? ' e ' : '') + milhar(r);
        return res;
    }
    
    let extenso = '';
    if (reais > 0) {
        if (reais >= 1000000) extenso = milhao(reais);
        else if (reais >= 1000) extenso = milhar(reais);
        else extenso = converter(reais);
        extenso += reais === 1 ? ' real' : ' reais';
    }
    
    if (centavos > 0) {
        if (reais > 0) extenso += ' e ';
        if (centavos === 1) extenso += 'um centavo';
        else if (centavos === 100) extenso += 'cem centavos';
        else extenso += converter(centavos) + ' centavos';
    }
    
    if (reais === 0 && centavos > 0) {
        extenso = centavos === 1 ? 'um centavo' : converter(centavos) + ' centavos';
    }
    
    return extenso.charAt(0).toUpperCase() + extenso.slice(1);
}

// ========== FERRAMENTA 2: CALCULADORA DE HORAS ==========
function initCalculoHoras() {
    const btn = document.getElementById('calcularHoras');
    if (!btn) return;
    
    const novoBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(novoBtn, btn);
    
    novoBtn.addEventListener('click', () => {
        const eM = document.getElementById('entradaManha').value;
        const sM = document.getElementById('saidaManha').value;
        const eT = document.getElementById('entradaTarde').value;
        const sT = document.getElementById('saidaTarde').value;
        
        if (!eM || !sM || !eT || !sT) return alert('Preencha todos os horários!');
        
        function diff(inicio, fim) {
            const [h1, m1] = inicio.split(':').map(Number);
            const [h2, m2] = fim.split(':').map(Number);
            let min1 = h1 * 60 + m1;
            let min2 = h2 * 60 + m2;
            if (min2 < min1) min2 += 24 * 60;
            return min2 - min1;
        }
        
        const minManha = diff(eM, sM);
        const minTarde = diff(eT, sT);
        const totalMin = minManha + minTarde;
        
        const fmt = (m) => `${Math.floor(m / 60)}h ${m % 60}min`;
        
        document.getElementById('horasManha').textContent = fmt(minManha);
        document.getElementById('horasTarde').textContent = fmt(minTarde);
        document.getElementById('horasTotal').textContent = fmt(totalMin);
        document.getElementById('horasDecimais').innerHTML = `<i class="fas fa-chart-line"></i> Total em horas decimais: ${(totalMin / 60).toFixed(2)}h`;
        document.getElementById('resultadoHoras').style.display = 'block';
        document.getElementById('copiarHoras').style.display = 'inline-flex';
    });
    
    const copiar = document.getElementById('copiarHoras');
    if (copiar) {
        const novoCopiar = copiar.cloneNode(true);
        copiar.parentNode.replaceChild(novoCopiar, copiar);
        novoCopiar.addEventListener('click', () => {
            const texto = document.getElementById('horasTotal').textContent;
            navigator.clipboard.writeText(`Total de horas: ${texto}`).then(() => alert('Copiado!'));
        });
    }
}

// ========== FERRAMENTA 3: CONVERSÃO DE TEXTO ==========
function initConversaoTexto() {
    const maiusculo = document.getElementById('paraMaiusculo');
    const minusculo = document.getElementById('paraMinusculo');
    const capitalizar = document.getElementById('capitalizarTexto');
    const copiar = document.getElementById('copiarTexto');
    const input = document.getElementById('textoConverter');
    const resultado = document.getElementById('textoConvertido');
    const divResultado = document.getElementById('resultadoTexto');
    
    function converter(tipo) {
        if (!input.value.trim()) return alert('Digite um texto!');
        let r = '';
        if (tipo === 'maiusculo') r = input.value.toUpperCase();
        else if (tipo === 'minusculo') r = input.value.toLowerCase();
        else if (tipo === 'capitalizar') r = input.value.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
        resultado.textContent = r;
        divResultado.style.display = 'block';
        copiar.style.display = 'inline-flex';
    }
    
    if (maiusculo) {
        const novo = maiusculo.cloneNode(true);
        maiusculo.parentNode.replaceChild(novo, maiusculo);
        novo.addEventListener('click', () => converter('maiusculo'));
    }
    
    if (minusculo) {
        const novo = minusculo.cloneNode(true);
        minusculo.parentNode.replaceChild(novo, minusculo);
        novo.addEventListener('click', () => converter('minusculo'));
    }
    
    if (capitalizar) {
        const novo = capitalizar.cloneNode(true);
        capitalizar.parentNode.replaceChild(novo, capitalizar);
        novo.addEventListener('click', () => converter('capitalizar'));
    }
    
    if (copiar) {
        const novoCopiar = copiar.cloneNode(true);
        copiar.parentNode.replaceChild(novoCopiar, copiar);
        novoCopiar.addEventListener('click', () => {
            navigator.clipboard.writeText(resultado.textContent).then(() => alert('Copiado!'));
        });
    }
}

// ========== FERRAMENTA 4: PORCENTAGEM E REGRA DE 3 ==========
function initPorcentagemERegra3() {
    const btnPorc = document.getElementById('tipoPorcentagem');
    const btnRegra = document.getElementById('tipoRegra3');
    const containerPorc = document.getElementById('porcentagemContainer');
    const containerRegra = document.getElementById('regra3Container');
    const btnCalc = document.getElementById('calcularPorcentagem');
    
    let tipoAtual = 'porcentagem';
    
    if (btnPorc && btnRegra) {
        btnPorc.addEventListener('click', () => {
            tipoAtual = 'porcentagem';
            btnPorc.style.background = 'var(--gradient-primary)';
            btnPorc.style.color = 'white';
            btnRegra.style.background = 'var(--bg-secondary)';
            btnRegra.style.color = 'var(--text-primary)';
            containerPorc.style.display = 'block';
            containerRegra.style.display = 'none';
        });
        
        btnRegra.addEventListener('click', () => {
            tipoAtual = 'regra3';
            btnRegra.style.background = 'var(--gradient-primary)';
            btnRegra.style.color = 'white';
            btnPorc.style.background = 'var(--bg-secondary)';
            btnPorc.style.color = 'var(--text-primary)';
            containerPorc.style.display = 'none';
            containerRegra.style.display = 'block';
            
            ['regraA', 'regraB', 'regraC'].forEach(id => {
                document.getElementById(id)?.addEventListener('input', calcularRegra3);
            });
        });
    }
    
    function calcularRegra3() {
        const A = parseFloat(document.getElementById('regraA')?.value) || 0;
        const B = parseFloat(document.getElementById('regraB')?.value) || 0;
        const C = parseFloat(document.getElementById('regraC')?.value) || 0;
        const D = document.getElementById('regraD');
        if (D) D.value = (A !== 0 && B !== 0 && C !== 0) ? ((B * C) / A).toFixed(2) : '';
    }
    
    if (btnCalc) {
        const novoCalc = btnCalc.cloneNode(true);
        btnCalc.parentNode.replaceChild(novoCalc, btnCalc);
        
        novoCalc.addEventListener('click', () => {
            if (tipoAtual === 'porcentagem') {
                const tipo = document.getElementById('tipoPorcentagemCalc')?.value;
                const p = parseFloat(document.getElementById('porcentagemValor')?.value) || 0;
                const t = parseFloat(document.getElementById('totalValor')?.value) || 0;
                if (p === 0 || t === 0) return alert('Preencha todos os valores!');
                
                let resultado = 0, texto = '';
                if (tipo === 'quanto-e') resultado = (p * t) / 100, texto = `${p}% de R$ ${t.toFixed(2)} = R$ ${resultado.toFixed(2)}`;
                else if (tipo === 'desconto') resultado = t - (t * p / 100), texto = `${p}% de desconto: R$ ${resultado.toFixed(2)}`;
                else if (tipo === 'aumento') resultado = t + (t * p / 100), texto = `${p}% de aumento: R$ ${resultado.toFixed(2)}`;
                
                document.getElementById('porcentagemTexto').textContent = texto;
                document.getElementById('resultadoPorcentagem').style.display = 'block';
            } else {
                calcularRegra3();
                const D = document.getElementById('regraD')?.value;
                if (D) {
                    document.getElementById('porcentagemTexto').textContent = `Resultado: ${D}`;
                    document.getElementById('resultadoPorcentagem').style.display = 'block';
                }
            }
        });
    }
}

// ========== FERRAMENTA 5: FORMATAR CPF/CNPJ ==========
function initFormatarDocumento() {
    const btn = document.getElementById('formatarDocumento');
    if (!btn) return;
    
    const novoBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(novoBtn, btn);
    
    novoBtn.addEventListener('click', () => {
        const doc = document.getElementById('documentoInput')?.value.replace(/\D/g, '') || '';
        if (!doc) return alert('Digite o número do documento!');
        
        let formatado = '', valido = false, tipo = '';
        
        if (doc.length === 11) {
            formatado = doc.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
            valido = validarCPF(doc);
            tipo = 'CPF';
        } else if (doc.length === 14) {
            formatado = doc.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
            valido = validarCNPJ(doc);
            tipo = 'CNPJ';
        } else {
            document.getElementById('documentoTexto').textContent = 'Documento inválido!';
            document.getElementById('documentoStatus').textContent = 'Verifique a quantidade de dígitos';
            document.getElementById('resultadoDocumento').style.display = 'block';
            return;
        }
        
        document.getElementById('documentoTexto').textContent = formatado;
        const status = document.getElementById('documentoStatus');
        status.textContent = `${tipo} ${valido ? 'válido ✓' : 'inválido ✗'}`;
        status.style.color = valido ? 'var(--accent-color)' : '#dc3545';
        document.getElementById('resultadoDocumento').style.display = 'block';
    });
}

function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
    
    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf[i - 1]) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[9])) return false;
    
    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf[i - 1]) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf[10]);
}

function validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/\D/g, '');
    if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;
    
    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0, pos = tamanho - 7;
    
    for (let i = tamanho; i >= 1; i--) {
        soma += parseInt(numeros[tamanho - i]) * pos--;
        if (pos < 2) pos = 9;
    }
    
    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos[0])) return false;
    
    tamanho++;
    numeros = cnpj.substring(0, tamanho);
    soma = 0, pos = tamanho - 7;
    
    for (let i = tamanho; i >= 1; i--) {
        soma += parseInt(numeros[tamanho - i]) * pos--;
        if (pos < 2) pos = 9;
    }
    
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    return resultado === parseInt(digitos[1]);
}

// ========== BALÃO DE RECADOS ==========
let recados = [];
let recadosLidos = JSON.parse(localStorage.getItem('recadosLidos') || '[]');

function initMuralRecados() {
    const recadosIcon = document.getElementById('recadosIcon');
    const recadosPanel = document.getElementById('recadosPanel');
    const closeRecados = document.getElementById('closeRecados');
    const recadosList = document.getElementById('recadosList');
    const novoRecado = document.getElementById('novoRecado');
    const btnPublicar = document.getElementById('publicarRecado');
    const chkAnonimo = document.getElementById('recadoAnonimo');
    const recadosCount = document.getElementById('recadosCount');
    
    if (!recadosIcon) return;
    
    async function carregarRecados() {
        try {
            const response = await fetch(GOOGLE_SHEETS_URL);
            recados = await response.json();
            recados.forEach(r => r.lido = recadosLidos.includes(r.id));
            renderizarRecados();
            atualizarContador();
        } catch (error) {
            console.error('Erro ao carregar recados:', error);
            if (recadosList) {
                recadosList.innerHTML = `
                    <div style="text-align: center; padding: 40px; color: var(--text-secondary);">
                        <i class="fas fa-exclamation-triangle" style="font-size: 48px; margin-bottom: 15px; opacity: 0.5;"></i>
                        <p>Não foi possível carregar os recados</p>
                        <small>Tente novamente mais tarde</small>
                    </div>
                `;
            }
        }
    }
    
    async function publicarRecado() {
        if (!novoRecado.value.trim()) return alert('Digite um recado!');
        
        const btn = document.getElementById('publicarRecado');
        const textoOriginal = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Publicando...';
        btn.disabled = true;
        
        try {
            let autor = chkAnonimo?.checked ? 'Anônimo' : localStorage.getItem('userName');
            if (!autor || autor === 'Anônimo') {
                autor = prompt('Digite seu nome:');
                if (!autor) {
                    btn.innerHTML = textoOriginal;
                    btn.disabled = false;
                    return;
                }
                localStorage.setItem('userName', autor);
            }
            
            await fetch(GOOGLE_SHEETS_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: Date.now(),
                    texto: novoRecado.value.trim(),
                    autor: autor,
                    data: new Date().toISOString(),
                    visualizacoes: 0
                })
            });
            
            novoRecado.value = '';
            if (chkAnonimo) chkAnonimo.checked = false;
            
            btn.innerHTML = '<i class="fas fa-check"></i> Publicado!';
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-paper-plane"></i> Publicar';
                btn.disabled = false;
            }, 1500);
            
            setTimeout(carregarRecados, 1000);
        } catch (error) {
            console.error('Erro ao publicar:', error);
            alert('Erro ao publicar recado!');
            btn.innerHTML = textoOriginal;
            btn.disabled = false;
        }
    }
    
    async function marcarComoVisto(id) {
        const recado = recados.find(r => r.id === id);
        if (!recado || recado.lido) return;
        
        recado.visualizacoes++;
        recado.lido = true;
        recadosLidos.push(id);
        localStorage.setItem('recadosLidos', JSON.stringify(recadosLidos));
        
        try {
            await fetch(GOOGLE_SHEETS_URL, {
                method: 'PUT',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: recado.id, visualizacoes: recado.visualizacoes })
            });
        } catch (error) {
            console.error('Erro ao atualizar visualização:', error);
        }
        
        renderizarRecados();
        atualizarContador();
    }
    
    function atualizarContador() {
        if (!recadosCount) return;
        const naoLidos = recados.filter(r => !r.lido).length;
        recadosCount.textContent = naoLidos;
        recadosCount.style.display = naoLidos > 0 ? 'flex' : 'none';
    }
    
    function formatarData(data) {
        const d = new Date(data);
        const hoje = new Date();
        const ontem = new Date(); ontem.setDate(ontem.getDate() - 1);
        
        if (d.toDateString() === hoje.toDateString()) return `Hoje às ${d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
        if (d.toDateString() === ontem.toDateString()) return `Ontem às ${d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
        return `${d.toLocaleDateString('pt-BR')} às ${d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    function renderizarRecados() {
        if (!recadosList) return;
        
        if (recados.length === 0) {
            recadosList.innerHTML = `
                <div style="text-align: center; padding: 40px; color: var(--text-secondary);">
                    <i class="fas fa-sticky-note" style="font-size: 48px; margin-bottom: 15px; opacity: 0.5;"></i>
                    <p>Nenhum recado ainda</p>
                    <small>Seja o primeiro a publicar!</small>
                </div>
            `;
            return;
        }
        
        recadosList.innerHTML = [...recados].sort((a, b) => new Date(b.data) - new Date(a.data)).map(r => `
            <div class="recado-item" data-id="${r.id}" style="${r.lido ? 'opacity: 0.8;' : ''}">
                <div class="recado-header">
                    <span class="recado-autor"><i class="fas fa-user-circle"></i> ${r.autor}</span>
                    <span class="recado-data"><i class="fas fa-clock"></i> ${formatarData(r.data)}</span>
                </div>
                <div class="recado-texto">${r.texto.replace(/\n/g, '<br>')}</div>
                <div class="recado-footer">
                    <span class="recado-visualizacoes"><i class="fas fa-eye"></i> ${r.visualizacoes || 0} visualizações</span>
                    <button class="btn-visualizado" data-id="${r.id}" ${r.lido ? 'disabled' : ''}>
                        <i class="fas ${r.lido ? 'fa-check-circle' : 'fa-check'}"></i> ${r.lido ? 'Visto' : 'Marcar como visto'}
                    </button>
                </div>
            </div>
        `).join('');
        
        document.querySelectorAll('.btn-visualizado').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                marcarComoVisto(parseInt(btn.dataset.id));
            });
        });
        
        atualizarContador();
    }
    
    // Event Listeners
    recadosIcon.addEventListener('click', (e) => {
        e.preventDefault();
        recadosPanel.classList.add('active');
        carregarRecados();
    });
    
    closeRecados.addEventListener('click', (e) => {
        e.preventDefault();
        recadosPanel.classList.remove('active');
    });
    
    if (btnPublicar) {
        const novo = btnPublicar.cloneNode(true);
        btnPublicar.parentNode.replaceChild(novo, btnPublicar);
        novo.addEventListener('click', publicarRecado);
    }
    
    if (novoRecado) {
        novoRecado.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                publicarRecado();
            }
        });
    }
    
    document.addEventListener('click', (e) => {
        const bubble = document.getElementById('recadosBubble');
        if (bubble && !bubble.contains(e.target) && recadosPanel.classList.contains('active')) {
            recadosPanel.classList.remove('active');
        }
    });
    
    carregarRecados();
    setInterval(carregarRecados, 30000);
}

// ========== INICIALIZAÇÃO ==========
document.addEventListener('DOMContentLoaded', () => {
    initializeSearchResults();
    initTheme();
    initChat();
    initDeepSeek();
    initTools();
    initMuralRecados();
    
    // Event listeners do modal
    document.getElementById('yearMonthModal')?.addEventListener('click', (e) => {
        if (e.target === document.getElementById('yearMonthModal')) closeModal();
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
});

// ========== EXPOR FUNÇÕES GLOBAIS ==========
window.showYearSelection = showYearSelection;
window.showMonthSelection = showMonthSelection;
window.redirectToLink = redirectToLink;
window.closeModal = closeModal;
window.filterLinks = filterLinks;
