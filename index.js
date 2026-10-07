/**
 * Opens and filters the dossier modal based on target scope.
 * @param {'all' | 'objective' | 'capabilities' | 'education'} scope
 */
function openDossierModal(scope) {
    const modal = document.getElementById('resumeModal');
    const modalCard = modal.querySelector('.modal-card');
    const modalTitle = document.getElementById('modalTitle');
    
    const sections = {
        objective: document.getElementById('section-objective'),
        capabilities: document.getElementById('section-capabilities'),
        education: document.getElementById('section-education')
    };

    // Reset visibility on all sections
    Object.values(sections).forEach(section => {
        section.classList.remove('is-hidden');
    });

    if (scope === 'all') {
        // Show all sections
        modalTitle.textContent = "Majid Hussain Mir — Complete Dossier";
        modalCard.classList.remove('narrow');
    } else {
        // Hide every section except the requested one
        Object.keys(sections).forEach(key => {
            if (key !== scope) {
                sections[key].classList.add('is-hidden');
            }
        });

        // Set tailored header & layout constraints
        const titles = {
            objective: "01 // Career Objective",
            capabilities: "02 // Technical & Professional Skills",
            education: "03 // Academic History"
        };
        modalTitle.textContent = titles[scope] || "Dossier Detail";

        // Adjust card width for single-column text sections
        if (scope === 'objective' || scope === 'education') {
            modalCard.classList.add('narrow');
        } else {
            modalCard.classList.remove('narrow');
        }
    }

    // Display modal and prevent background scroll
    modal.classList.add('is-active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

/**
 * Closes the dossier modal and resets state.
 */
function closeDossierModal() {
    const modal = document.getElementById('resumeModal');
    modal.classList.remove('is-active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

/**
 * Closes modal when clicking outside the card container.
 */
function handleBackdropClick(event) {
    if (event.target.id === 'resumeModal') {
        closeDossierModal();
    }
}

// Global keyboard accessibility listener (Escape key)
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        const modal = document.getElementById('resumeModal');
        if (modal && modal.classList.contains('is-active')) {
            closeDossierModal();
        }
    }
});