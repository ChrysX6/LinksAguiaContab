// ==============================
// CONFIG
// ==============================
const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbzVd7j35SWxbCTJvK8QBXe8ZE5j_QTDHDxBYfR20pncdI55E2BDgXgB4UOKZk2ZYrZO/exec';
const PASS = "Gestao2025@";
const PASS_LINK = "https://docs.google.com/spreadsheets/d/1fmeTfc1coBy_8LMT8aSjxfh6b9VC1slv/edit?usp=sharing&ouid=104502217953424660775&rtpof=true&sd=true";

// ==============================
// SIDEBAR / MOBILE
// ==============================
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
}
function toggleDD(id) {
    const el = document.getElementById(id);
    el.classList.toggle('open');
}

// ==============================
// DATE BADGE
// ==============================
function updateDate() {
    const now = new Date();
    const opts = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' };
    const formatted = now.toLocaleDateString('pt-BR', opts);
    const time = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    document.getElementById('date-badge').textContent = `${formatted} · ${time}`;
}
setInterval(updateDate, 1000);
updateDate();

// ==============================
// THEME
// ==============================
function toggleTheme() {
    const dark = document.body.classList.toggle('dark');
    localStorage.setItem('theme', dark ? 'dark' : 'light');
    document.getElementById('theme-toggle').textContent = dark ? '🌙' : '☀️';
    const logo = document.getElementById('sidebar-logo');
    if (logo) logo.src = dark ? 'links/img/logo2.png' : 'links/img/logo1.png';
}
(function initTheme() {
    const t = localStorage.getItem('theme');
    if (t === 'dark') {
        document.body.classList.add('dark');
        const btn = document.getElementById('theme-toggle');
        if (btn) btn.textContent = '🌙';
        const logo = document.getElementById('sidebar-logo');
        if (logo) logo.src = 'links/img/logo2.png';
    }
})();

// ==============================
// SEARCH
// ==============================
const systemsDB = [
    { name:"E-CAC", desc:"Centro Virtual de Atendimento da Receita Federal", url:"https://cav.receita.fazenda.gov.br/", icon:"fas fa-file-invoice-dollar", tags:["receita federal","impostos","declaracoes","fiscal","ecac"] },
    { name:"DISTRIBUIÇÃO 2025", desc:"Planilha de distribuições do ano de 2025", url:"https://docs.google.com/spreadsheets/d/1KnV2UPIZuCA3rBcubj9-h65jTwY3ypMQ/edit?gid=816413539#gid=816413539", icon:"fas fa-file-invoice-dollar", tags:["Martins","distribuição"] },
    { name:"CONSULTA OPTANTES SIMPLES", desc:"Consultar empresas optantes pelo Simples Nacional", url:"https://consopt.www8.receita.fazenda.gov.br/consultaoptantes", icon:"fas fa-users", tags:["simples nacional","consulta","optantes"] },
    { name:"CONSULTA CNPJ", desc:"Consulta de CNPJ da Receita Federal", url:"https://solucoes.receita.fazenda.gov.br/servicos/cnpjreva/cnpjreva_solicitacao.asp", icon:"fas fa-database", tags:["cnpj","consulta","receita federal"] },
    { name:"JUCESP", desc:"Junta Comercial do Estado de São Paulo", url:"https://www.jucesponline.sp.gov.br/", icon:"fas fa-landmark", tags:["junta comercial","sp","empresas"] },
    { name:"SIMPLES NACIONAL", desc:"Portal do Simples Nacional", url:"https://www8.receita.fazenda.gov.br/SIMPLESNACIONAL/", icon:"fas fa-building", tags:["simples","mei","microempresa"] },
    { name:"PGMEI", desc:"Documento de Arrecadação do MEI", url:"https://www8.receita.fazenda.gov.br/SimplesNacional/Aplicacoes/ATSPO/pgmei.app/Identificacao", icon:"fas fa-city", tags:["mei","pgmei","recolhimento"] },
    { name:"NOTA FISCAL PREFEITURA SP", desc:"Emissão de NFS-e – Prefeitura de São Paulo", url:"https://nfe.prefeitura.sp.gov.br/contribuinte/inicio.aspx", icon:"fas fa-file-lines", tags:["nota fiscal","prefeitura sp","nfs-e"] },
    { name:"SINTEGRA", desc:"Sistema Integrado de Informações Interestaduais", url:"https://www.sintegra.gov.br/", icon:"fas fa-right-left", tags:["icms","interestadual","fiscal"] },
    { name:"ESOCIAL", desc:"Escrituração Digital das Obrigações Trabalhistas", url:"https://www.esocial.gov.br/", icon:"fas fa-id-card", tags:["trabalhista","folha","inss","esocial"] },
    { name:"DUC PREFEITURA SP", desc:"Demonstrativo Unificado do Contribuinte", url:"https://duc.prefeitura.sp.gov.br/portal/", icon:"fas fa-file-invoice", tags:["duc","prefeitura sp","recolhimento"] },
    { name:"DAS", desc:"Documento de Arrecadação do Simples Nacional", url:"https://www8.receita.fazenda.gov.br/SimplesNacional/Servicos/Grupo.aspx?grp=t&area=1", icon:"fas fa-receipt", tags:["simples","das","recolhimento"] },
    { name:"DEC PREFEITURA SP", desc:"Declaração Eletrônica de Serviços – SP", url:"https://dec.prefeitura.sp.gov.br/", icon:"fas fa-briefcase", tags:["dec","prefeitura sp","servicos"] },
    { name:"DEC SEFAZ", desc:"Declaração Eletrônica de Serviços – SEFAZ", url:"https://www.dec.fazenda.sp.gov.br/DEC/UCLogin/login.aspx", icon:"fas fa-briefcase", tags:["dec","sefaz","servicos"] },
    { name:"PFE – POSTO FISCAL ELETRÔNICO", desc:"Posto Fiscal Eletrônico da SEFAZ-SP", url:"https://www3.fazenda.sp.gov.br/CAWEB/Account/Login.aspx/", icon:"fas fa-clipboard-check", tags:["posto fiscal","pfe","fiscal"] },
    { name:"FGTS DIGITAL", desc:"Sistema de recolhimento do FGTS", url:"https://fgtsdigital.sistema.gov.br/portal/login", icon:"fas fa-university", tags:["fgts","recolhimento","trabalhista"] },
    { name:"EMPREGADOR WEB", desc:"Seguro-desemprego e serviços trabalhistas", url:"https://sd.maisemprego.mte.gov.br/sdweb/empregadorweb/index.jsf", icon:"fas fa-briefcase", tags:["empregador","trabalhista","seguro desemprego"] },
    { name:"SAL – ACRÉSCIMOS LEGAIS", desc:"Guias de INSS – Sistema de Acréscimos Legais", url:"https://sal.rfb.gov.br/home", icon:"fas fa-file-invoice-dollar", tags:["inss","guias","recolhimento","sal"] },
    { name:"DET – DOMICÍLIO ELETRÔNICO TRABALHISTA", desc:"Comunicação entre Inspeção do Trabalho e empregadores", url:"https://det.sit.trabalho.gov.br/", icon:"fas fa-envelope-open", tags:["inspecao","trabalhista","comunicacao","det"] },
    { name:"IOB ONLINE", desc:"Conteúdos e serviços para profissionais de contabilidade", url:"https://app.iob.com.br/", icon:"fas fa-book-open", tags:["iob","conteudos","legislacao"] },
    { name:"NFSE MEI", desc:"Nota Fiscal de Serviços Eletrônica para MEI", url:"https://www.nfse.gov.br/EmissorNacional/", icon:"fas fa-file-lines", tags:["nfse","mei","nota fiscal"] },
    { name:"DARE ICMS SP", desc:"Documento de Arrecadação de Receitas Estaduais – ICMS SP", url:"https://www4.fazenda.sp.gov.br/DareICMS/DareAvulso", icon:"fas fa-file-invoice-dollar", tags:["dare","icms","sp"] },
    { name:"DASN SIMEI", desc:"Declaração Anual Simplificada do MEI", url:"https://www4.fazenda.sp.gov.br/DareICMS/DareAvulso", icon:"fas fa-file-invoice-dollar", tags:["dasn","simei","mei"] },
];

