# Portfolio Website - Development Documentation

## Project Overview
A portfolio website showcasing 5 projects (Retrocycles, Typrr, Cleverlink, Cathexis, Gardenescapes) with custom animations, page transitions, and a unique navigation system.

## Custom Fonts Required
The project uses two custom fonts that MUST be present in `/assets/fonts/`:
- **Sk-Modernist-Regular.otf** - Used for all body text, descriptions, bio, email
- **FogtwoNo5.otf** (or FogtwoNo5.ttf) - Used for navigation and project names

Without these fonts, the design will break completely. They cannot be substituted with system fonts.

## Critical Bugs & Solutions

### 1. About/Contact Page Visibility Issue (CRITICAL)
**Problem:** Bio text and copyright were completely invisible on About page despite correct HTML/CSS.

**Root Cause:** `.page` elements used `position: absolute` which broke flexbox centering. Content existed in DOM but rendered outside viewport.

**Solution:**
```css
.about-page.active,
.contact-page.active {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
}
```

### 2. Animation Retriggering Issue
**Problem:** Slide-up animations only played once. Navigating away and back showed no animations.

**Root Cause:** CSS animations run once when class is added. If class already exists, animation won't re-run.

**Solution:** Use separate trigger class (`.animate-in`) that gets removed and re-added:
```javascript
targetPageEl.classList.remove('animate-in');
void targetPageEl.offsetWidth; // Force reflow
targetPageEl.classList.add('animate-in');
```

The `void targetPageEl.offsetWidth` line is ESSENTIAL - it forces a browser reflow between removing and adding the class.

### 3. Scroll Position Not Resetting (Chrome/Edge Only)
**Problem:** Page would remember scroll position on refresh in Chrome/Edge, but worked fine in Firefox.

**Root Cause:** Chrome/Edge have `history.scrollRestoration = 'auto'` enabled by default.

**Solution:**
```javascript
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
```

Also needed multiple event listeners:
- `window.scrollTo(0, 0)` immediately
- On `DOMContentLoaded`
- On `load`
- On `pageshow` (for back/forward navigation)

### 4. Contact Page Text Invisible When Navigating from Works
**Problem:** Text visible when navigating About→Contact, but invisible when navigating Works→Contact.

**Root Cause:** Animation trigger only checked for About page:
```javascript
if (targetPage === 'about') {
    // trigger animation
}
```

**Solution:** Include both pages:
```javascript
if (targetPage === 'about' || targetPage === 'contact') {
    document.body.classList.add('no-scroll');
    targetPageEl.classList.remove('animate-in');
    void targetPageEl.offsetWidth;
    targetPageEl.classList.add('animate-in');
}
```

### 5. Bio Text Cutting Off During Transitions
**Problem:** When transitioning About→Works, bio text on left side would immediately disappear/get cut off white.

**Root Cause:** Works page appearing immediately even though animations were delayed.

**Solution:** Add z-index to keep About page on top during exit animation:
```css
.about-page.animate-out {
    z-index: 10000 !important;
}
```

### 6. Browser Autoplay Policy Blocking Audio
**Problem:** Sound effects wouldn't play until user interacted with page.

**Root Cause:** Modern browsers block all audio until user interaction (security feature).

**Solution:** This CANNOT be bypassed. Any workaround will be blocked. Audio plays after first user interaction (click, scroll, keypress).

## Things AI Cannot Determine Without User Input

### 1. Project Links
The actual URLs for each project must be provided:
- Retrocycles: https://retrocycles-leaderboard.vercel.app/
- Typrr: https://www.typrr.dev/
- Cleverlink: https://cleverlink.uk/
- Cathexis: https://cathexis.netlify.app/
- Gardenescapes: https://gardenescapes.netlify.app/

### 2. Contact Information
- Email addresses (changed from hello@6llis.com to ellis.wheeler@icloud.com)
- Copyright text preferences

