// Enhanced smooth scrolling with momentum
let currentScrollPosition = window.pageYOffset;
let targetScrollPosition = currentScrollPosition;
let velocity = 0;

function smoothScroll() {
    const difference = targetScrollPosition - currentScrollPosition;
    const delta = difference * 0.08; // Lower = smoother but slower response

    velocity += delta;
    velocity *= 0.92; // Friction/damping - lower = more momentum

    currentScrollPosition += velocity;

    // Bounds checking
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    currentScrollPosition = Math.max(0, Math.min(currentScrollPosition, maxScroll));

    window.scrollTo(0, currentScrollPosition);

    // Continue animating if there's still movement
    if (Math.abs(velocity) > 0.1 || Math.abs(difference) > 0.1) {
        requestAnimationFrame(smoothScroll);
    }
}

// Override wheel event for momentum scrolling
window.addEventListener('wheel', (e) => {
    e.preventDefault();

    targetScrollPosition += e.deltaY * 2; // Multiplier for scroll distance

    // Bounds checking
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    targetScrollPosition = Math.max(0, Math.min(targetScrollPosition, maxScroll));

    requestAnimationFrame(smoothScroll);
}, { passive: false });
