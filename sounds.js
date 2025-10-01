// Load sound effects
const clickSound = new Audio('assets/sounds/buttonhover.wav');
const hoverSound = new Audio('assets/sounds/click.wav');

// Set volume (adjust as needed)
clickSound.volume = 0.3;
hoverSound.volume = 0.2;

// Preload audio
clickSound.load();
hoverSound.load();

// Preload and enable audio on first user interaction
let audioEnabled = false;

async function enableAudio() {
    if (!audioEnabled) {
        try {
            // Play and immediately pause to unlock audio
            await clickSound.play();
            clickSound.pause();
            clickSound.currentTime = 0;

            await hoverSound.play();
            hoverSound.pause();
            hoverSound.currentTime = 0;

            audioEnabled = true;
        } catch (err) {
            // Audio unlock failed, will retry on next interaction
        }
    }
}

// Try to enable audio on the very first interaction
const unlockAudio = (e) => {
    enableAudio();
};

document.addEventListener('click', unlockAudio, { once: true });
document.addEventListener('keydown', unlockAudio, { once: true });
document.addEventListener('touchstart', unlockAudio, { once: true });
document.addEventListener('mousemove', unlockAudio, { once: true });
document.addEventListener('wheel', unlockAudio, { once: true, passive: true });
document.addEventListener('mouseenter', unlockAudio, { once: true });

// Play click sound on any click
document.addEventListener('click', () => {
    if (audioEnabled) {
        clickSound.currentTime = 0;
        clickSound.play().catch(() => {});
    }
});

// Play hover sound on clickable elements
const clickableElements = 'a, button, [role="button"], .project-item, .nav-item';

// Track which element is currently hovered to prevent repeated plays
let currentHoveredElement = null;

document.addEventListener('mouseover', (e) => {
    const clickableElement = e.target.closest(clickableElements);

    if (clickableElement && clickableElement !== currentHoveredElement && audioEnabled) {
        currentHoveredElement = clickableElement;
        hoverSound.currentTime = 0;
        hoverSound.play().catch(() => {});
    }
});

document.addEventListener('mouseout', (e) => {
    const clickableElement = e.target.closest(clickableElements);

    if (clickableElement === currentHoveredElement) {
        currentHoveredElement = null;
    }
});
