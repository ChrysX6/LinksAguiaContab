 document.getElementById('theme-toggle').addEventListener('click', () => {
            const body = document.body;
            const themeToggle = document.getElementById('theme-toggle');
            const logo = document.getElementById('logo');

            // Alterna o modo escuro
            body.classList.toggle('dark-mode');

            // Muda o ícone do botão e a logo dependendo do modo
            if (body.classList.contains('dark-mode')) {
                themeToggle.textContent = '🌙';  // Muda o ícone do botão para lua
                // Verifica se a logo existe antes de tentar mudar
                if (logo) {
                    logo.src = 'links/img/logo2.png';  // Logo para o modo escuro
                }
            } else {
                themeToggle.textContent = '☀️';  // Muda o ícone do botão para sol
                // Verifica se a logo existe antes de tentar mudar
                if (logo) {
                    logo.src = 'links/img/logo1.png';  // Logo para o modo claro
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
        });

        function toggleMonths(id) {
            const months = document.getElementById(id);
            const isOpen = months.classList.contains('open');
            
            // Fecha todas as seções de meses primeiro
            document.querySelectorAll('.months').forEach(section => {
                section.classList.remove('open');
            });
            
            // Se não estava aberto, abre a seção clicada
            if (!isOpen) {
                months.classList.add('open');
            }
        }

        function filterLinks() {
            const searchTerm = document.getElementById('search-bar').value.toLowerCase();
            const categories = document.querySelectorAll('.category');

            categories.forEach(category => {
                const monthsSections = category.querySelectorAll('.months');
                let categoryHasMatch = false;

                monthsSections.forEach(section => {
                    const links = section.querySelectorAll('.month-link');
                    let sectionHasMatch = false;

                    links.forEach(link => {
                        const isMatch = link.textContent.toLowerCase().includes(searchTerm);
                        link.style.display = isMatch ? '' : 'none';
                        if (isMatch) sectionHasMatch = true;
                    });

                    // Mostrar ou esconder a seção de meses com base no resultado
                    section.style.display = sectionHasMatch ? '' : 'none';
                    if (sectionHasMatch) section.classList.add('open');
                    else section.classList.remove('open');

                    if (sectionHasMatch) categoryHasMatch = true;
                });

                // Mostrar ou esconder a categoria inteira com base no resultado
                category.style.display = categoryHasMatch ? '' : 'none';
            });
        }