// Custom scroll snapping for FX sections
let isSnapping = false;
let snapTimeout;

// Wait for DOM to be ready
setTimeout(() => {
    const projectSections = document.querySelectorAll('.fx-image-section');
    const projectItems = document.querySelectorAll('.fx-left-item');

    // Function to update active menu item
    function updateActiveMenuItem(sectionIndex) {
        projectItems.forEach((item, i) => {
            if (i === sectionIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    window.addEventListener('wheel', (e) => {
        // Only work on works page
        const worksPage = document.querySelector('.works-page');
        if (!worksPage || !worksPage.classList.contains('active')) return;

        // Disable on mobile
        if (window.innerWidth <= 1024) return;

        e.preventDefault();

        if (isSnapping) return;

        // Get pinned section bounds
        const pinnedSection = document.querySelector('.fx-pinned-section');
        if (!pinnedSection) return;

        const sectionHeight = pinnedSection.offsetHeight;
        const sectionTop = pinnedSection.offsetTop;
        const currentScroll = window.pageYOffset;

        // Calculate target section based on scroll within pinned area
        const scrollInSection = currentScroll - sectionTop;
        const currentIndex = Math.floor((scrollInSection / sectionHeight) * projectSections.length);

        let targetIndex = -1;

        if (e.deltaY > 0) {
            // Scrolling down
            targetIndex = Math.min(currentIndex + 1, projectSections.length - 1);
        } else {
            // Scrolling up
            targetIndex = Math.max(currentIndex - 1, 0);
        }

        if (targetIndex !== -1 && targetIndex !== currentIndex) {
            isSnapping = true;

            // Calculate target scroll position
            const targetScroll = sectionTop + (sectionHeight / projectSections.length) * targetIndex;

            // Custom smooth scroll
            const start = window.pageYOffset;
            const distance = targetScroll - start;
            const duration = 800;
            const startTime = performance.now();

            function easeOutCubic(t) {
                return 1 - Math.pow(1 - t, 3);
            }

            function animation(currentTime) {
                const timeElapsed = currentTime - startTime;
                const progress = Math.min(timeElapsed / duration, 1);
                const ease = easeOutCubic(progress);

                window.scrollTo(0, start + distance * ease);

                if (progress < 1) {
                    requestAnimationFrame(animation);
                }
            }

            requestAnimationFrame(animation);

            // Update menu
            updateActiveMenuItem(targetIndex);

            // Reset snapping flag after animation
            clearTimeout(snapTimeout);
            snapTimeout = setTimeout(() => {
                isSnapping = false;
            }, 900);
        }
    }, { passive: false });
}, 100);
