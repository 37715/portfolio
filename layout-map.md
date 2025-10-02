# Layout Component Map

| Component | Container Query Threshold | Grid/Flex Pattern | Min/Max Widths | Behavior Notes |
|-----------|---------------------------|-------------------|----------------|----------------|
| **Header Navigation** | N/A (fixed) | Flexbox row | Min: 44px touch target | Safe-area padding on mobile, fluid font scaling |
| **Nav Item (inactive)** | N/A | Inline-flex | Min: 44px × 44px | Font: clamp(1.125rem → 1.5rem) |
| **Nav Item (active)** | N/A | Inline-flex | Min: 44px × 44px | Font: clamp(3rem → 12rem), scales with viewport |
| **Page Container** | N/A | Block | Max: 1920px @ >2560px | Centered on ultra-wide, margin-top: fluid |
| **Projects Scroll Container** | `@container gallery` | Block | Max: 100% | Container query context for children |
| **Project Section** | `≥1400px`: row<br>`<1400px`: column | Flexbox | Max: 100% | Horizontal @ desktop, vertical @ mobile, gap: fluid |
| **Image Gallery** | `≥640px`: auto-fit grid<br>`<640px`: 1 column | CSS Grid | Min col: 280px, Max: 100% | `repeat(auto-fit, minmax(280px, 1fr))`, gap: clamp(1.5rem → 3rem) |
| **Gallery Item** | Inherits from grid | Grid child | Width: 100%, Height: auto | Aspect-ratio preserved, object-fit: contain |
| **Gallery Item (1st)** | Desktop only | Grid child | + margin-inline-end: 18vw | Creates space for project menu @ desktop |
| **Gallery Item (mobile)** | `<1400px` | Grid child | Max: 450px | Centered, stacked vertically |
| **Project Description** | `≥1400px`: absolute right<br>`<1400px`: relative below | Absolute/Relative | Max: min(500px, 90vw) | Position changes based on container, text-wrap: balance |
| **Project Menu** | `≥1400px`: fixed mid-left<br>`<1400px`: fixed bottom | Fixed position | Auto width | Safe-area-bottom padding on mobile, backdrop on mobile |
| **Menu Wrapper** | `≥1400px`: column<br>`<1400px`: row | Flexbox | Auto | Direction changes per viewport |
| **Project List** | `≥1400px`: column<br>`<1400px`: row scroll | Flexbox | Auto | Horizontal scroll on mobile with touch scrolling |
| **Project Item** | N/A | Flex item | Min: 44px × 44px touch | Padding: fluid, font: clamp(0.75rem → 1rem) |
| **Arrow Indicator** | Desktop only | Absolute | Auto | Hidden on mobile |
| **About Page Content** | N/A | Flexbox centered | Max: 90vw @ mobile | Padding: safe-area aware, font: fluid |
| **About Name** | N/A | Block | Auto | Font: clamp(1rem → 1.2rem) |
| **Bio Text** | N/A | Block | Max: 600px | Line-height: 1.6, text-wrap: pretty |
| **Contact Email** | N/A | Block | Max: 90vw | Font: clamp(0.9rem → 1rem) |
| **Visit Site Button** | N/A | Inline-block | Min: 44px × 44px | Touch-friendly, fluid font |
| **Scroll Indicator** | N/A | Fixed | Width: 8px @ desktop, 4px @ mobile | Right: 0, height: dynamic |

## Container Query Breakpoints

- **Gallery Container**: `1400px` (switches project-section from row to column)
- **Small viewport**: `640px` (gallery becomes single-column)
- **Short viewport**: `600px height` (compresses vertical spacing)

## Grid Track Patterns

- **Image Gallery**: `repeat(auto-fit, minmax(280px, 1fr))`
  - Auto-fits columns based on available space
  - Min 280px per column, expands to fill
  - Falls back to 1 column at <640px

## Behavior by Viewport

### Desktop (≥1400px)
- Horizontal project layout (images left, text right)
- Project menu fixed mid-left
- Gallery: multi-column auto-fit grid
- Full navigation expansion

### Tablet (768px - 1399px)
- Vertical project layout (images top, text bottom)
- Project menu fixed bottom with horizontal scroll
- Gallery: 2-column grid
- Compressed navigation

### Mobile (320px - 767px)
- Vertical project layout
- Project menu bottom with backdrop
- Gallery: 1-column stack
- Touch-optimized navigation (min 44px targets)

### Short Viewport (height <600px)
- Compressed vertical spacing
- Reduced margin-top on page container
- Optimized for landscape mobile

### Ultra-wide (≥2560px)
- Max-width capped at 1920px
- Content centered
- Prevents excessive line lengths
