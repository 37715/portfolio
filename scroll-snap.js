// Custom scroll snapping for project sections
let isSnapping = false;
let snapTimeout;

// Wait for DOM to be ready
setTimeout(() => {
    const projectSections = document.querySelectorAll('.project-section');
    const projectItems = document.querySelectorAll('.project-item');

    // Function to update active menu item
    function updateActiveMenuItem(sectionIndex) {
        projectItems.forEach((item, i) => {
            if (i === sectionIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Update arrow position
        if (window.updateArrowPosition) {
            window.updateArrowPosition(sectionIndex);
        }
    }

    window.addEventListener('wheel', (e) => {
        e.preventDefault();

        if (isSnapping) return;

        // Get current scroll position
        const currentScroll = window.pageYOffset;

        // Find which section we should snap to
        let targetSection = null;
        let targetIndex = -1;

        if (e.deltaY > 0) {
            // Scrolling down - find next section
            for (let i = 0; i < projectSections.length; i++) {
                const section = projectSections[i];
                const sectionTop = section.offsetTop;
                if (sectionTop > currentScroll + 10) {
                    targetSection = section;
                    targetIndex = i;
                    break;
                }
            }
        } else {
            // Scrolling up - find previous section
            for (let i = projectSections.length - 1; i >= 0; i--) {
                const section = projectSections[i];
                const sectionTop = section.offsetTop;
                if (sectionTop < currentScroll - 10) {
                    targetSection = section;
                    targetIndex = i;
                    break;
                }
            }
        }

        if (targetSection && targetIndex !== -1) {
            isSnapping = true;

            // Custom smooth scroll with slower animation
            const start = window.pageYOffset;
            const target = targetSection.offsetTop;
            const distance = target - start;
            const duration = 1000; // milliseconds
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
            }, 1000);
        }
    }, { passive: false });
}, 100);
