(function () {
    // ---------- Faixa de boas-festas + contagem regressiva ----------
    function diasParaNatal() {
        const hoje = new Date();
        let natal = new Date(hoje.getFullYear(), 11, 25);
        const h0 = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
        if (h0 > natal) natal = new Date(hoje.getFullYear() + 1, 11, 25);
        return Math.round((natal - h0) / 86400000);
    }

    function criarBanner() {
        const content = document.getElementById('content');
        if (!content || document.getElementById('natal-banner')) return;

        const d = diasParaNatal();
        const texto = d === 0 ? 'Hoje é Natal! 🎄'
                    : d === 1 ? 'Falta 1 dia para o Natal'
                    : `Faltam ${d} dias para o Natal`;

        const el = document.createElement('div');
        el.id = 'natal-banner';
        el.className = 'natal-banner';
        el.innerHTML = `
            <div style="position:relative;z-index:1">
                <div class="natal-banner-title">🎄 Boas <span>Festas</span> da Aguiacontab</div>
                <div class="natal-banner-sub">Desejamos a toda a equipe um Feliz Natal e um próspero Ano Novo.</div>
            </div>
            <div class="natal-countdown">${texto}</div>`;
        content.insertBefore(el, content.firstChild);
    }

    // ---------- Neve discreta ----------
    function iniciarNeve() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const canvas = document.createElement('canvas');
        canvas.id = 'natal-snow';
        document.body.appendChild(canvas);
        const ctx = canvas.getContext('2d');

        let w, h, flocos;
        const qtd = window.innerWidth < 768 ? 25 : 55;

        function resize() {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        }
        function novoFloco(topo) {
            return {
                x: Math.random() * w,
                y: topo ? -10 : Math.random() * h,
                r: Math.random() * 2.2 + 0.8,
                v: Math.random() * 0.7 + 0.3,
                d: Math.random() * Math.PI * 2
            };
        }
        resize();
        flocos = Array.from({ length: qtd }, () => novoFloco(false));
        window.addEventListener('resize', resize);

        function loop() {
            ctx.clearRect(0, 0, w, h);
            ctx.fillStyle = 'rgba(255,255,255,.85)';
            flocos.forEach((f, i) => {
                f.y += f.v;
                f.d += 0.01;
                f.x += Math.sin(f.d) * 0.4;
                if (f.y > h + 10) flocos[i] = novoFloco(true);
                ctx.beginPath();
                ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
                ctx.fill();
            });
            requestAnimationFrame(loop);
        }
        loop();
    }

    document.addEventListener('DOMContentLoaded', () => {
        criarBanner();
        iniciarNeve();
    });
})();