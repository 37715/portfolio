// GSAP Full-Screen Scroll FX for Works Page
// Pinned grid layout with smooth section transitions

(function() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.error('GSAP or ScrollTrigger not loaded');
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // DOM Elements
    const pinnedSection = document.querySelector('.fx-pinned-section');
    const imageSections = document.querySelectorAll('.fx-image-section');
    const leftItems = document.querySelectorAll('.fx-left-item');
    const rightItems = document.querySelectorAll('.fx-right-item');
    const leftTrack = document.querySelector('.fx-left-track');
    const rightTrack = document.querySelector('.fx-right-track');
    const progressFill = document.querySelector('.fx-progress-fill');
    const progressCurrent = document.querySelector('.fx-current');
    const arrowIndicator = document.querySelector('.fx-arrow-indicator');

    let currentIndex = 0;
    let isEnabled = false;
    const totalSections = imageSections.length;

    if (!pinnedSection || totalSections === 0) {
        console.warn('FX Scroll elements not found');
        return;
    }

    // Calculate row height for vertical centering
    function getRowHeight() {
        if (leftItems.length === 0) return 0;
        const first = leftItems[0];
        const second = leftItems[1];
        if (!second) return first.offsetHeight;
        return second.offsetTop - first.offsetTop;
    }

    // Center the active item in left/right tracks
    function centerTracks(index, animate = true) {
        // Disabled - show all items instead
        return;
    }

    // Update arrow position
    function updateArrowPosition(index) {
        if (!arrowIndicator || leftItems.length === 0) return;

        const activeItem = leftItems[index];
        const leftTrackEl = document.querySelector('.fx-left-track');
        if (!activeItem || !leftTrackEl) return;

        const itemOffset = activeItem.offsetTop - leftTrackEl.offsetTop;
        const itemHeight = activeItem.offsetHeight;
        const arrowOffset = itemOffset + (itemHeight / 2) - 8;

        gsap.to(arrowIndicator, {
            y: arrowOffset,
            duration: 0.6,
            ease: 'power3.out'
        });
    }

    // Update active section
    function updateSection(index) {
        if (index === currentIndex || index < 0 || index >= totalSections) return;

        currentIndex = index;

        // Update left items
        leftItems.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });

        // Update right items
        rightItems.forEach((item, i) => {
            const isActive = i === index;
            item.classList.toggle('active', isActive);

            gsap.to(item, {
                opacity: isActive ? 1 : 0.3,
                x: isActive ? -10 : 0,
                duration: 0.4,
                ease: 'power2.out'
            });
        });

        // Update image sections - once shown, keep them visible
        imageSections.forEach((section, i) => {
            if (i === index) {
                section.classList.add('active');
            }
            // Don't remove 'active' class - images stay visible once animated in
        });

        // Center the tracks and update arrow
        centerTracks(index, true);
        updateArrowPosition(index);

        // Update progress
        if (progressFill) {
            const progress = (index / (totalSections - 1)) * 100;
            gsap.to(progressFill, {
                width: `${progress}%`,
                duration: 0.7,
                ease: 'power3.out'
            });
        }

        if (progressCurrent) {
            progressCurrent.textContent = String(index + 1).padStart(2, '0');
        }
    }

    // Initialize scroll trigger
    function initScrollTrigger() {
        if (!isEnabled) return;

        // Disable on mobile - check viewport width
        if (window.innerWidth <= 1024) {
            return;
        }

        // Pin the container
        ScrollTrigger.create({
            trigger: pinnedSection,
            start: 'top top',
            end: 'bottom bottom',
            pin: '.fx-pinned-container',
            pinSpacing: false,
            onUpdate: (self) => {
                if (!isEnabled) return;

                // Calculate which section we're on
                const progress = self.progress;
                const targetIndex = Math.min(
                    totalSections - 1,
                    Math.floor(progress * totalSections)
                );

                if (targetIndex !== currentIndex) {
                    updateSection(targetIndex);
                }
            }
        });

        // Initial state
        updateSection(0);
    }

    // Click handlers for navigation
    leftItems.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            scrollToSection(index);
        });
    });

    rightItems.forEach((item, index) => {
        const link = item.querySelector('a');
        if (link) {
            // Right items have links - let them navigate normally
            return;
        }
        item.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            scrollToSection(index);
        });
    });

    // Scroll to specific section with snap
    function scrollToSection(index) {
        if (!isEnabled || !pinnedSection) return;

        const sectionHeight = pinnedSection.offsetHeight;
        const targetScroll = pinnedSection.offsetTop + (sectionHeight / totalSections) * index;

        // Use vanilla scroll instead of GSAP scrollTo
        window.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
        });
    }

    // Removed wheel scroll snap - causing scroll lock

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!isEnabled) return;

        if (e.key === 'ArrowDown' && currentIndex < totalSections - 1) {
            e.preventDefault();
            scrollToSection(currentIndex + 1);
        } else if (e.key === 'ArrowUp' && currentIndex > 0) {
            e.preventDefault();
            scrollToSection(currentIndex - 1);
        }
    });

    // Enable/Disable functions
    window.enableGSAPScroll = function() {
        isEnabled = true;
        initScrollTrigger();
        ScrollTrigger.refresh();
    };

    window.disableGSAPScroll = function() {
        isEnabled = false;
        ScrollTrigger.getAll().forEach(st => st.kill());
    };

    // Reset to first section
    window.resetToFirstProject = function() {
        currentIndex = 0;
        window.scrollTo(0, 0);

        // Reset all states
        leftItems.forEach((item, i) => item.classList.toggle('active', i === 0));
        rightItems.forEach((item, i) => item.classList.toggle('active', i === 0));
        imageSections.forEach((section, i) => section.classList.toggle('active', i === 0));

        centerTracks(0, false);
        updateArrowPosition(0);

        if (progressFill) {
            gsap.set(progressFill, { width: '0%' });
        }
        if (progressCurrent) {
            progressCurrent.textContent = '01';
        }

        if (isEnabled) {
            ScrollTrigger.refresh();
        }
    };

    // Responsive recalculation
    window.addEventListener('resize', () => {
        if (isEnabled) {
            centerTracks(currentIndex, false);
            ScrollTrigger.refresh();
        }
    });

    // Initialize immediately
    function initialize() {
        // Set initial states
        leftItems.forEach((item, i) => item.classList.toggle('active', i === 0));
        rightItems.forEach((item, i) => {
            item.classList.toggle('active', i === 0);
            gsap.set(item, { opacity: i === 0 ? 1 : 0.3, x: i === 0 ? -10 : 0 });
        });
        imageSections.forEach((section, i) => section.classList.toggle('active', i === 0));

        centerTracks(0, false);
        updateArrowPosition(0);

        isEnabled = true;
        initScrollTrigger();
    }

    // Initialize on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }

    // Refresh after full page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (isEnabled) {
                ScrollTrigger.refresh();
                updateArrowPosition(0);
            }
        }, 100);
    });

})();
