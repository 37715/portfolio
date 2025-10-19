// Slideshow Navigation Functionality

document.addEventListener('DOMContentLoaded', () => {
    // Get all project sections
    const sections = document.querySelectorAll('.fx-image-section');

    sections.forEach((section) => {
        const container = section.querySelector('.fx-slideshow-container');
        if (!container) return;

        const items = container.querySelectorAll('.fx-image-item');
        const leftArrow = container.querySelector('.fx-arrow-left');
        const rightArrow = container.querySelector('.fx-arrow-right');

        let currentIndex = 0;

        // Function to show specific slide
        const showSlide = (index) => {
            // Remove active class from all items
            items.forEach((item) => {
                item.classList.remove('active');
            });

            // Add active class to current item
            items[index].classList.add('active');
            currentIndex = index;
        };

        // Navigate to previous slide
        const previousSlide = () => {
            const newIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
            showSlide(newIndex);
        };

        // Navigate to next slide
        const nextSlide = () => {
            const newIndex = currentIndex === items.length - 1 ? 0 : currentIndex + 1;
            showSlide(newIndex);
        };

        // Add event listeners
        if (leftArrow) {
            leftArrow.addEventListener('click', previousSlide);
        }

        if (rightArrow) {
            rightArrow.addEventListener('click', nextSlide);
        }

        // Keyboard navigation (arrow keys) when section is active
        document.addEventListener('keydown', (e) => {
            // Only navigate if this section is active
            if (!section.classList.contains('active')) return;

            if (e.key === 'ArrowLeft') {
                previousSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            }
        });

        // Initialize - make sure first slide is active
        showSlide(0);
    });
});
