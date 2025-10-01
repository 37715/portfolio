// Custom scroll indicator that grows from top
const scrollIndicator = document.querySelector('.scroll-indicator');

function updateScrollIndicator() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (docHeight === 0) {
        scrollIndicator.style.height = '0px';
        return;
    }

    const scrollPercent = (scrollTop / docHeight);
    const windowHeight = window.innerHeight;

    scrollIndicator.style.height = (scrollPercent * windowHeight) + 'px';
}

window.addEventListener('scroll', updateScrollIndicator, { passive: true });
window.addEventListener('resize', updateScrollIndicator);

// Initialize
updateScrollIndicator();
