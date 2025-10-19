// Force scroll to top immediately
window.scrollTo(0, 0);
document.documentElement.scrollTop = 0;
document.body.scrollTop = 0;

// Disable scroll restoration
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

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

    // Force scroll to top again
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        document.body.classList.remove('loading');

        // Remove loading screen from DOM after fade
        setTimeout(() => {
            loadingScreen.remove();
            // Force scroll to top one more time after everything is loaded
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        }, 500);
    }, remainingTime);
});
