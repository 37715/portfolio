// Get DOM elements
const projectItems = document.querySelectorAll('.project-item');
const projectSections = document.querySelectorAll('.project-section');
const arrowIndicator = document.querySelector('.arrow-indicator');

let isScrolling = false;
let scrollTimeout;

// Calculate arrow position based on active project
function updateArrowPosition(index) {
    const activeItem = projectItems[index];
    const projectList = document.querySelector('.project-list');
    const itemOffset = activeItem.offsetTop - projectList.offsetTop;
    const itemHeight = activeItem.offsetHeight;
    const arrowOffset = itemOffset + (itemHeight / 2) - 8;

    arrowIndicator.style.transform = `translateY(${arrowOffset}px)`;
}

// Expose function globally for scroll-snap.js
window.updateArrowPosition = updateArrowPosition;

// Function to reset to first project
window.resetToFirstProject = function() {
    window.scrollTo(0, 0);
    setActiveProject(0);
};

// Update active project in menu
function setActiveProject(index) {
    projectItems.forEach((item, i) => {
        if (i === index) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    updateArrowPosition(index);
}

// Scroll to project section
function scrollToProject(index) {
    isScrolling = true;
    const targetSection = projectSections[index];

    window.scrollTo({
        top: targetSection.offsetTop,
        behavior: 'smooth'
    });

    setActiveProject(index);

    // Reset isScrolling flag after animation
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        isScrolling = false;
    }, 1000);
}

// Handle project item clicks
projectItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        scrollToProject(index);
    });
});

// Handle scroll events to update arrow (disabled for scroll snap)
// window.addEventListener('scroll', () => {
//     if (isScrolling) return;

//     clearTimeout(scrollTimeout);
//     scrollTimeout = setTimeout(() => {
//         const scrollPosition = window.pageYOffset;
//         const windowHeight = window.innerHeight;

//         // Find which section is most visible
//         let activeIndex = 0;
//         let maxVisibility = 0;

//         projectSections.forEach((section, index) => {
//             const rect = section.getBoundingClientRect();
//             const sectionTop = rect.top + scrollPosition;
//             const sectionBottom = sectionTop + section.offsetHeight;
//             const viewportTop = scrollPosition;
//             const viewportBottom = scrollPosition + windowHeight;

//             // Calculate visible portion of section
//             const visibleTop = Math.max(sectionTop, viewportTop);
//             const visibleBottom = Math.min(sectionBottom, viewportBottom);
//             const visibleHeight = Math.max(0, visibleBottom - visibleTop);

//             if (visibleHeight > maxVisibility) {
//                 maxVisibility = visibleHeight;
//                 activeIndex = index;
//             }
//         });

//         setActiveProject(activeIndex);
//     }, 50);
// });

// Initialize arrow position
updateArrowPosition(0);

// Handle window resize
window.addEventListener('resize', () => {
    const activeIndex = Array.from(projectItems).findIndex(item =>
        item.classList.contains('active')
    );
    updateArrowPosition(activeIndex);
});

// Optional: Add keyboard navigation
document.addEventListener('keydown', (e) => {
    const activeIndex = Array.from(projectItems).findIndex(item =>
        item.classList.contains('active')
    );

    if (e.key === 'ArrowDown' && activeIndex < projectItems.length - 1) {
        e.preventDefault();
        scrollToProject(activeIndex + 1);
    } else if (e.key === 'ArrowUp' && activeIndex > 0) {
        e.preventDefault();
        scrollToProject(activeIndex - 1);
    }
});
