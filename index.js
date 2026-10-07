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