### 3. Design Preferences
- Exact color values (background changed from #f5f5f5 → #fff)
- Font weights (needed 575 for project names, not 500 or 600)
- Animation timing preferences (delays, durations)
- Favicon character (changed from 'e' to '6' and back to 'e')

### 4. Content Structure
- Project descriptions and wording
- Bio text for About page
- Which images/videos go where
- Order of projects

### 5. Asset Locations
The exact folder structure for images:
```
assets/
  site images/
    retrocycles/
    typrr/
    cleverlink/
    cathexis/
    gardenescapes/
  fonts/
```

## Key Technical Implementation Details

### Page Transition System
The site uses three transition scenarios:

1. **Works → About/Contact:**
   - Gallery/menu slide out right
   - Target page appears with `animate-in` class
   - Bio/email text slide up sequentially

2. **About/Contact → Works:**
   - Text slides down with `animate-out` class
   - Works page hidden (`display: none`), then shown
   - Gallery/menu slide in from right with delays

3. **About ↔ Contact:**
   - Current page animates out
   - Target page animates in
   - No Works page involvement

### Scroll Snap Implementation
Custom scroll-snap on Works page that:
- Aligns each project section perfectly in viewport
- Updates project menu arrow position
- Smooth scrolling with momentum
- Works with keyboard arrow keys

### Staggered Line Animation (About Page Bio)
Bio text split into separate `<span class="bio-line">` elements:
- Line 1: 0.2s delay
- Line 2: 0.35s delay
- Line 3: 0.5s delay
- Copyright: 0.65s delay

Each uses same `slideUpFromLine` keyframe but with different delays.

### Loading Screen
- Shows for minimum 1 second
- Pulsing "e" animation
- Fades out after content loads
- Prevents FOUC (Flash of Unstyled Content)

## File Structure
```
portfolio/
├── index.html
├── style.css
├── loader.css
├── loader.js
├── nav.js (page transitions)
├── script.js (project menu/arrow)
├── scroll-snap.js (custom scroll behavior)
├── scroll-indicator.js (custom scrollbar)
├── sounds.js (audio effects)
├── update-title.js (dynamic page titles)
├── favicon.svg
├── assets/
│   ├── fonts/
│   │   ├── Sk-Modernist-Regular.otf
│   │   └── FogtwoNo5.otf
│   └── site images/
│       ├── retrocycles/
│       ├── typrr/
│       ├── cleverlink/
│       ├── cathexis/
│       └── gardenescapes/
└── README.md
```

## Mobile Responsiveness Considerations

### Breakpoints
- 1024px: Tablet adjustments
- 768px: Mobile layout changes
- 480px: Small mobile refinements

### Mobile-Specific Changes
- Navigation font size reduced (12rem → 3rem active)
- Project menu moved to bottom center, horizontal scrollable
- Gallery images stack vertically at 100% width
- Project descriptions positioned below images (not absolute)
- Touch-friendly hit areas
- `-webkit-overflow-scrolling: touch` for smooth scrolling

## Common Issues & Debugging

### Text Not Showing
1. Check if fonts are loaded (inspect Network tab)
2. Verify `position: fixed` on `.about-page.active`
3. Check z-index stacking
4. Ensure `animate-in` class is being added (inspect Elements)

### Animations Not Playing
1. Verify forced reflow: `void element.offsetWidth`
2. Check if class is being removed before re-adding
3. Look for `!important` conflicts in CSS
4. Test in different browsers (Chrome vs Firefox behavior differs)

### Scroll Issues
1. Verify `history.scrollRestoration = 'manual'`
2. Check `body.no-scroll` class on About/Contact pages
3. Ensure `overflow: hidden` is applying
4. Test `window.scrollTo(0, 0)` is firing

### Mobile Layout Broken
1. Check viewport meta tag: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
2. Verify media queries are after base styles
3. Test with Chrome DevTools device emulation
4. Check for fixed-width elements breaking layout

## Browser Compatibility
Tested and working on:
- Chrome/Edge (Chromium)
- Firefox
- Safari (iOS and macOS)

## Performance Notes
- Videos set to `autoplay loop muted playsinline` for mobile support
- Loading screen prevents layout shift
- CSS transforms used for animations (GPU accelerated)
- Smooth scrolling with `scroll-behavior: smooth` disabled (custom implementation)

## Future Maintenance Notes
- When adding new projects, update both HTML and `projectColors` array if shader is re-added
- Font weights must stay consistent (575 for FogtwoNo5, 500 for Sk-Modernist)
- Don't remove `void offsetWidth` reflow triggers
- Keep z-index hierarchy for page transitions
- Test all changes in multiple browsers
