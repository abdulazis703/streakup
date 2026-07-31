---
name: Warm & Playful Habit Tracker
colors:
  surface: '#fff7ff'
  surface-dim: '#e1d7e5'
  surface-bright: '#fff7ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fbf0ff'
  surface-container: '#f5eaf9'
  surface-container-high: '#efe5f3'
  surface-container-highest: '#e9dfed'
  on-surface: '#1e1a23'
  on-surface-variant: '#56423d'
  inverse-surface: '#342e39'
  inverse-on-surface: '#f8edfc'
  outline: '#89726b'
  outline-variant: '#dcc0b9'
  surface-tint: '#9e4225'
  primary: '#9e4225'
  on-primary: '#ffffff'
  primary-container: '#ff8c69'
  on-primary-container: '#752409'
  inverse-primary: '#ffb59f'
  secondary: '#6153a2'
  on-secondary: '#ffffff'
  secondary-container: '#b7a8fe'
  on-secondary-container: '#473986'
  tertiary: '#006d43'
  on-tertiary: '#ffffff'
  tertiary-container: '#63bd8b'
  on-tertiary-container: '#004a2c'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbd1'
  primary-fixed-dim: '#ffb59f'
  on-primary-fixed: '#3a0a00'
  on-primary-fixed-variant: '#7e2b10'
  secondary-fixed: '#e6deff'
  secondary-fixed-dim: '#cabeff'
  on-secondary-fixed: '#1c055b'
  on-secondary-fixed-variant: '#493a88'
  tertiary-fixed: '#9af6c0'
  tertiary-fixed-dim: '#7ed9a5'
  on-tertiary-fixed: '#002111'
  on-tertiary-fixed-variant: '#005232'
  background: '#fff7ff'
  on-background: '#1e1a23'
  surface-variant: '#e9dfed'
typography:
  display:
    fontFamily: Nunito Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Nunito Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Nunito Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Nunito Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  body-lg:
    fontFamily: Nunito Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Nunito Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  stat-label:
    fontFamily: Space Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Nunito Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 40px
  xl: 64px
  container-padding: 24px
  gutter: 16px
---

## Brand & Style
The design system is centered on the concept of "Gentle Productivity." It aims to reduce the anxiety often associated with habit tracking by using a soft, approachable aesthetic that celebrates small wins. The target audience includes wellness-conscious individuals who value aesthetics and emotional resonance in their digital tools.

The visual style is a hybrid of **Soft Minimalism** and **Tactile Glassmorphism**. It utilizes generous whitespace to prevent cognitive overload, paired with "squishy" high-radius components that feel friendly to the touch. Subtle depth is created through soft, tinted ambient shadows rather than harsh outlines, evoking a sense of calm and physical presence.

## Colors
The palette is built on a foundation of warm neutrals and soft pastels to create a nurturing environment. 

- **Primary (Peach/Coral):** Used for main actions, active streaks, and primary progress indicators.
- **Secondary (Soft Lavender):** Used for secondary categories, calming evening habits, and hero gradients.
- **Success (Mint):** Reserved for completed tasks and milestone celebrations.
- **Background:** The canvas uses a warm Cream (#FFF9F2) instead of pure white to reduce eye strain and feel more organic.
- **Gradients:** Use a linear 135-degree gradient from Primary to Secondary for high-impact areas like hero cards and achievement unlocks.

## Typography
The typography strategy balances playfulness with technical clarity. **Nunito Sans** provides a friendly, rounded feel for all narrative and structural text. Its soft terminals mirror the rounded corners of the UI. For data-heavy elements—such as streak counts, percentages, and time logs—**Space Mono** is used at a lighter weight to provide a clean, "journaled" aesthetic that differentiates hard data from human content.

## Layout & Spacing
The system utilizes a **Fluid Grid** with a soft 8px baseline. Content should feel "airy." 

- **Desktop:** 12-column grid, max-width 1200px.
- **Mobile:** Single column with 24px side margins.
- **Vertical Rhythm:** Use larger gaps (40px+) between distinct habit categories to give the eye a place to rest. 
- **Grouping:** Related items (like a habit name and its checkbox) should use "sm" (12px) spacing, while cards within a list use "md" (24px).

## Elevation & Depth
This design system avoids harsh dropshadows. Instead, it uses **Ambient Tints**:
- **Level 1 (Cards):** A soft shadow with a 20px blur, 4px vertical offset, and 5% opacity using the Primary or Secondary color depending on the context.
- **Level 2 (Modals/Popovers):** A more pronounced 40px blur with 10% opacity.
- **Glassmorphism:** Featured hero cards use a `backdrop-filter: blur(12px)` with a semi-transparent white stroke (20% opacity) to simulate frosted glass over the cream background.

## Shapes
The shape language is extremely soft. Standard buttons and cards use a **16px** corner radius (`rounded-xl` equivalent in this system). Interactive elements should feel like physical objects with rounded edges. Progress bars and checkboxes use full pill-shaping (circular ends) to emphasize the fluid, non-rigid nature of the brand.

## Components
- **Buttons:** Large (min-height 56px), rounded-xl, with a subtle 3D lift. On hover, apply `scale(1.05)` and deepen the ambient shadow.
- **Habit Checkboxes:** Custom large circular rings. When checked, they should fill with a Peach-to-Lavender gradient and trigger a brief "pop" animation (scale up and back).
- **Cards:** White or Glass surfaces with 16px radius. Content within cards should have 24px of internal padding.
- **Progress Rings:** SVG-based radial strokes using the Mint color for the "progress" and a very faint version of the same color for the "track."
- **Heatmap:** A grid of 12px squares with 4px radius. Use a color scale from Background Cream (0%) to Peach (100%).
- **Badges:** Small circular or organic leaf-shaped icons that house achievement illustrations in a soft cartoon style.