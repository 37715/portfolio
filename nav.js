// Disable automatic scroll restoration
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Handle navigation switching with page transitions
const navItems = document.querySelectorAll('.nav-item');
const pages = document.querySelectorAll('.page');
const emailLink = document.querySelector('.email-link');

let currentPage = 'works';

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();

        const targetPage = item.getAttribute('data-page');

        if (targetPage === currentPage) return;

        // Get current and target page elements
        const currentPageEl = document.querySelector(`.page[data-page="${currentPage}"]`);
        const targetPageEl = document.querySelector(`.page[data-page="${targetPage}"]`);

        // Determine if we're going to or from works page
        const goingToWorks = targetPage === 'works';
        const leavingWorks = currentPage === 'works';

        if (leavingWorks) {
            // Leaving works - slide out to right
            currentPageEl.classList.add('slide-out-right');

            setTimeout(() => {
                currentPageEl.classList.remove('active', 'slide-out-right');
                targetPageEl.classList.add('active');

                currentPage = targetPage;

                // Update nav active state
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');

                // Show/hide email based on page
                if (targetPage === 'about' || targetPage === 'contact') {
                    document.body.classList.add('no-scroll');
                    // Trigger animation
                    targetPageEl.classList.remove('animate-in');
                    void targetPageEl.offsetWidth;
                    targetPageEl.classList.add('animate-in');
                } else {
                    document.body.classList.remove('no-scroll');
                }
            }, 1500);
        } else if (goingToWorks) {
            // Animate out the about page
            currentPageEl.classList.remove('animate-in');
            currentPageEl.classList.add('animate-out');

            // Show works page immediately but with delayed animations
            // Make sure works page is in pristine state
            targetPageEl.style.display = 'none';
            targetPageEl.classList.remove('slide-out-right');

            // Force reflow
            void targetPageEl.offsetHeight;

            // Re-enable and start animation
            targetPageEl.style.display = '';
            targetPageEl.classList.add('active', 'slide-in-from-right');

            // Wait for about page animation to finish before hiding it
            setTimeout(() => {
                currentPageEl.classList.remove('active', 'animate-out');

                // Reset scroll and menu position
                if (window.resetToFirstProject) {
                    window.resetToFirstProject();
                }

                currentPage = targetPage;

                // Update nav active state
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');

                document.body.classList.remove('no-scroll');

                // Clean up animation class after it completes
                setTimeout(() => {
                    targetPageEl.classList.remove('slide-in-from-right');
                }, 1500);
            }, 100);
        } else {
            // Between about and contact
            // Scroll to top first
            window.scrollTo(0, 0);

            // Animate out current page
            currentPageEl.classList.remove('animate-in');
            currentPageEl.classList.add('animate-out');

            setTimeout(() => {
                currentPageEl.classList.remove('active', 'animate-out');
                targetPageEl.classList.add('active');

                currentPage = targetPage;

                // Update nav active state
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');

                document.body.classList.add('no-scroll');

                // Trigger animation for target page
                targetPageEl.classList.remove('animate-in');
                void targetPageEl.offsetWidth;
                targetPageEl.classList.add('animate-in');
            }, 600);
        }
    });
});

// Initialize - show email if on about page
if (currentPage === 'about') {
    emailLink.classList.add('visible');
}

// Scroll to top on page load - force it immediately and on load
window.scrollTo(0, 0);

window.addEventListener('DOMContentLoaded', () => {
    window.scrollTo(0, 0);
});

window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

// Also catch page show event (for back/forward navigation)
window.addEventListener('pageshow', () => {
    window.scrollTo(0, 0);
});
