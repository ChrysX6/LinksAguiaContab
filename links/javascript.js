// ==============================
// CONFIG
// ==============================
const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbzVd7j35SWxbCTJvK8QBXe8ZE5j_QTDHDxBYfR20pncdI55E2BDgXgB4UOKZk2ZYrZO/exec';

// ==============================
// IA
// ==============================
function openAI(url) {
    window.open(url, '_blank');
}
let secretBtnVisible = false;

document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'y') {
        event.preventDefault();
        secretBtnVisible = !secretBtnVisible;
        const btn = document.getElementById('secret-btn');
        if (secretBtnVisible) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    }
});

function handleSecretBtnClick() {
    showToast('Funcionalidade secreta removida. Use o botão "Chat Interno" acima do mural.');
}

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
    
    // Animar a logo
    const logo = document.getElementById('sidebar-logo');
    if (logo) {
        const img = logo.querySelector('img');
        if (img) {
            // Remove a animação anterior
            img.style.animation = '';
            
            // Force reflow para reiniciar a animação
            void img.offsetWidth;
            
            // Aplica a nova animação
            img.style.animation = 'logoFlip 0.6s cubic-bezier(.34,.1,.68,1)';
        }
        logo.src = dark ? 'links/img/logo1.jpg' : 'links/img/logo1.jpg';
    }
}
(function initTheme() {
    const t = localStorage.getItem('theme');
    if (t === 'dark') {
        document.body.classList.add('dark');
        const btn = document.getElementById('theme-toggle');
        if (btn) btn.textContent = '🌙';
        const logo = document.getElementById('sidebar-logo');
        if (logo) logo.src = 'links/img/logo1.jpg';
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
        2026: { 'janeiro':'https://drive.google.com/drive/folders/1wRZCDogRXtmLFOkNtYI6Jt7OBEKAw1qB?usp=drive_link','fevereiro':'https://drive.google.com/drive/folders/1IsLBfSuS_3fYUSG4eaYgn4Cyz9_DihBg?usp=drive_link','março':'https://drive.google.com/drive/folders/1hel_PCcbQ7eordwcDS_quj2yvQkta2i4?usp=drive_link','abril':'https://drive.google.com/drive/folders/1S33RWlzZK2kH_3uHY2Cg5up9M30US469?usp=drive_link','maio':'https://drive.google.com/drive/folders/1PRlq8rS61KBvndPq1IxsrEBGr_uPGLJ1?usp=drive_link','junho':'https://drive.google.com/drive/folders/1bDaPzWIXWD_keWIDgeH4MTA-nekTm8X7?usp=drive_link','julho':'https://drive.google.com/drive/folders/1_p1tWJ5M2qZzGzHHsVljOVznZjRIo_q9?usp=drive_link','agosto':'https://drive.google.com/drive/folders/1-uf2926nJhyyka2BJyZuSnQo3jJm83x2?usp=drive_link','setembro':'https://drive.google.com/drive/folders/1JqT0jxqwbGretxBeOsH6g3EeV8DZCyns?usp=drive_link','outubro':'https://drive.google.com/drive/folders/15DvjIjceDIHRzYIXb0GFfpZbZ2CLCoOi?usp=drive_link','novembro':'https://drive.google.com/drive/folders/1HAuLNhECCbhV9CA0yjkNinaTb5B-U3zk?usp=drive_link','dezembro':'https://drive.google.com/drive/folders/1Z5evXqJkpFOugl_CXeN4s6XtqnvfusTv?usp=drive_link' }
    },
    'simples-nacional': {
        2026: { 'janeiro':'https://drive.google.com/drive/folders/1Vu5sZ_1VoxEqRoc5iVIQAvN6zDNPpXlb?usp=drive_link','fevereiro':'https://drive.google.com/drive/folders/1Sxl4YMezMlqzb_O--6E9x7N_5WogzGm9?usp=drive_link','março':'https://drive.google.com/drive/folders/1RleLg6HSklPLrHBHWdbA_7ud8QlrxQLz?usp=drive_link','abril':'https://drive.google.com/drive/folders/1ShRfUEIB_1LfpQTLGNM9_F5UMOsbwlLc?usp=drive_link','maio':'https://drive.google.com/drive/folders/1ePf1BLHWaOlofrzefafxN2GRD7RchSEb?usp=drive_link','junho':'https://drive.google.com/drive/folders/1IE0FO6wi4hD3NZe5cxpOUOyrE575YviL?usp=drive_link','julho':'https://drive.google.com/drive/folders/1wNeIrst5Vc6CgrpEB8UTM7Xb8pQxYKR5?usp=drive_link','agosto':'https://drive.google.com/drive/folders/1x4OAL9AUa_hxaU0i8_BxSaYgGlUXdjnu?usp=drive_link','setembro':'https://drive.google.com/drive/folders/1pgLnYdBxbJV8OLM5uPWX1HB93BXcWiEZ?usp=drive_link','outubro':'https://drive.google.com/drive/folders/11-wP_x34Ib0lbEgUaAVAIAsCZkLTdXsG?usp=drive_link','novembro':'https://drive.google.com/drive/folders/1RkQx6IOwGQhVmgJOA3KbCEebhr4ZfyLk?usp=drive_link','dezembro':'https://drive.google.com/drive/folders/1YSlhziEQoZ9CM5BS-Jwzz4DGBNsTsmeo?usp=drive_link' }
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
    ['recados-panel'].forEach(id => {
        const panel = document.getElementById(id);
        if (panel && panel.classList.contains('open') &&
            !panel.contains(e.target) && e.target !== document.getElementById('recados-btn') &&
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
    const h = new Date().getHours();
    const isNoturno = h >= 18 || h < 5;
    const corNome = isNoturno ? 'var(--gold)' : 'var(--teal)';
    
    if (nome && nome !== 'Anônimo') {
        el.innerHTML = `${emoji} ${texto}, <span style="color:${corNome}">${nome}</span>!`;
    } else {
        el.innerHTML = `${emoji} ${texto}, colaborador!`;
    }
}

// ==============================
// INIT
// ==============================
document.addEventListener('DOMContentLoaded', () => {
    renderSystems(systemsDB, '');
    renderSaudacao();
    loadRecados();
    setInterval(loadRecados, 30000);
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
window.toggleRecadosPanel = toggleRecadosPanel;
window.closeRecadosPanel = closeRecadosPanel;
window.markSeen = markSeen;
window.toggleTheme = toggleTheme;
window.toggleNotif = toggleNotif;
window.openAI = openAI;
