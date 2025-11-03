# Octav Branding Implementation Guide

This document provides a comprehensive guide to the Octav branding implementation in this documentation workspace. All future additions to the docs will automatically use the correct Octav branding.

## Overview

The workspace has been fully configured with Octav's brand identity including:
- Brand colors from the official brand guidelines
- Typography (Space Grotesk for headings, Geist for body text)
- Logo assets (light and dark themes)
- Custom components with Octav styling
- Reusable design system components

## File Structure

### Configuration Files
- **[docs.json](docs.json)** - Main Mintlify configuration with Octav colors, fonts, and theme settings
- **[octav-styles.css](octav-styles.css)** - Custom CSS with Octav brand variables and utility classes

### Brand Assets
- **[logo/light.svg](logo/light.svg)** - Octav logo for light theme (Bevel version)
- **[logo/dark.svg](logo/dark.svg)** - Octav logo for dark theme (Bevel version)
- **[favicon.svg](favicon.svg)** - Octav icon for browser tab
- **[images/octav-icon.svg](images/octav-icon.svg)** - Octav icon for use in docs
- **[images/octav-api.svg](images/octav-api.svg)** - Octav API product logo
- **[images/octav-pro.svg](images/octav-pro.svg)** - Octav Pro product logo

### Reusable Components & Snippets
- **[snippets/Button.jsx.mdx](snippets/Button.jsx.mdx)** - Branded button component with variants
- **[snippets/ColorPalette.jsx.mdx](snippets/ColorPalette.jsx.mdx)** - Color palette display component
- **[snippets/octav-brand.json](snippets/octav-brand.json)** - Complete brand specification in JSON format
- **[snippets/octav-brand-guide.mdx](snippets/octav-brand-guide.mdx)** - Quick reference guide for brand usage

## Brand Colors

### Primary
- **Cool Red**: `#FF1A45` - Use for primary CTAs, links, and key brand elements

### Secondary
- **UI Blue**: `#3F58C7` - Secondary buttons and UI elements
- **Sky Blue**: `#6BCCD1` - Data visualization and accents
- **Mint Green**: `#59CE7E` - Success states and positive metrics
- **Light Gold**: `#F4BD4D` - Warnings and highlights
- **Mango Orange**: `#F68A54` - Alerts and important callouts

### Dark Theme
- **Blue Charcoal**: `#091018` - Primary dark background
- **Deep Sea**: `#06323E` - Secondary dark background
- **Sea Green**: `#095762` - Dark UI elements
- **Sea Foam**: `#558789` - Dark accent color

### Neutral
- **True White**: `#FFFFFF`
- **Tan**: `#F9F6F3` - Light background alternative
- **Buff**: `#EFEBE4` - Subtle backgrounds

## Typography

### Headings
- **H1**: Space Grotesk Medium, 100% line height, -2% letter spacing
- **H2**: Geist Medium, 100% line height, 0% letter spacing
- **H3**: Geist Mono Regular Caps, 100% line height, 5% letter spacing

### Body Text
- **Font**: Geist Regular
- **Line Height**: 120%
- **Letter Spacing**: 2%

### Code
- **Font**: Geist Mono

## Using Branded Components

### Button Component

The Button component supports three variants: primary, secondary, and outline.

```jsx
import { Button } from '/snippets/Button.jsx.mdx'

// Primary button (default)
<Button href="/get-started">Get Started</Button>

// Secondary button
<Button href="/docs" variant="secondary">View Docs</Button>

// Outline button
<Button href="/api" variant="outline">API Reference</Button>
```

### Color Palette Component

Display the Octav color palette in documentation:

```jsx
import { ColorPalette } from '/snippets/ColorPalette.jsx.mdx'

<ColorPalette />
```

## Custom CSS Classes

The `octav-styles.css` file is automatically loaded and provides these utility classes:

### Buttons
- `.octav-btn-primary` - Primary button style with Cool Red
- `.octav-btn-secondary` - Secondary button style with UI Blue
- `.octav-btn-outline` - Outline button style

### Cards
- `.octav-card` - Card component with shadow and hover effects

### Colors
- `.octav-accent-1` through `.octav-accent-6` - Text color utilities
- `.octav-bg-accent-1` through `.octav-bg-accent-6` - Background color utilities

### Example Usage
```html
<div className="octav-card">
  <h3 className="octav-accent-1">Featured Content</h3>
  <p>This card uses Octav branding.</p>
  <button className="octav-btn-primary">Learn More</button>
</div>
```

## CSS Variables

All brand colors are available as CSS variables:

```css
var(--octav-primary)        /* #FF1A45 */
var(--octav-ui-blue)        /* #3F58C7 */
var(--octav-sky-blue)       /* #6BCCD1 */
var(--octav-mint-green)     /* #59CE7E */
var(--octav-light-gold)     /* #F4BD4D */
var(--octav-mango-orange)   /* #F68A54 */
var(--octav-blue-charcoal)  /* #091018 */
var(--octav-deep-sea)       /* #06323E */
var(--octav-sea-green)      /* #095762 */
var(--octav-sea-foam)       /* #558789 */
```

## Automatic Branding

The following elements automatically use Octav branding without any additional configuration:

1. **All headings** (H1-H6) use Space Grotesk or Geist fonts
2. **Body text** uses Geist font family
3. **Links** use Cool Red (#FF1A45)
4. **Code blocks** use Geist Mono
5. **Dark mode** automatically switches to Blue Charcoal background

## Adding New Pages

When creating new documentation pages, they will automatically inherit Octav branding. To use branded components:

1. Import components from the snippets directory
2. Use CSS variables for custom styling
3. Reference the color palette in `snippets/octav-brand.json`

Example new page:

```mdx
---
title: "My New Page"
description: "Description of the page"
---

import { Button } from '/snippets/Button.jsx.mdx'

# Welcome to My New Page

This page automatically uses Octav branding!

<Button href="/next-step">Continue</Button>
```

## Brand Guidelines Reference

For the complete brand guidelines including logo usage, spacing, and additional specifications, refer to:
- Original PDF: `/Users/karma/Downloads/Octav_Logo_Pack/Octav_Brand Guidelines.pdf`
- Quick reference: [snippets/octav-brand-guide.mdx](snippets/octav-brand-guide.mdx)
- JSON specification: [snippets/octav-brand.json](snippets/octav-brand.json)

## Customization

To customize or extend the branding:

1. **Add new colors**: Update [octav-styles.css](octav-styles.css) CSS variables
2. **Create components**: Add new `.jsx.mdx` files to the `snippets/` directory
3. **Modify theme**: Edit [docs.json](docs.json) configuration
4. **Add utilities**: Extend [octav-styles.css](octav-styles.css) with new classes

## Support

For questions about brand implementation or to report inconsistencies, contact the Octav brand team or refer to the official brand guidelines PDF.

---

**Last Updated**: November 2025
**Brand Guidelines Version**: Based on Octav_Brand Guidelines.pdf (October 2024)