function safeText(v) { return (v===null||v===undefined)?'':String(v); }

function esc(s) { return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'); }
function highlight(text, term) {
    if (!term.trim()) return text;
    return text.replace(new RegExp(`(${esc(term)})`, 'gi'), '<span class="highlight">$1</span>');
}

function renderSystems(list, term) {
    const el = document.getElementById('search-results');
    if (list.length === 0) {
        el.innerHTML = `<div class="no-results"><i class="fas fa-search"></i><p>Nenhum resultado para "<strong>${term}</strong>"</p><small>Tente: E-CAC, FGTS, CNPJ, eSocial…</small></div>`;
        return;
    }
    el.innerHTML = list.map(s => `
        <a href="${s.url}" target="_blank" class="system-card">
            <div class="sys-icon"><i class="${s.icon}"></i></div>
            <div class="sys-info">
                <div class="sys-name">${highlight(s.name, term)}</div>
                <div class="sys-desc">${highlight(s.desc, term)}</div>
                <div class="sys-tags">${s.tags.map(t=>`<span class="sys-tag">${t}</span>`).join('')}</div>
            </div>
        </a>`).join('');
}

function filterLinks() {
    const q = document.getElementById('search-bar').value.toLowerCase().trim();
    if (!q) { renderSystems(systemsDB, ''); return; }
    const r = systemsDB.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.desc.toLowerCase().includes(q) ||
        s.tags.some(t => t.toLowerCase().includes(q))
    );
    renderSystems(r, q);
}

