// Update page title based on active page
function updatePageTitle(page) {
    const titles = {
        'works': '6llis - Works',
        'about': '6llis - About',
        'contact': '6llis - Contact'
    };
    document.title = titles[page] || '6llis - Works';
}

// Export for use in nav.js
window.updatePageTitle = updatePageTitle;

// Set initial title
updatePageTitle('works');
