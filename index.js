 // Clean entry fade-in
document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelector('.site-wrapper');
    if (wrapper) {
        wrapper.style.opacity = '0';
        wrapper.style.transform = 'translateY(12px)';
        wrapper.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        
        requestAnimationFrame(() => {
            wrapper.style.opacity = '1';
            wrapper.style.transform = 'translateY(0)';
        });
    }
});
// =====================================================
// PORTFOLIO SECTION NAVIGATION
// =====================================================

const sectionTitles = {
    objective: 'Majid Hussain Mir — Career Objective',
    capabilities: 'Majid Hussain Mir — Capabilities',
    education: 'Majid Hussain Mir — Education',
    contact: 'Majid Hussain Mir — Contact',
    all: 'Majid Hussain Mir — Complete Dossier'
};

function openDrawer(section) {
    const drawer = document.getElementById('resumeDrawer');

    if (!drawer) {
        console.error('resumeDrawer not found');
        return;
    }

    const drawerBody = drawer.querySelector('.drawer-body');
    const titleElement = document.getElementById('drawerTitle');
    const allSections = drawer.querySelectorAll('.drawer-section');

    // Hide every section first
    allSections.forEach(sectionElement => {
        sectionElement.hidden = true;
    });

    // Show all sections when "Explore Resume" is clicked
    if (section === 'all') {

        allSections.forEach(sectionElement => {
            sectionElement.hidden = false;
        });

        if (titleElement) {
            titleElement.textContent = sectionTitles.all;
        }

    } else {

        // Find only the section that was clicked
        const targetSection =
            document.getElementById('drawer-' + section);

        if (!targetSection) {
            console.error('Section not found: drawer-' + section);
            return;
        }

        // Show ONLY this section
        targetSection.hidden = false;

        if (titleElement) {
            titleElement.textContent =
                sectionTitles[section] || 'Majid Hussain Mir';
        }
    }

    // Scroll drawer to the top
    if (drawerBody) {
        drawerBody.scrollTop = 0;
    }

    // Open drawer
    drawer.classList.add('active');
}


// =====================================================
// CLOSE DRAWER
// =====================================================

function closeDrawer() {
    const drawer = document.getElementById('resumeDrawer');

    if (drawer) {
        drawer.classList.remove('active');
    }
}


// Close when clicking outside the drawer
function closeDrawerOnOut(event) {
    if (event.target.id === 'resumeDrawer') {
        closeDrawer();
    }
}


// Close with ESC key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeDrawer();
    }
});