// ==============================
// MODAL ANO/MÊS
// ==============================
let currentType = '';
const monthLinks = {
    'lucro-presumido': {
        2025: { 'janeiro':'https://drive.google.com/drive/folders/1ykiBqOId1eyw9Vxuv5M6wDdrB0fut5s1','fevereiro':'https://drive.google.com/drive/folders/1cuP5LINjfQVmdBuMEEFdjUhIASgAKqIN','março':'https://drive.google.com/drive/folders/1elN9-Br-O9eCd19Sz7lNg3Bq5Fd0O4W7','abril':'https://drive.google.com/drive/folders/1PtCIeLrCc0_aNJXaFzZRlGcRRCziJVgu','maio':'https://drive.google.com/drive/folders/1wXU3nZwDe54mR9URFTGAH3xLNma9oiuS','junho':'https://drive.google.com/drive/folders/1aNgApurd8T540p2oHq5TqyWdJurfg0Pr','julho':'https://drive.google.com/drive/folders/1w_INrhgTi4ahVHz7Xa_V06wxZeKUnMPW','agosto':'https://drive.google.com/drive/folders/1bkp9_K5fWyYOSz9UZWRqToTqp_-vdI9G','setembro':'https://drive.google.com/drive/folders/1c6Kfp-GmrInteN1YIyZ3meMcdxxcgR3s','outubro':'https://drive.google.com/drive/folders/19IsvE2x1KFfjDEBU1KWm-yihk0UYiiwy','novembro':'https://drive.google.com/drive/folders/1TXXPTtN9ob2QHYf3z8W7HFTr0qZeCykD','dezembro':'https://drive.google.com/drive/folders/15Wkar3DSMYVPXBJ4G_KpGwrLzHn5ciit' },
        2026: { 'janeiro':'https://drive.google.com/drive/folders/1wRZCDogRXtmLFOkNtYI6Jt7OBEKAw1qB?usp=drive_link','fevereiro':'https://drive.google.com/drive/folders/1IsLBfSuS_3fYUSG4eaYgn4Cyz9_DihBg?usp=drive_link','março':'https://drive.google.com/drive/folders/1hel_PCcbQ7eordwcDS_quj2yvQkta2i4?usp=drive_link','abril':'https://drive.google.com/drive/folders/1S33RWlzZK2kH_3uHY2Cg5up9M30US469?usp=drive_link','maio':'https://drive.google.com/drive/folders/1PRlq8rS61KBvndPq1IxsrEBGr_uPGLJ1?usp=drive_link','junho':'https://drive.google.com/drive/folders/1bDaPzWIXWD_keWIDgeH4MTA-nekTm8X7?usp=drive_link','julho':'https://drive.google.com/drive/folders/1_p1tWJ5M2qZzGzHHsVljOVznZjRIo_q9?usp=drive_link','agosto':'https://drive.google.com/drive/folders/1-uf2926nJhyyka2BJyZuSnQo3jJm83x2?usp=drive_link','setembro':'https://drive.google.com/drive/folders/1JqT0jxqwbGretxBeOsH6g3EeV8DZCyns?usp=drive_link','outubro':'https://drive.google.com/drive/folders/15DvjIjceDIHRzYIXb0GFfpZbZ2CLCoOi?usp=drive_link','novembro':'https://drive.google.com/drive/folders/1HAuLNhECCbhV9CA0yjkNinaTb5B-U3zk?usp=drive_link','dezembro':'https://drive.google.com/drive/folders/1Z5evXqJkpFOugl_CXeN4s6XtqnvfusTv?usp=drive_link' }
    },
    'simples-nacional': {
        2025: { 'janeiro':'https://drive.google.com/drive/folders/1PLUeH7eXGwuaXl7gry_H6fNlGfFXAfBl','fevereiro':'https://drive.google.com/drive/folders/1vC2ohs-RIT6GMcwD0eGvTTYh86SeQPoC','março':'https://drive.google.com/drive/folders/1_zRsOXMKML23Oqf4SAjHLwzSNuxo86Xe','abril':'https://drive.google.com/drive/folders/1txRhXA9LpWPREbcVM1HYBGbJWuApkVyH','maio':'https://drive.google.com/drive/folders/1HmX65TNajLCiA9KZsLClq0sr3UTZ3bzW','junho':'https://drive.google.com/drive/folders/1vTQuNDkspN7Uhdp0Q_4d29wHvn2okfj9','julho':'https://drive.google.com/drive/folders/1yfB8RdAbDg6GC01v0DexwRamAfoTzq6Q','agosto':'https://drive.google.com/drive/folders/1gNx_IAkvimMUFrHjogMoXho0ZvcVM5TT','setembro':'https://drive.google.com/drive/folders/1kQtzbhm5wgxC-QvDHYclmawN_nFCaGml','outubro':'https://drive.google.com/drive/folders/14Ync6AtztJ8ZVyA6H3poGYZx-eFURKXV','novembro':'https://drive.google.com/drive/folders/1w9l-3mEDS4fs4nQ6_3RfMl6nviKfVYWQ','dezembro':'https://drive.google.com/drive/folders/1SBOazBR5XnKfqfpziXwzkMZs-HqC4JN2' },
        2026: { 'janeiro':'https://drive.google.com/drive/folders/1PLUeH7eXGwuaXl7gry_H6fNlGfFXAfBl','fevereiro':'https://drive.google.com/drive/folders/1vC2ohs-RIT6GMcwD0eGvTTYh86SeQPoC','março':'https://drive.google.com/drive/folders/1_zRsOXMKML23Oqf4SAjHLwzSNuxo86Xe','abril':'https://drive.google.com/drive/folders/1txRhXA9LpWPREbcVM1HYBGbJWuApkVyH','maio':'https://drive.google.com/drive/folders/1HmX65TNajLCiA9KZsLClq0sr3UTZ3bzW','junho':'https://drive.google.com/drive/folders/1vTQuNDkspN7Uhdp0Q_4d29wHvn2okfj9','julho':'https://drive.google.com/drive/folders/1yfB8RdAbDg6GC01v0DexwRamAfoTzq6Q','agosto':'https://drive.google.com/drive/folders/1gNx_IAkvimMUFrHjogMoXho0ZvcVM5TT','setembro':'https://drive.google.com/drive/folders/1kQtzbhm5wgxC-QvDHYclmawN_nFCaGml','outubro':'https://drive.google.com/drive/folders/14Ync6AtztJ8ZVyA6H3poGYZx-eFURKXV','novembro':'https://drive.google.com/drive/folders/1w9l-3mEDS4fs4nQ6_3RfMl6nviKfVYWQ','dezembro':'https://drive.google.com/drive/folders/1SBOazBR5XnKfqfpziXwzkMZs-HqC4JN2' }
    }
};
const monthNames = { 'janeiro':'JAN','fevereiro':'FEV','março':'MAR','abril':'ABR','maio':'MAI','junho':'JUN','julho':'JUL','agosto':'AGO','setembro':'SET','outubro':'OUT','novembro':'NOV','dezembro':'DEZ' };

function showYearSelection(type) {
    currentType = type;
    document.getElementById('modal-title').textContent = type === 'lucro-presumido' ? 'Lucro Presumido / Real' : 'Simples Nacional';
    document.getElementById('year-section').style.display = 'block';
    document.getElementById('month-section').style.display = 'none';
    document.getElementById('year-modal').classList.add('open');
}
function showMonths(year) {
    const grid = document.getElementById('month-grid');
    grid.innerHTML = '';
    const months = monthLinks[currentType][year];
    Object.keys(months).forEach(m => {
        const btn = document.createElement('button');
        btn.className = 'month-btn';
        btn.textContent = monthNames[m] || m.toUpperCase();
        btn.onclick = () => { window.open(months[m], '_blank'); closeModal(); };
        grid.appendChild(btn);
    });
    document.getElementById('year-section').style.display = 'none';
    document.getElementById('month-section').style.display = 'block';
}
function closeModal() {
    document.getElementById('year-modal').classList.remove('open');
    currentType = '';
}
document.getElementById('year-modal').addEventListener('click', e => { if (e.target === document.getElementById('year-modal')) closeModal(); });

// ==============================
// CHAT / SENHA
// ==============================
function toggleChatPanel() {
    const p = document.getElementById('chat-panel');
    p.classList.toggle('open');
    if (p.classList.contains('open')) setTimeout(() => document.getElementById('pass-input').focus(), 50);
}
function closeChatPanel() { document.getElementById('chat-panel').classList.remove('open'); resetPass(); }
function resetPass() { document.getElementById('pass-input').value = ''; document.getElementById('pass-error').classList.remove('show'); }
function validatePass() {
    if (document.getElementById('pass-input').value === PASS) {
        window.open(PASS_LINK, '_blank');
        closeChatPanel();
    } else {
        document.getElementById('pass-error').classList.add('show');
        document.getElementById('pass-input').value = '';
        document.getElementById('pass-input').focus();
        setTimeout(() => document.getElementById('pass-error').classList.remove('show'), 3000);
    }
}
document.getElementById('pass-input').addEventListener('keydown', e => { if (e.key === 'Enter') validatePass(); });

