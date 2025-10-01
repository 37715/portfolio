// Loading screen
document.body.classList.add('loading');

// Create loading screen element
const loadingScreen = document.createElement('div');
loadingScreen.className = 'loading-screen';
loadingScreen.innerHTML = '<div class="loader">e</div>';
document.body.insertBefore(loadingScreen, document.body.firstChild);

// Minimum loading time of 1 second
const minLoadTime = 1000;
const startTime = Date.now();

window.addEventListener('load', () => {
    const elapsed = Date.now() - startTime;
    const remainingTime = Math.max(0, minLoadTime - elapsed);

    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        document.body.classList.remove('loading');

        // Remove loading screen from DOM after fade
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }, remainingTime);
});
