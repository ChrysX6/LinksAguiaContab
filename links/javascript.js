// ========== BALÃO DE FERRAMENTAS E RECADOS ==========
document.addEventListener('DOMContentLoaded', function() {
    // ===== CONFIGURAÇÃO DO GOOGLE SHEETS =====
    const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbzVd7j35SWxbCTJvK8QBXe8ZE5j_QTDHDxBYfR20pncdI55E2BDgXgB4UOKZk2ZYrZO/exec';
    
    // ========== BALÃO DE RECADOS ==========
    function initMuralRecados() {
        // Elementos do DOM
        const recadosIcon = document.getElementById('recadosIcon');
        const recadosPanel = document.getElementById('recadosPanel');
        const closeRecados = document.getElementById('closeRecados');
        const recadosList = document.getElementById('recadosList');
        const novoRecado = document.getElementById('novoRecado');
        const btnPublicar = document.getElementById('publicarRecado');
        const chkAnonimo = document.getElementById('recadoAnonimo');
        const recadosCount = document.getElementById('recadosCount');
        
        if (!recadosIcon) {
            console.log('Elementos do mural não encontrados');
            return;
        }
        
        let recados = [];
        let recadosLidos = JSON.parse(localStorage.getItem('recadosLidos') || '[]');
        
        // ===== CARREGAR RECADOS DO GOOGLE SHEETS =====
        async function carregarRecados() {
            try {
                const response = await fetch(GOOGLE_SHEETS_URL);
                recados = await response.json();
                
                recados.forEach(recado => {
                    recado.lido = recadosLidos.includes(recado.id);
                });
                
                renderizarRecados();
                atualizarContador();
            } catch (error) {
                console.error('Erro ao carregar recados:', error);
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
        
        // ===== PUBLICAR RECADO =====
        async function publicarRecado() {
            if (!novoRecado) return;
            
            const texto = novoRecado.value.trim();
            if (!texto) {
                alert('Digite um recado!');
                return;
            }
            
            const btn = document.getElementById('publicarRecado');
            const textoOriginal = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Publicando...';
            btn.disabled = true;
            
            try {
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
                
                await fetch(GOOGLE_SHEETS_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(novoRecadoObj)
                });
                
                novoRecado.value = '';
                if (chkAnonimo) chkAnonimo.checked = false;
                
                btn.innerHTML = '<i class="fas fa-check"></i> Publicado!';
                setTimeout(() => {
                    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Publicar';
                    btn.disabled = false;
                }, 1500);
                
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
                recado.visualizacoes = (recado.visualizacoes || 0) + 1;
                recado.lido = true;
                
                if (!recadosLidos.includes(id)) {
                    recadosLidos.push(id);
                    localStorage.setItem('recadosLidos', JSON.stringify(recadosLidos));
                }
                
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
            if (!recadosCount) return;
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
        
        // ===== EVENT LISTENERS DO MURAL =====
        if (recadosIcon) {
            recadosIcon.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Mural clicado!');
                recadosPanel.classList.add('active');
                carregarRecados();
            });
        }
        
        if (closeRecados) {
            closeRecados.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
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
        
        document.addEventListener('click', function(event) {
            const recadosBubble = document.getElementById('recadosBubble');
            if (recadosBubble && !recadosBubble.contains(event.target) && recadosPanel && recadosPanel.classList.contains('active')) {
                recadosPanel.classList.remove('active');
            }
        });
        
        carregarRecados();
        setInterval(carregarRecados, 30000);
    }

    // ========== BASE DE DADOS DAS FERRAMENTAS ==========
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
            description: 'Calcula horas trabalhadas (entrada/saída/intervalo)',
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
            name: 'Calculadora % e Regra de 3',
            description: 'Porcentagem, descontos, aumentos e regra de 3',
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

    // ========== ELEMENTOS DO BALÃO DE FERRAMENTAS ==========
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
    if (toolsCount) toolsCount.textContent = popularCount;

    // ========== FUNÇÕES DAS FERRAMENTAS ==========
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

    function openToolModal(tool) {
        if (!toolModalTitle || !toolModalBody || !toolModal) return;
        
        toolModalTitle.innerHTML = `<i class="${tool.icon}"></i> ${tool.name}`;
        toolModalBody.innerHTML = getToolContent(tool.id);
        toolModal.classList.add('active');
        
        setTimeout(() => {
            initializeTool(tool.id);
        }, 150);
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
                            <i class="fas fa-calculator"></i> Calcular Horas Trabalhadas
                        </button>
                        
                        <div id="resultadoHoras" class="tool-result" style="display: none;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                                <span>⏰ Manhã:</span>
                                <span id="horasManha"></span>
                            </div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                                <span>🌆 Tarde:</span>
                                <span id="horasTarde"></span>
                            </div>
                            <div style="display: flex; justify-content: space-between; font-size: 20px; margin-top: 10px; padding-top: 10px; border-top: 2px solid var(--border-color);">
                                <span><strong>TOTAL:</strong></span>
                                <span id="horasTotal" style="color: var(--accent-color); font-weight: 700;"></span>
                            </div>
                            <small id="horasDecimais" style="display: block; margin-top: 10px;"></small>
                        </div>
                        <div class="tool-actions">
                            <button id="copiarHoras" class="tool-action-btn" style="display: none;">
                                <i class="fas fa-copy"></i> Copiar Horário
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
                            <button id="tipoPorcentagem" class="tool-button" style="flex:1; background: var(--gradient-primary);" data-tipo="porcentagem">
                                <i class="fas fa-percent"></i> Porcentagem
                            </button>
                            <button id="tipoRegra3" class="tool-button" style="flex:1; background: var(--bg-secondary); color: var(--text-primary);" data-tipo="regra3">
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
                                    <label>Valor A:</label>
                                    <input type="number" id="regraA" class="tool-input" placeholder="Ex: 10">
                                </div>
                                <div style="font-size: 20px; color: var(--text-primary);">→</div>
                                <div class="tool-input-group" style="flex:1;">
                                    <label>Valor B:</label>
                                    <input type="number" id="regraB" class="tool-input" placeholder="Ex: 20">
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <div class="tool-input-group" style="flex:1;">
                                    <label>Valor C:</label>
                                    <input type="number" id="regraC" class="tool-input" placeholder="Ex: 30">
                                </div>
                                <div style="font-size: 20px; color: var(--text-primary);">=</div>
                                <div class="tool-input-group" style="flex:1;">
                                    <label>Valor D (X):</label>
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
            
            default:
                return '<p>Ferramenta em desenvolvimento...</p>';
        }
    }

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
            case 'porcentagem':
                initPorcentagemERegra3();
                break;
            case 'formatar-cnpj':
                initFormatarDocumento();
                break;
        }
    }

    // ========== FUNÇÕES DAS FERRAMENTAS ==========
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

    function initCalculoHoras() {
        const btn = document.getElementById('calcularHoras');
        if (!btn) return;
        
        const novoBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(novoBtn, btn);
        
        novoBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const entradaManha = document.getElementById('entradaManha').value;
            const saidaManha = document.getElementById('saidaManha').value;
            const entradaTarde = document.getElementById('entradaTarde').value;
            const saidaTarde = document.getElementById('saidaTarde').value;
            
            const resultadoDiv = document.getElementById('resultadoHoras');
            const horasManha = document.getElementById('horasManha');
            const horasTarde = document.getElementById('horasTarde');
            const horasTotal = document.getElementById('horasTotal');
            const horasDecimais = document.getElementById('horasDecimais');
            const copiarBtn = document.getElementById('copiarHoras');
            
            if (!entradaManha || !saidaManha || !entradaTarde || !saidaTarde) {
                alert('Preencha todos os horários!');
                return;
            }
            
            function calcularDiferenca(inicio, fim) {
                const [h1, m1] = inicio.split(':').map(Number);
                const [h2, m2] = fim.split(':').map(Number);
                
                let minutosInicio = h1 * 60 + m1;
                let minutosFim = h2 * 60 + m2;
                
                if (minutosFim < minutosInicio) {
                    minutosFim += 24 * 60;
                }
                
                return minutosFim - minutosInicio;
            }
            
            const minutosManha = calcularDiferenca(entradaManha, saidaManha);
            const minutosTarde = calcularDiferenca(entradaTarde, saidaTarde);
            const totalMinutos = minutosManha + minutosTarde;
            
            function formatarHoras(minutos) {
                const horas = Math.floor(minutos / 60);
                const mins = minutos % 60;
                return `${horas}h ${mins}min`;
            }
            
            horasManha.textContent = formatarHoras(minutosManha);
            horasTarde.textContent = formatarHoras(minutosTarde);
            horasTotal.textContent = formatarHoras(totalMinutos);
            horasDecimais.innerHTML = `<i class="fas fa-chart-line"></i> Total em horas decimais: ${(totalMinutos / 60).toFixed(2)}h`;
            
            resultadoDiv.style.display = 'block';
            copiarBtn.style.display = 'inline-flex';
        });
        
        const copiarBtn = document.getElementById('copiarHoras');
        if (copiarBtn) {
            const novoCopiar = copiarBtn.cloneNode(true);
            copiarBtn.parentNode.replaceChild(novoCopiar, copiarBtn);
            
            novoCopiar.addEventListener('click', function(e) {
                e.preventDefault();
                const horasTotal = document.getElementById('horasTotal').textContent;
                navigator.clipboard.writeText(`Total de horas: ${horasTotal}`);
                alert('Horário copiado!');
            });
        }
    }

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

    function initPorcentagemERegra3() {
        const btnPorcentagem = document.getElementById('tipoPorcentagem');
        const btnRegra3 = document.getElementById('tipoRegra3');
        const porcentagemContainer = document.getElementById('porcentagemContainer');
        const regra3Container = document.getElementById('regra3Container');
        const btnCalcular = document.getElementById('calcularPorcentagem');
        
        let tipoAtual = 'porcentagem';
        
        if (btnPorcentagem && btnRegra3) {
            btnPorcentagem.addEventListener('click', function() {
                tipoAtual = 'porcentagem';
                btnPorcentagem.style.background = 'var(--gradient-primary)';
                btnPorcentagem.style.color = 'white';
                btnRegra3.style.background = 'var(--bg-secondary)';
                btnRegra3.style.color = 'var(--text-primary)';
                porcentagemContainer.style.display = 'block';
                regra3Container.style.display = 'none';
            });
            
            btnRegra3.addEventListener('click', function() {
                tipoAtual = 'regra3';
                btnRegra3.style.background = 'var(--gradient-primary)';
                btnRegra3.style.color = 'white';
                btnPorcentagem.style.background = 'var(--bg-secondary)';
                btnPorcentagem.style.color = 'var(--text-primary)';
                porcentagemContainer.style.display = 'none';
                regra3Container.style.display = 'block';
                
                const inputs = ['regraA', 'regraB', 'regraC'];
                inputs.forEach(id => {
                    const input = document.getElementById(id);
                    if (input) {
                        input.addEventListener('input', calcularRegra3);
                    }
                });
            });
        }
        
        function calcularRegra3() {
            const A = parseFloat(document.getElementById('regraA')?.value) || 0;
            const B = parseFloat(document.getElementById('regraB')?.value) || 0;
            const C = parseFloat(document.getElementById('regraC')?.value) || 0;
            const regraD = document.getElementById('regraD');
            
            if (regraD && A !== 0 && B !== 0 && C !== 0) {
                const resultado = (B * C) / A;
                regraD.value = resultado.toFixed(2);
            } else if (regraD) {
                regraD.value = '';
            }
        }
        
        if (btnCalcular) {
            const novoCalcular = btnCalcular.cloneNode(true);
            btnCalcular.parentNode.replaceChild(novoCalcular, btnCalcular);
            
            novoCalcular.addEventListener('click', function(e) {
                e.preventDefault();
                
                if (tipoAtual === 'porcentagem') {
                    const tipo = document.getElementById('tipoPorcentagemCalc')?.value;
                    const porcentagem = parseFloat(document.getElementById('porcentagemValor')?.value) || 0;
                    const total = parseFloat(document.getElementById('totalValor')?.value) || 0;
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
                    
                    if (porcentagemTexto) porcentagemTexto.textContent = texto;
                    if (resultadoDiv) resultadoDiv.style.display = 'block';
                    
                } else {
                    calcularRegra3();
                    const resultadoDiv = document.getElementById('resultadoPorcentagem');
                    const porcentagemTexto = document.getElementById('porcentagemTexto');
                    const D = document.getElementById('regraD')?.value;
                    
                    if (D && porcentagemTexto && resultadoDiv) {
                        porcentagemTexto.textContent = `Resultado: ${D}`;
                        resultadoDiv.style.display = 'block';
                    }
                }
            });
        }
    }

    function initFormatarDocumento() {
        const btn = document.getElementById('formatarDocumento');
        if (!btn) return;
        
        const novoBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(novoBtn, btn);
        
        novoBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const doc = document.getElementById('documentoInput')?.value.replace(/\D/g, '') || '';
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
                if (documentoTexto) documentoTexto.textContent = 'Documento inválido!';
                if (documentoStatus) documentoStatus.textContent = 'Verifique a quantidade de dígitos';
                if (resultadoDiv) resultadoDiv.style.display = 'block';
                return;
            }
            
            if (documentoTexto) documentoTexto.textContent = formatado;
            if (documentoStatus) {
                documentoStatus.textContent = `${tipo} ${valido ? 'válido ✓' : 'inválido ✗'}`;
                documentoStatus.style.color = valido ? 'var(--accent-color)' : '#dc3545';
            }
            if (resultadoDiv) resultadoDiv.style.display = 'block';
        });
    }

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
    if (toolsIcon) {
        toolsIcon.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toolsPanel.classList.add('active');
            renderTools('todas');
            categoryBtns.forEach(btn => btn.classList.remove('active'));
            const todasBtn = document.querySelector('[data-category="todas"]');
            if (todasBtn) todasBtn.classList.add('active');
        });
    }

    if (closeTools) {
        closeTools.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toolsPanel.classList.remove('active');
        });
    }

    document.addEventListener('click', function(event) {
        const toolsBubble = document.getElementById('toolsBubble');
        if (toolsBubble && !toolsBubble.contains(event.target) && toolsPanel && toolsPanel.classList.contains('active')) {
            toolsPanel.classList.remove('active');
        }
    });

    if (categoryBtns.length > 0) {
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const category = this.dataset.category;
                categoryBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                renderTools(category);
            });
        });
    }

    if (closeToolModal) {
        closeToolModal.addEventListener('click', function() {
            toolModal.classList.remove('active');
        });
    }

    window.addEventListener('click', function(event) {
        if (event.target === toolModal) {
            toolModal.classList.remove('active');
        }
    });

    if (toolsPanel) {
        toolsPanel.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    }

    // ===== INICIALIZAR TUDO =====
    renderTools('todas');
    initMuralRecados();
});