// ==============================
// TOOLS
// ==============================
const toolsDB = [
    { id:'numero-extenso', name:'Número por Extenso', desc:'Converte números em texto', icon:'fas fa-font', cat:'conversao', popular:true },
    { id:'calculo-horas', name:'Calculadora de Horas', desc:'Horas trabalhadas (4 horários)', icon:'fas fa-clock', cat:'calculo', popular:true },
    { id:'maiusculo-minusculo', name:'Converter Texto', desc:'MAIÚSCULO ↔ minúsculo', icon:'fas fa-text-height', cat:'conversao', popular:true },
    { id:'porcentagem', name:'Porcentagem / Regra de 3', desc:'Calculadora de % e proporções', icon:'fas fa-percent', cat:'calculo', popular:true },
    { id:'formatar-cnpj', name:'Formatar CNPJ/CPF', desc:'Formata e valida documentos', icon:'fas fa-id-card', cat:'conversao', popular:false },
];

function renderTools(cat) {
    const list = cat === 'todas' ? toolsDB : toolsDB.filter(t => t.cat === cat);
    document.getElementById('tools-grid').innerHTML = list.map(t => `
        <div class="tool-card" onclick="openToolModal('${t.id}')">
            <div class="tool-card-icon"><i class="${t.icon}"></i></div>
            <div class="tool-card-name">${t.name}</div>
            <div class="tool-card-desc">${t.desc}</div>
            ${t.popular ? '<span class="tool-popular">★</span>' : ''}
        </div>`).join('');
}
function filterTools(btn, cat) {
    document.querySelectorAll('.tool-cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderTools(cat);
}
function toggleToolsPanel() { document.getElementById('tools-panel').classList.toggle('open'); }
function closeToolsPanel() { document.getElementById('tools-panel').classList.remove('open'); }
function openToolsPanel() { document.getElementById('tools-panel').classList.add('open'); }

// ==============================
// TOOL MODAL CONTENT
// ==============================
function openToolModal(id) {
    const t = toolsDB.find(x => x.id === id);
    if (!t) return;
    document.getElementById('tool-modal-title').innerHTML = `<i class="${t.icon}"></i> ${t.name}`;
    document.getElementById('tool-modal-body').innerHTML = getToolHTML(id);
    document.getElementById('tool-modal').classList.add('open');
    setTimeout(() => initTool(id), 100);
}
function closeToolModal() { document.getElementById('tool-modal').classList.remove('open'); }
document.getElementById('tool-modal').addEventListener('click', e => { if (e.target === document.getElementById('tool-modal')) closeToolModal(); });

function getToolHTML(id) {
    if (id === 'numero-extenso') return `
        <div class="tm-label"><i class="fas fa-hashtag"></i> Número</div>
        <input type="text" id="t-num" class="tm-input" placeholder="Ex: 1234,56" value="1500">
        <button class="tm-btn" onclick="runNumExtenso()"><i class="fas fa-arrows-rotate"></i> Converter</button>
        <div id="t-num-res" class="tm-result" style="display:none"><span id="t-num-txt"></span><small>Por extenso</small></div>
        <div class="tm-actions"><button class="tm-action-btn" id="t-num-copy" style="display:none" onclick="copyText('t-num-txt')"><i class="fas fa-copy"></i> Copiar</button></div>`;

    if (id === 'calculo-horas') return `
        <div style="display:flex;gap:10px;margin-bottom:4px">
            <div style="flex:1"><div class="tm-label"><i class="fas fa-sun"></i> Entrada manhã</div><input type="time" id="t-h-em" class="tm-input" value="08:00"></div>
            <div style="flex:1"><div class="tm-label"><i class="fas fa-cloud"></i> Saída manhã</div><input type="time" id="t-h-sm" class="tm-input" value="12:00"></div>
        </div>
        <div style="display:flex;gap:10px;margin-bottom:4px">
            <div style="flex:1"><div class="tm-label"><i class="fas fa-cloud-sun"></i> Entrada tarde</div><input type="time" id="t-h-et" class="tm-input" value="13:00"></div>
            <div style="flex:1"><div class="tm-label"><i class="fas fa-moon"></i> Saída tarde</div><input type="time" id="t-h-st" class="tm-input" value="18:00"></div>
        </div>
        <button class="tm-btn" onclick="runHoras()"><i class="fas fa-calculator"></i> Calcular</button>
        <div id="t-h-res" class="tm-result" style="display:none">
            <div style="display:flex;justify-content:space-between;margin-bottom:6px">⏰ Manhã: <strong id="t-h-m"></strong></div>
            <div style="display:flex;justify-content:space-between;margin-bottom:6px">🌆 Tarde: <strong id="t-h-t"></strong></div>
            <div style="display:flex;justify-content:space-between;font-size:18px;border-top:1.5px solid var(--border);padding-top:10px;margin-top:4px">Total: <strong id="t-h-tot" style="color:var(--teal)"></strong></div>
            <small id="t-h-dec"></small>
        </div>
        <div class="tm-actions"><button class="tm-action-btn" id="t-h-copy" style="display:none" onclick="copyText('t-h-tot')"><i class="fas fa-copy"></i> Copiar</button></div>`;

    if (id === 'maiusculo-minusculo') return `
        <div class="tm-label"><i class="fas fa-pencil"></i> Texto</div>
        <textarea id="t-txt" class="tm-textarea" placeholder="Digite aqui…"></textarea>
        <div style="display:flex;gap:8px;margin-bottom:10px">
            <button class="tm-btn" style="flex:1;margin:0" onclick="runTexto('U')"><i class="fas fa-arrow-up"></i> MAIÚSCULO</button>
            <button class="tm-btn" style="flex:1;margin:0" onclick="runTexto('L')"><i class="fas fa-arrow-down"></i> minúsculo</button>
        </div>
        <button class="tm-btn" onclick="runTexto('T')"><i class="fas fa-font"></i> Primeira Letra Maiúscula</button>
        <div id="t-txt-res" class="tm-result" style="display:none"><span id="t-txt-out"></span></div>
        <div class="tm-actions"><button class="tm-action-btn" id="t-txt-copy" style="display:none" onclick="copyText('t-txt-out')"><i class="fas fa-copy"></i> Copiar</button></div>`;

    if (id === 'porcentagem') return `
        <div style="display:flex;gap:8px;margin-bottom:16px">
            <button class="tm-btn" id="btn-porc" style="flex:1;margin:0" onclick="setCalcMode('p')"><i class="fas fa-percent"></i> Porcentagem</button>
            <button class="tm-btn" id="btn-r3" style="flex:1;margin:0;background:var(--bg);color:var(--text)" onclick="setCalcMode('r')"><i class="fas fa-equals"></i> Regra de 3</button>
        </div>
        <div id="porc-sec">
            <div class="tm-label">Calcular</div>
            <select id="t-p-tipo" class="tm-select">
                <option value="pct">Quanto é X% de Y?</option>
                <option value="desc">Desconto – X% de Y</option>
                <option value="aum">Aumento – X% de Y</option>
            </select>
            <div class="tm-two-col">
                <div><div class="tm-label">Porcentagem (%)</div><input type="number" id="t-p-p" class="tm-input" placeholder="Ex: 10"></div>
                <div><div class="tm-label">Valor total</div><input type="number" id="t-p-v" class="tm-input" placeholder="Ex: 200"></div>
            </div>
        </div>
        <div id="r3-sec" style="display:none">
            <div class="tm-two-col" style="margin-bottom:10px">
                <div><div class="tm-label">A</div><input type="number" id="t-r3-a" class="tm-input" placeholder="Ex: 10" oninput="autoR3()"></div>
                <div><div class="tm-label">B</div><input type="number" id="t-r3-b" class="tm-input" placeholder="Ex: 20" oninput="autoR3()"></div>
            </div>
            <div class="tm-two-col">
                <div><div class="tm-label">C</div><input type="number" id="t-r3-c" class="tm-input" placeholder="Ex: 30" oninput="autoR3()"></div>
                <div><div class="tm-label">X (resultado)</div><input type="text" id="t-r3-x" class="tm-input" readonly style="background:var(--bg);font-weight:700"></div>
            </div>
            <p style="font-size:12px;color:var(--text-muted);margin-bottom:10px"><i class="fas fa-circle-info"></i> A → B = C → X</p>
        </div>
        <button class="tm-btn" onclick="runPorc()"><i class="fas fa-equals"></i> Calcular</button>
        <div id="t-p-res" class="tm-result" style="display:none"><span id="t-p-out"></span></div>`;

    if (id === 'formatar-cnpj') return `
        <div class="tm-label"><i class="fas fa-id-card"></i> CPF ou CNPJ</div>
        <input type="text" id="t-doc" class="tm-input" placeholder="Ex: 12345678900123">
        <button class="tm-btn" onclick="runDoc()"><i class="fas fa-wand-magic-sparkles"></i> Formatar / Validar</button>
        <div id="t-doc-res" class="tm-result" style="display:none">
            <span id="t-doc-txt"></span>
            <small id="t-doc-status"></small>
        </div>`;

    return '<p style="color:var(--text-muted)">Em desenvolvimento…</p>';
}

function initTool(id) { /* no-op – all tools use inline onclick */ }

// tools logic
function runNumExtenso() {
    const v = parseFloat(document.getElementById('t-num').value.replace(',','.'));
    if (isNaN(v)) return alert('Número inválido!');
    document.getElementById('t-num-txt').textContent = numeroPorExtenso(v);
    document.getElementById('t-num-res').style.display = 'block';
    document.getElementById('t-num-copy').style.display = 'inline-flex';
}
function runHoras() {
    const eM = document.getElementById('t-h-em').value, sM = document.getElementById('t-h-sm').value;
    const eT = document.getElementById('t-h-et').value, sT = document.getElementById('t-h-st').value;
    if (!eM||!sM||!eT||!sT) return alert('Preencha todos os horários!');
    const diff = (a,b) => { const [h1,m1]=a.split(':').map(Number),[h2,m2]=b.split(':').map(Number); let d=h2*60+m2-(h1*60+m1); if(d<0)d+=1440; return d; };
    const mm=diff(eM,sM), mt=diff(eT,sT), tot=mm+mt;
    const fmt=m=>`${Math.floor(m/60)}h ${m%60}min`;
    document.getElementById('t-h-m').textContent = fmt(mm);
    document.getElementById('t-h-t').textContent = fmt(mt);
    document.getElementById('t-h-tot').textContent = fmt(tot);
    document.getElementById('t-h-dec').textContent = `Decimais: ${(tot/60).toFixed(2)}h`;
    document.getElementById('t-h-res').style.display = 'block';
    document.getElementById('t-h-copy').style.display = 'inline-flex';
}
function runTexto(mode) {
    const v = document.getElementById('t-txt').value;
    if (!v.trim()) return alert('Digite um texto!');
    let r = mode==='U'?v.toUpperCase():mode==='L'?v.toLowerCase():v.toLowerCase().replace(/\b\w/g,c=>c.toUpperCase());
    document.getElementById('t-txt-out').textContent = r;
    document.getElementById('t-txt-res').style.display = 'block';
    document.getElementById('t-txt-copy').style.display = 'inline-flex';
}
let calcMode = 'p';
function setCalcMode(m) {
    calcMode = m;
    document.getElementById('porc-sec').style.display = m==='p'?'block':'none';
    document.getElementById('r3-sec').style.display = m==='r'?'block':'none';
    document.getElementById('btn-porc').style.cssText = m==='p'?'flex:1;margin:0':'flex:1;margin:0;background:var(--bg);color:var(--text)';
    document.getElementById('btn-r3').style.cssText = m==='r'?'flex:1;margin:0':'flex:1;margin:0;background:var(--bg);color:var(--text)';
}
function autoR3() {
    const A=parseFloat(document.getElementById('t-r3-a').value)||0, B=parseFloat(document.getElementById('t-r3-b').value)||0, C=parseFloat(document.getElementById('t-r3-c').value)||0;
    document.getElementById('t-r3-x').value = (A&&B&&C)?(B*C/A).toFixed(2):'';
}
function runPorc() {
    if (calcMode==='p') {
        const tipo=document.getElementById('t-p-tipo').value, p=parseFloat(document.getElementById('t-p-p').value)||0, v=parseFloat(document.getElementById('t-p-v').value)||0;
        if(!p||!v) return alert('Preencha os valores!');
        let r='';
        if(tipo==='pct') r=`${p}% de R$ ${v.toFixed(2)} = R$ ${(p*v/100).toFixed(2)}`;
        else if(tipo==='desc') r=`Com ${p}% de desconto: R$ ${(v-v*p/100).toFixed(2)}`;
        else r=`Com ${p}% de aumento: R$ ${(v+v*p/100).toFixed(2)}`;
        document.getElementById('t-p-out').textContent = r;
        document.getElementById('t-p-res').style.display = 'block';
    } else {
        autoR3();
        const x=document.getElementById('t-r3-x').value;
        if(x){ document.getElementById('t-p-out').textContent = `X = ${x}`; document.getElementById('t-p-res').style.display='block'; }
    }
}
function runDoc() {
    const d=document.getElementById('t-doc').value.replace(/\D/g,'');
    if (!d) return alert('Digite o documento!');
    let f='', ok=false, tipo='';
    if (d.length===11) { f=d.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/,'$1.$2.$3-$4'); ok=validCPF(d); tipo='CPF'; }
    else if (d.length===14) { f=d.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,'$1.$2.$3/$4-$5'); ok=validCNPJ(d); tipo='CNPJ'; }
    else { document.getElementById('t-doc-txt').textContent='Quantidade de dígitos inválida'; document.getElementById('t-doc-status').textContent='CPF: 11 dígitos | CNPJ: 14 dígitos'; document.getElementById('t-doc-res').style.display='block'; return; }
    document.getElementById('t-doc-txt').textContent = f;
    const s=document.getElementById('t-doc-status');
    s.textContent = `${tipo} ${ok?'✓ válido':'✗ inválido'}`;
    s.style.color = ok ? 'var(--teal)' : '#e74c3c';
    document.getElementById('t-doc-res').style.display='block';
}

