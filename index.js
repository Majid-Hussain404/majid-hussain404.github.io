// Clean lightweight progressive enhancement
document.addEventListener('DOMContentLoaded', () => {
    // Reveal blocks smoothly on load without jerky transitions
    const blocks = document.querySelectorAll('.section-block, .resume-header');
    blocks.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(8px)';
        el.style.transition = `opacity 0.4s ease ${index * 0.06}s, transform 0.4s ease ${index * 0.06}s`;
        
        requestAnimationFrame(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    });
});