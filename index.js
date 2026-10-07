// Section Titles mapping
const modalHeaders = {
    all: "Majid Hussain Mir — Complete Dossier",
    objective: "01 // Career Objective",
    capabilities: "02 // Technical & Professional Skills",
    education: "03 // Education History"
};

function openModal(sectionKey) {
    const backdrop = document.getElementById('resumeModal');
    const card = document.getElementById('modalCard');
    const title = document.getElementById('modalTitle');
    const sections = document.querySelectorAll('.dossier-section');

    // Update the modal header
    title.textContent = modalHeaders[sectionKey] || modalHeaders.all;

    // Adjust card width: narrow for compact single sections, wide for capabilities or all
    if (sectionKey === 'objective' || sectionKey === 'education') {
        card.classList.add('narrow');
    } else {
        card.classList.remove('narrow');
    }

    // Toggle visibility per section
    sections.forEach(section => {
        if (sectionKey === 'all') {
            section.classList.remove('is-hidden');
        } else {
            if (section.id === `section-${sectionKey}`) {
                section.classList.remove('is-hidden');
            } else {
                section.classList.add('is-hidden');
            }
        }
    });

    // Reset scroll position to the top and display
    document.querySelector('.modal-body').scrollTop = 0;
    backdrop.classList.add('is-active');
}

function closeModal() {
    const backdrop = document.getElementById('resumeModal');
    if (backdrop) {
        backdrop.classList.remove('is-active');
    }
}

function closeModalOnBackdrop(event) {
    if (event.target.id === 'resumeModal') {
        closeModal();
    }
}

// Close on Escape key press
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeModal();
    }
});