function copyText(id) {
    const el = document.getElementById(id);
    if (!el) return;
    navigator.clipboard.writeText(el.textContent).then(() => {
        const orig = el.closest('.tm-actions')?.querySelector('[onclick*="'+id+'"]');
        if (orig) { const t=orig.innerHTML; orig.innerHTML='<i class="fas fa-check"></i> Copiado!'; setTimeout(()=>orig.innerHTML=t,1500); }
    });
}

// numero por extenso
function numeroPorExtenso(v) {
    if(v===0) return 'Zero reais';
    const s=v.toFixed(2).replace('.','').padStart(3,'0');
    const R=parseInt(s.slice(0,-2))||0, C=parseInt(s.slice(-2))||0;
    const un=['','um','dois','três','quatro','cinco','seis','sete','oito','nove'];
    const esp=['dez','onze','doze','treze','quatorze','quinze','dezesseis','dezessete','dezoito','dezenove'];
    const dez=['','','vinte','trinta','quarenta','cinquenta','sessenta','setenta','oitenta','noventa'];
    const cen=['','cento','duzentos','trezentos','quatrocentos','quinhentos','seiscentos','setecentos','oitocentos','novecentos'];
    function conv(n){
        if(!n)return''; if(n===100)return'cem';
        let r=''; const c=Math.floor(n/100);
        if(c){r+=cen[c];if(n%100)r+=' e ';}
        const x=n%100;
        if(x){if(x<10)r+=un[x];else if(x<20)r+=esp[x-10];else{r+=dez[Math.floor(x/10)];if(x%10)r+=' e '+un[x%10];}}
        return r;
    }
    function milhar(n){if(!n)return'';const m=Math.floor(n/1000),r=n%1000;let s='';if(m)s+=m===1?'mil':conv(m)+' mil';if(r)s+=(m?' e ':'')+conv(r);return s;}
    function milhao(n){if(!n)return'';const m=Math.floor(n/1e6),r=n%1e6;let s='';if(m)s+=m===1?'um milhão':conv(m)+' milhões';if(r)s+=(m?' e ':'')+milhar(r);return s;}
    let ext='';
    if(R){if(R>=1e6)ext=milhao(R);else if(R>=1000)ext=milhar(R);else ext=conv(R);ext+=R===1?' real':' reais';}
    if(C){if(R)ext+=' e ';ext+=C===1?'um centavo':conv(C)+' centavos';}
    if(!R&&C)ext=C===1?'um centavo':conv(C)+' centavos';
    return ext.charAt(0).toUpperCase()+ext.slice(1);
}

