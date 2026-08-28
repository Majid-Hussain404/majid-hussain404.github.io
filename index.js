        const themeToggleBtn = document.getElementById('themeToggle');
        
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            // Update button text based on current theme
            if (document.body.classList.contains('dark-mode')) {
                themeToggleBtn.textContent = 'Toggle Light Mode';
            } else {
                themeToggleBtn.textContent = 'Toggle Dark Mode';
            }
        });