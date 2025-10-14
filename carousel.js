// Portfolio Carousel Component - Vanilla JavaScript
// Handles slideshow functionality for each website example

(function() {
    'use strict';

    class PortfolioCarousel {
        constructor(element) {
            this.carousel = element;
            this.track = element.querySelector('.carousel-track');
            this.slides = Array.from(element.querySelectorAll('.carousel-slide'));
            this.prevBtn = element.querySelector('.carousel-btn.prev');
            this.nextBtn = element.querySelector('.carousel-btn.next');
            this.dotsContainer = element.querySelector('.carousel-dots');

            this.currentIndex = 0;
            this.totalSlides = this.slides.length;

            if (this.totalSlides === 0) return;

            this.init();
        }

        init() {
            // Create dots
            this.createDots();

            // Set initial state
            this.updateSlides();

            // Bind events
            this.bindEvents();

            // Handle videos
            this.handleVideos();
        }

        createDots() {
            if (!this.dotsContainer) return;

            this.dotsContainer.innerHTML = '';

            for (let i = 0; i < this.totalSlides; i++) {
                const dot = document.createElement('button');
                dot.classList.add('carousel-dot');
                dot.setAttribute('aria-label', `Go to slide ${i + 1}`);

                if (i === 0) {
                    dot.classList.add('active');
                }

                dot.addEventListener('click', () => this.goToSlide(i));
                this.dotsContainer.appendChild(dot);
            }
        }

        bindEvents() {
            if (this.prevBtn) {
                this.prevBtn.addEventListener('click', () => this.prevSlide());
            }

            if (this.nextBtn) {
                this.nextBtn.addEventListener('click', () => this.nextSlide());
            }

            // Keyboard navigation
            this.carousel.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    this.prevSlide();
                } else if (e.key === 'ArrowRight') {
                    this.nextSlide();
                }
            });

            // Touch/swipe support
            this.addSwipeSupport();
        }

        addSwipeSupport() {
            let startX = 0;
            let endX = 0;

            this.carousel.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
            }, { passive: true });

            this.carousel.addEventListener('touchmove', (e) => {
                endX = e.touches[0].clientX;
            }, { passive: true });

            this.carousel.addEventListener('touchend', () => {
                const diff = startX - endX;
                const threshold = 50;

                if (Math.abs(diff) > threshold) {
                    if (diff > 0) {
                        this.nextSlide();
                    } else {
                        this.prevSlide();
                    }
                }
            });
        }

        updateSlides() {
            // Update slides
            this.slides.forEach((slide, index) => {
                slide.classList.toggle('active', index === this.currentIndex);
            });

            // Update track position
            const offset = -this.currentIndex * 100;
            this.track.style.transform = `translateX(${offset}%)`;

            // Update dots
            if (this.dotsContainer) {
                const dots = this.dotsContainer.querySelectorAll('.carousel-dot');
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === this.currentIndex);
                });
            }

            // Handle videos
            this.handleVideos();
        }

        handleVideos() {
            // Pause all videos first
            this.slides.forEach(slide => {
                const video = slide.querySelector('video');
                if (video) {
                    video.pause();
                }
            });

            // Play current video
            const currentSlide = this.slides[this.currentIndex];
            if (currentSlide) {
                const video = currentSlide.querySelector('video');
                if (video) {
                    video.play().catch(() => {
                        // Autoplay might be blocked, that's okay
                    });
                }
            }
        }

        nextSlide() {
            this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
            this.updateSlides();
        }

        prevSlide() {
            this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
            this.updateSlides();
        }

        goToSlide(index) {
            if (index >= 0 && index < this.totalSlides) {
                this.currentIndex = index;
                this.updateSlides();
            }
        }

        // Public method to reset carousel
        reset() {
            this.currentIndex = 0;
            this.updateSlides();
        }
    }

    // Initialize all carousels on page
    function initCarousels() {
        const carousels = document.querySelectorAll('.portfolio-carousel');
        const instances = [];

        carousels.forEach(carousel => {
            const instance = new PortfolioCarousel(carousel);
            instances.push(instance);
        });

        // Store instances globally for potential external control
        window.portfolioCarousels = instances;
    }

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCarousels);
    } else {
        initCarousels();
    }

    // Also initialize after page load to catch any dynamic content
    window.addEventListener('load', () => {
        // Small delay to ensure GSAP has finished initial setup
        setTimeout(initCarousels, 100);
    });

})();