function validCPF(c){c=c.replace(/\D/g,'');if(c.length!==11||/^(\d)\1+$/.test(c))return false;let s=0,r;for(let i=1;i<=9;i++)s+=+c[i-1]*(11-i);r=s*10%11;if(r===10||r===11)r=0;if(r!==+c[9])return false;s=0;for(let i=1;i<=10;i++)s+=+c[i-1]*(12-i);r=s*10%11;if(r===10||r===11)r=0;return r===+c[10];}
function validCNPJ(c){c=c.replace(/\D/g,'');if(c.length!==14||/^(\d)\1+$/.test(c))return false;let t=c.length-2,n=c.substring(0,t),d=c.substring(t),s=0,p=t-7;for(let i=t;i>=1;i--){s+=+n[t-i]*p--;if(p<2)p=9;}let r=s%11<2?0:11-s%11;if(r!==+d[0])return false;t++;n=c.substring(0,t);s=0;p=t-7;for(let i=t;i>=1;i--){s+=+n[t-i]*p--;if(p<2)p=9;}r=s%11<2?0:11-s%11;return r===+d[1];}

// ==============================
// RECADOS
// ==============================
let recados = [], recadosLidos = JSON.parse(localStorage.getItem('recadosLidos')||'[]');

async function loadRecados() {
    try {
        const r = await fetch(GOOGLE_SHEETS_URL);
        recados = (await r.json()).map(x => ({
            ...x, texto: safeText(x.texto), autor: safeText(x.autor)||'Anônimo',
            data: x.data || new Date().toISOString(), visualizacoes: x.visualizacoes||0, id: x.id||0
        }));
        recados.forEach(r => r.lido = recadosLidos.includes(r.id));
        renderRecados();
        updateRecadosCount();
    } catch(e) {
        document.getElementById('recados-list').innerHTML = '<div style="text-align:center;padding:30px;color:var(--text-muted)"><i class="fas fa-triangle-exclamation" style="font-size:32px;opacity:.3;display:block;margin-bottom:10px"></i>Não foi possível carregar os recados</div>';
    }
}

function fmtDate(d) {
    const dt = new Date(d), now = new Date(), yt = new Date(); yt.setDate(yt.getDate()-1);
    if(dt.toDateString()===now.toDateString()) return `Hoje às ${dt.toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'})}`;
    if(dt.toDateString()===yt.toDateString()) return `Ontem às ${dt.toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'})}`;
    return `${dt.toLocaleDateString('pt-BR')} ${dt.toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'})}`;
}

