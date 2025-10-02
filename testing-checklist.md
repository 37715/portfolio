# Responsive Testing Matrix

## Viewport Size Matrix

| Width | Portrait | Landscape | 1x DPR | 2x DPR | 3x DPR | Reduced Motion | Narrow Height (<600px) |
|-------|----------|-----------|--------|--------|--------|----------------|------------------------|
| **XS (320px-479px)** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **S (480px-767px)** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **M (768px-1279px)** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **L (1280px-1919px)** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | N/A |
| **XL (1920px+)** | ✓ | N/A | ✓ | ✓ | ✓ | ✓ | N/A |
| **XXL (2560px+)** | ✓ | N/A | ✓ | ✓ | ✓ | ✓ | N/A |

## What to Verify Per Size

### XS (320px - 479px)
- [ ] Gallery images stack in single column
- [ ] All text is readable (min 16px for body)
- [ ] Touch targets ≥44px × 44px
- [ ] No horizontal scroll
- [ ] Project menu at bottom, doesn't overlap content
- [ ] Navigation scales down appropriately
- [ ] Safe-area padding visible on notched devices
- [ ] No text truncation or overlap
- [ ] Visit site buttons fully clickable
- [ ] Long project names wrap properly

### S (480px - 767px)
- [ ] Gallery remains single column or 2-col if space allows
- [ ] Project descriptions centered below images
- [ ] Menu horizontal scroll works smoothly
- [ ] No diagonal text movement when resizing
- [ ] Images maintain aspect ratio
- [ ] Touch scrolling works (-webkit-overflow-scrolling)
- [ ] Address bar hide/show doesn't break layout (dvh)

### M (768px - 1279px)
- [ ] Gallery auto-fits 2-3 columns
- [ ] Project description positioned correctly
- [ ] Menu at bottom, backdrop visible
- [ ] Navigation readable but not overwhelming
- [ ] Spacing feels balanced
- [ ] No overlap between images and text
- [ ] Transitions between S and M are smooth

### L (1280px - 1919px)
- [ ] Desktop layout active (horizontal project sections)
- [ ] Project menu on left side
- [ ] Gallery multi-column with proper gaps
- [ ] Text description on right, properly positioned
- [ ] Navigation expands correctly
- [ ] Arrow indicator visible
- [ ] No content touching viewport edges
- [ ] Max-width prevents excessive line length

### XL (1920px+)
- [ ] Layout identical to L, just wider
- [ ] Spacing scales proportionally
- [ ] Images don't pixelate (2x assets used)
- [ ] Text remains readable at distance

### XXL (2560px+)
- [ ] Content max-width caps at 1920px
- [ ] Content is centered
- [ ] No excessive white space
- [ ] Images still sharp

## Specific Feature Tests

### Typography
- [ ] All text uses clamp() scaling
- [ ] No text <16px on mobile (accessibility)
- [ ] Line lengths don't exceed 75ch
- [ ] Headings scale proportionally
- [ ] Text doesn't overflow containers

### Spacing
- [ ] Consistent rhythm across all sizes
- [ ] Safe-area insets applied on notched devices
- [ ] Padding never collapses to 0
- [ ] Gaps between elements feel proportional

### Images/Media
- [ ] Aspect ratios preserved
- [ ] No layout shift during image load
- [ ] Videos autoplay muted (mobile support)
- [ ] Images crisp on high-DPI screens
- [ ] No horizontal overflow from images

### Navigation
- [ ] Active nav item scales smoothly
- [ ] Touch targets always ≥44px
- [ ] Focus states visible (2px outline)
- [ ] Keyboard navigation works
- [ ] Works on click and touch

### Animations
- [ ] Page transitions work at all sizes
- [ ] Slide animations respect reduced-motion
- [ ] No janky scrolling
- [ ] Animations pause when prefers-reduced-motion

### Edge Cases
- [ ] User zoom to 200% doesn't break layout
- [ ] Long unbroken strings (emails/URLs) wrap
- [ ] RTL languages display correctly (if applicable)
- [ ] Works with browser zoom in/out
- [ ] Modal scroll lock works on mobile
- [ ] Sticky header with dynamic address bar (mobile)

## Browser/Device Matrix

| Browser | Desktop | Mobile | Tablet |
|---------|---------|--------|--------|
| Chrome | ✓ | ✓ | ✓ |
| Firefox | ✓ | ✓ | ✓ |
| Safari | ✓ | ✓ | ✓ |
| Edge | ✓ | ✓ | ✓ |
| Samsung Internet | N/A | ✓ | ✓ |

## Accessibility Tests

- [ ] Color contrast ≥4.5:1 for text
- [ ] Focus indicators visible
- [ ] Keyboard navigation complete
- [ ] Screen reader can access all content
- [ ] Touch targets ≥44px × 44px
- [ ] No motion for prefers-reduced-motion users
- [ ] Text can be zoomed 200% without loss of functionality

## Performance Checks

- [ ] No layout thrash during resize
- [ ] Smooth 60fps scrolling
- [ ] Images optimized (WebP with JPG fallback)
- [ ] No unnecessary repaints
- [ ] CSS file size <50KB (gzipped)

## Testing Tools

1. **Chrome DevTools**: Device mode, DPR emulation, network throttling
2. **Firefox Responsive Design Mode**: Container queries, grid inspector
3. **Safari Web Inspector**: iOS simulator testing
4. **Real Devices**: iPhone SE, iPhone 14 Pro, iPad, Android tablet
5. **BrowserStack**: Cross-browser/device testing
6. **axe DevTools**: Accessibility audit
7. **Lighthouse**: Performance/accessibility scores
