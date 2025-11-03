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
    const TARGET_LINK = "https://docs.google.com/spreadsheets/d/1fmeTfc1coBy_8LMT8aSjxfh6b9VC1slv/edit?usp=sharing&ouid=104502217953424660775&rtpof=true&sd=true"; // SUBSTITUA PELO SEU LINK
    
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