function renderRecados() {
    const el = document.getElementById('recados-list');
    if (!recados.length) { el.innerHTML = '<div style="text-align:center;padding:30px;color:var(--text-muted)"><i class="fas fa-sticky-note" style="font-size:32px;opacity:.3;display:block;margin-bottom:10px"></i>Nenhum recado ainda</div>'; return; }
    el.innerHTML = [...recados].sort((a,b)=>new Date(b.data)-new Date(a.data)).map(r=>`
        <div class="recado-item" style="${r.lido?'opacity:.75':''}">
            <div class="recado-meta">
                <span class="recado-autor"><i class="fas fa-circle-user"></i> ${safeText(r.autor)}</span>
                <span class="recado-data">${fmtDate(r.data)}</span>
            </div>
            <div class="recado-text">${safeText(r.texto).replace(/\n/g,'<br>')}</div>
            <div class="recado-foot">
                <span class="recado-views"><i class="fas fa-eye"></i> ${r.visualizacoes||0}</span>
                <button class="recado-visto-btn" onclick="markSeen(${r.id})" ${r.lido?'disabled':''}>
                    <i class="fas ${r.lido?'fa-check-circle':'fa-check'}"></i>${r.lido?'Visto':'Marcar como visto'}
                </button>
            </div>
        </div>`).join('');
}

async function markSeen(id) {
    const r = recados.find(x=>x.id===id);
    if (!r||r.lido) return;
    r.visualizacoes++; r.lido = true;
    recadosLidos.push(id);
    localStorage.setItem('recadosLidos', JSON.stringify(recadosLidos));
    try { await fetch(GOOGLE_SHEETS_URL,{method:'PUT',mode:'no-cors',headers:{'Content-Type':'application/json'},body:JSON.stringify({id,visualizacoes:r.visualizacoes})}); } catch(e){}
    renderRecados(); updateRecadosCount();
}

function updateRecadosCount() {
    const n = recados.filter(r=>!r.lido).length;
    ['recados-badge','recados-count-top'].forEach(id=>{
        const el = document.getElementById(id);
        if (!el) return;
        el.textContent = n;
        el.style.display = n>0?'flex':'none';
    });
}

async function sendRecado() {
    const txt = document.getElementById('novo-recado').value.trim();
    if (!txt) return alert('Digite um recado!');
    const btn = document.getElementById('recado-send-btn');
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    btn.disabled = true;
    try {
        let autor = document.getElementById('recado-anon').checked ? 'Anônimo' : localStorage.getItem('userName');
        if (!autor||autor==='Anônimo') {
            autor = prompt('Seu nome:');
            if (!autor) { btn.innerHTML=orig; btn.disabled=false; return; }
            localStorage.setItem('userName', autor);
        }
        await fetch(GOOGLE_SHEETS_URL,{method:'POST',mode:'no-cors',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:Date.now(),texto:txt,autor,data:new Date().toISOString(),visualizacoes:0})});
        document.getElementById('novo-recado').value='';
        document.getElementById('recado-anon').checked=false;
        btn.innerHTML='<i class="fas fa-check"></i> Publicado!';
        setTimeout(()=>{btn.innerHTML=orig;btn.disabled=false;loadRecados();},1500);
    } catch(e) { alert('Erro ao publicar!'); btn.innerHTML=orig; btn.disabled=false; }
}

document.getElementById('recado-send-btn').addEventListener('click', sendRecado);
document.getElementById('novo-recado').addEventListener('keydown', e => { if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendRecado();} });

function toggleRecadosPanel() {
    const p = document.getElementById('recados-panel');
    p.classList.toggle('open');
    if (p.classList.contains('open')) loadRecados();
}
function closeRecadosPanel() { document.getElementById('recados-panel').classList.remove('open'); }

// close panels on outside click
document.addEventListener('click', e => {
    ['chat-panel','tools-panel','recados-panel'].forEach(id => {
        const panel = document.getElementById(id);
        const btn = document.getElementById(id.replace('-panel','-btn').replace('chat','chat'));
        if (panel && panel.classList.contains('open') &&
            !panel.contains(e.target) && e.target !== document.getElementById(id.split('-')[0]+'-btn') &&
            !e.target.closest('[onclick*="toggle"]') && !e.target.closest('[onclick*="open"]')) {
            panel.classList.remove('open');
        }
    });
});

// ==============================
// NOTIFICATIONS
// ==============================
let notifActive = localStorage.getItem('notif_active') !== 'false';
let lastId = parseInt(localStorage.getItem('last_recado_id')||'0');

function toggleNotif() {
    notifActive = !notifActive;
    localStorage.setItem('notif_active', notifActive);
    document.getElementById('notif-bell').textContent = notifActive ? '🔔' : '🔕';
    showToast(notifActive ? '🔔 Notificações ativadas' : '🔕 Notificações desativadas');
}

function showToast(msg) {
    const t = document.createElement('div');
    t.style.cssText = 'position:fixed;bottom:90px;right:24px;background:var(--navy);color:#fff;padding:10px 18px;border-radius:100px;font-size:13px;font-weight:600;z-index:9999;box-shadow:var(--shadow-lg);animation:slideInRight .3s ease';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(()=>t.remove(), 2500);
}

function playSound() {
    try {
        const ctx = new (window.AudioContext||window.webkitAudioContext)();
        const osc = ctx.createOscillator(), gain = ctx.createGain();
        osc.type='sine'; osc.frequency.value=880; gain.gain.value=.25;
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(); osc.stop(ctx.currentTime+.15);
        setTimeout(()=>{const o=ctx.createOscillator(),g=ctx.createGain();o.frequency.value=440;g.gain.value=.2;o.connect(g);g.connect(ctx.destination);o.start();o.stop(ctx.currentTime+.12);},180);
    } catch(e) {}
}

function showNotifPopup(r) {
    if (!notifActive || !r) return;
    const old = document.getElementById('notif-popup');
    if (old) old.remove();
    const el = document.createElement('div');
    el.id = 'notif-popup';
    el.innerHTML = `<div class="notif-icon"><i class="fas fa-sticky-note"></i></div><div class="notif-content"><div class="notif-title">${safeText(r.autor)||'Funcionário'}</div><div class="notif-msg">${safeText(r.texto).substring(0,55)}${safeText(r.texto).length>55?'…':''}</div></div><button class="notif-close" onclick="this.parentElement.remove()">×</button>`;
    el.addEventListener('click', e=>{ if(!e.target.classList.contains('notif-close')){ toggleRecadosPanel(); el.remove(); } });
    document.body.appendChild(el);
    setTimeout(()=>{ if(el.parentNode){el.style.animation='slideInRight .3s ease reverse';setTimeout(()=>el.remove(),300);} },5000);
}

