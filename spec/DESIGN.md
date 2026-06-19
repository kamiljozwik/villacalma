---
name: Artesanato Moderno
colors:
  surface: '#fbf9f4'
  surface-dim: '#dbdad5'
  surface-bright: '#fbf9f4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3ee'
  surface-container: '#f0eee9'
  surface-container-high: '#eae8e3'
  surface-container-highest: '#e4e2dd'
  on-surface: '#1b1c19'
  on-surface-variant: '#42474d'
  inverse-surface: '#30312e'
  inverse-on-surface: '#f2f1ec'
  outline: '#73777e'
  outline-variant: '#c3c7cd'
  surface-tint: '#2d628b'
  primary: '#001e33'
  on-primary: '#ffffff'
  primary-container: '#003453'
  on-primary-container: '#6d9eca'
  inverse-primary: '#9accfa'
  secondary: '#974723'
  on-secondary: '#ffffff'
  secondary-container: '#ff996e'
  on-secondary-container: '#772f0c'
  tertiary: '#2a1900'
  on-tertiary: '#ffffff'
  tertiary-container: '#462d00'
  on-tertiary-container: '#c4903d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#cde5ff'
  primary-fixed-dim: '#9accfa'
  on-primary-fixed: '#001d32'
  on-primary-fixed-variant: '#0a4a72'
  secondary-fixed: '#ffdbce'
  secondary-fixed-dim: '#ffb598'
  on-secondary-fixed: '#370e00'
  on-secondary-fixed-variant: '#79300e'
  tertiary-fixed: '#ffddb0'
  tertiary-fixed-dim: '#f6bc64'
  on-tertiary-fixed: '#291800'
  on-tertiary-fixed-variant: '#614000'
  background: '#fbf9f4'
  on-background: '#1b1c19'
  surface-variant: '#e4e2dd'
typography:
  display-lg:
    fontFamily: Poppins
    fontSize: 64px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Poppins
    fontSize: 40px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-lg:
    fontFamily: Poppins
    fontSize: 40px
    fontWeight: '500'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Poppins
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Poppins
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.3'
  body-lg:
    fontFamily: DM Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: DM Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-lg:
    fontFamily: DM Sans
    fontSize: 14px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: 0.1em
  label-sm:
    fontFamily: DM Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 32px
  margin-desktop: 64px
  margin-mobile: 24px
  section-gap: 120px
---

## Brand & Style
The design system embodies the "Artesanato Moderno" aesthetic—a curated intersection of Mediterranean warmth and Nordic restraint. It targets a discerning traveler who seeks both the soul of Portuguese heritage and the clarity of modern minimalism. 

The visual language is rooted in **Minimalism** with a **Tactile** edge. It prioritizes expansive whitespace to evoke the "slow-living" atmosphere of the Algarve. While the layout remains strictly organized and functional, the use of organic textures, subtle gradients inspired by Lioz limestone, and high-contrast editorial photography ensures the digital experience feels as premium and grounded as a physical villa.

The emotional response should be one of immediate serenity, professional reliability, and quiet luxury.

## Colors
The palette is a dialogue between the earth and the ocean:
- **Primary (Shoreline Blue):** A refreshed, vibrant yet deep blue used for primary navigation, high-level headers, and core brand moments. It represents a more illuminated Lagos coastline, balanced between professional depth and coastal energy.
- **Secondary (Terracotta):** A sun-baked clay tone used for primary actions and accents. This color provides warmth and a connection to traditional Portuguese pottery and roof tiles.
- **Tertiary (Ochre):** A muted yellow-gold used for highlights, icons, and soft call-outs, echoing the golden cliffs of the Algarve.
- **Neutral (Limestone White):** The foundation of the UI. This is not a pure white, but a warm, stony neutral that reduces eye strain and feels more naturalistic.
- **Accent Surface:** A slightly darker beige used for subtle container differentiation and structural backgrounds.

## Typography
The typographic hierarchy creates a rhythm between contemporary geometric structure and functional clarity:
- **Sans-Serif Headline (Poppins):** Used for all major headlines and display text. Its clean, geometric construction brings a modern, architectural feel to the system, replacing the previous serif to favor a more contemporary "high-end boutique" look.
- **Sans-Serif Body (DM Sans):** Used for body copy, labels, and technical information. Its clarity balances the headlines, ensuring that details about amenities or booking remain highly legible and functional.
- **Uppercase Labels:** Use the label-lg style for section headers and small buttons to provide a clean, structural rhythm to the page.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy on desktop to maintain white-space "gutters" that frame the content like an art gallery. 
- **The 12-Column Grid:** Desktop content should typically span 8 or 10 columns for reading clarity, or the full 12 for immersive photography.
- **Airy Rhythm:** A vertical rhythm of 120px between major sections creates the "slow-living" breathing room required for a luxury brand.
- **Reflow:** On tablet, margins reduce to 40px with an 8-column grid. On mobile, margins drop to 24px with a 4-column grid. Elements should stack vertically with consistent 24px padding between cards to ensure touch targets are clear.

## Elevation & Depth
Depth in this design system is achieved through **Tonal Layers** rather than heavy shadows, maintaining a clean, Scandi-inspired profile.
- **Surface Tiers:** The base layer is the Neutral Limestone. Secondary information sits on Accent Surface containers with no border, creating a soft, recessed look.
- **Soft Diffusion:** For interactive elements like hover states on cards, use an extremely subtle, low-opacity Shoreline Blue shadow (opacity: 4-6%) with a large blur radius (32px) to simulate natural, ambient light.
- **Lioz Texture:** Backgrounds for large sections can occasionally use a subtle, non-tiling texture image of limestone to add organic depth without increasing visual noise.

## Shapes
The shape language is **Soft**. 
- A standard radius of 0.25rem is used for small components (inputs, tags) to keep them feeling precise and modern.
- Larger cards and imagery use a more pronounced 0.5rem (rounded-lg) to soften the visual impact and feel more inviting.
- **Iconography:** Use light-weight, linear icons with slightly rounded terminals to match the DM Sans weight. Avoid heavy fills; opt for open paths to maintain the "airy" theme.

## Components
- **Primary CTA Buttons:** These are the most prominent elements. Use a solid Shoreline Blue background with white text, or Terracotta for "Book Now" actions. Buttons should have a generous internal padding (16px top/bottom, 32px left/right) and uppercase labels for an architectural feel.
- **Amenity Cards:** Use a Limestone White background with a very thin, low-contrast border (#EAE4D9). Icons should be centered above a label-lg title.
- **Immersive Gallery:** Images should be the hero. Use a masonry-inspired grid or large-scale carousels that bleed to the edges of the container. Captions should use body-md in Shoreline Blue.
- **Chips/Tags:** Use the Accent Surface background with DM Sans labels. These should be used for categorizing amenities (e.g., "Fast Wi-Fi," "Poolside," "Chef Service").
- **Input Fields:** Maintain a minimalist aesthetic with a simple bottom-border (2px) in Shoreline Blue when focused, echoing high-end stationery.
- **Azulejo Patterns:** Use these as decorative dividers or background masks for small sections, rendered in a very faint (10% opacity) Shoreline Blue to reference local craft without overwhelming the minimalist layout.