async function checkNewRecados() {
    try {
        const data = await (await fetch(GOOGLE_SHEETS_URL)).json();
        if (!data||!data.length) return;
        const maxId = Math.max(...data.map(r=>r.id));
        if (maxId>lastId && lastId!==0) {
            const novo = data.find(r=>r.id===maxId);
            if (novo) { playSound(); showNotifPopup(novo); }
        }
        if (maxId>lastId) { lastId=maxId; localStorage.setItem('last_recado_id',lastId); }
        NotifBadge(data);
    } catch(e) {}
}

function NotifBadge(data) {
    const lidos = JSON.parse(localStorage.getItem('recadosLidos')||'[]');
    const n = data.filter(r=>!lidos.includes(r.id)).length;
    ['recados-badge','recados-count-top'].forEach(id=>{ const el=document.getElementById(id); if(el){el.textContent=n;el.style.display=n>0?'flex':'none';} });
}

// ==============================
// SAUDAÇÃO PERSONALIZADA
// ==============================
function getSaudacao() {
    const h = new Date().getHours();
    if (h >= 5  && h < 12) return { texto: 'Bom dia',   emoji: '☀️' };
    if (h >= 12 && h < 18) return { texto: 'Boa tarde',  emoji: '🌤️' };
    return                         { texto: 'Boa noite',  emoji: '🌙' };
}

function renderSaudacao() {
    const el = document.getElementById('saudacao-text');
    if (!el) return;
    const nome = localStorage.getItem('userName');
    const { texto, emoji } = getSaudacao();
    if (nome && nome !== 'Anônimo') {
        el.innerHTML = `${emoji} ${texto}, <span style="color:var(--teal)">${nome}</span>!`;
    } else {
        el.innerHTML = `${emoji} ${texto}, colaborador!`;
    }
}

// ==============================
// AVISOS DINÂMICOS (Google Sheets)
// ==============================
async function loadAvisos() {
    const container = document.getElementById('avisos-body');
    if (!container) return;

    try {
        const r = await fetch(GOOGLE_SHEETS_URL + '?action=getAvisos');
        const avisos = await r.json();

        if (!avisos.length) {
            container.innerHTML = '<div class="aviso-item"><span class="aviso-title">📭 Nenhum aviso no momento.</span></div>';
            return;
        }

        container.innerHTML = avisos.map(a => `
            <div class="aviso-item ${a.urgente ? '' : 'aviso-normal'}">
                <span class="aviso-title">${a.urgente ? '⚡' : '📌'} ${a.titulo}</span>
                <span class="aviso-date">📅 Publicado em: ${a.data}</span>
            </div>
        `).join('');

    } catch(e) {
        container.innerHTML = '<div class="aviso-item"><span class="aviso-title">⚠️ Não foi possível carregar os avisos.</span></div>';
    }
}

function openAvisoForm() {
    // Pré-preenche o nome se já tem salvo
    const nome = localStorage.getItem('userName');
    const inputAutor = document.getElementById('aviso-autor-input');
    if (nome && nome !== 'Anônimo' && inputAutor) inputAutor.value = nome;
    document.getElementById('aviso-modal-overlay').classList.add('open');
}

function closeAvisoForm() {
    document.getElementById('aviso-modal-overlay').classList.remove('open');
    document.getElementById('aviso-titulo-input').value = '';
    document.getElementById('aviso-urgente-check').checked = false;
}

async function submitAviso() {
    const titulo = document.getElementById('aviso-titulo-input').value.trim();
    const autor  = document.getElementById('aviso-autor-input').value.trim();
    const urgente = document.getElementById('aviso-urgente-check').checked;

    if (!titulo) return alert('Digite o título do aviso!');

    // Salva nome para próximas vezes
    if (autor) localStorage.setItem('userName', autor);

    const btn = document.getElementById('aviso-form-btn');
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Publicando…';
    btn.disabled = true;

    try {
        await fetch(GOOGLE_SHEETS_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'saveAviso',
                id: Date.now(),
                titulo,
                data: new Date().toLocaleDateString('pt-BR'),
                urgente
            })
        });

        btn.innerHTML = '<i class="fas fa-check"></i> Publicado!';
        setTimeout(() => {
            btn.innerHTML = orig;
            btn.disabled = false;
            closeAvisoForm();
            setTimeout(loadAvisos, 1000); // recarrega após 1s para pegar do servidor
        }, 1200);

    } catch(e) {
        alert('Erro ao publicar aviso!');
        btn.innerHTML = orig;
        btn.disabled = false;
    }
}

window.openAvisoForm  = openAvisoForm;
window.closeAvisoForm = closeAvisoForm;
window.submitAviso    = submitAviso;

// ==============================
// INIT
// ==============================
document.addEventListener('DOMContentLoaded', () => {
    renderSystems(systemsDB, '');
    renderTools('todas');
    renderSaudacao();
    loadAvisos();
    loadRecados();
    setInterval(loadRecados, 30000);
    setInterval(loadAvisos, 60000); // atualiza avisos a cada 1 min
    setTimeout(checkNewRecados, 2000);
    setInterval(checkNewRecados, 10000);
    if (Notification && Notification.permission==='default') setTimeout(()=>Notification.requestPermission(), 3000);
    document.getElementById('notif-bell').textContent = notifActive ? '🔔' : '🔕';
});

// expose globals for inline HTML
window.showYearSelection = showYearSelection;
window.showMonths = showMonths;
window.closeModal = closeModal;
window.filterLinks = filterLinks;
window.toggleDD = toggleDD;
window.toggleSidebar = toggleSidebar;
window.toggleChatPanel = toggleChatPanel;
window.closeChatPanel = closeChatPanel;
window.validatePass = validatePass;
window.toggleToolsPanel = toggleToolsPanel;
window.closeToolsPanel = closeToolsPanel;
window.openToolsPanel = openToolsPanel;
window.filterTools = filterTools;
window.openToolModal = openToolModal;
window.closeToolModal = closeToolModal;
window.toggleRecadosPanel = toggleRecadosPanel;
window.closeRecadosPanel = closeRecadosPanel;
window.markSeen = markSeen;
window.toggleTheme = toggleTheme;
window.toggleNotif = toggleNotif;
window.runNumExtenso = runNumExtenso;
window.runHoras = runHoras;
window.runTexto = runTexto;
window.setCalcMode = setCalcMode;
window.autoR3 = autoR3;
window.runPorc = runPorc;
window.runDoc = runDoc;
window.copyText = copyText;
