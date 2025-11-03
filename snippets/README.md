# Octav Branded Components

This directory contains reusable, branded components for Octav documentation. All components follow the Octav Brand Guidelines and use the official color palette, typography, and design system.

## Available Components

### 1. Button (`Button.jsx.mdx`)
Branded button component with three variants.

**Import:**
```jsx
import { Button } from '/snippets/Button.jsx.mdx'
```

**Usage:**
```jsx
<Button href="/get-started">Get Started</Button>
<Button href="/docs" variant="secondary">View Docs</Button>
<Button href="/api" variant="outline">API Reference</Button>
```

**Variants:**
- `primary` (default) - Cool Red (#FF1A45)
- `secondary` - UI Blue (#3F58C7)
- `outline` - Cool Red border with transparent background

---

### 2. Card & CardGrid (`Card.jsx.mdx`)
Card component for displaying content blocks in a grid layout.

**Import:**
```jsx
import { Card, CardGrid } from '/snippets/Card.jsx.mdx'
```

**Usage:**
```jsx
<CardGrid cols={3}>
  <Card
    title="Quick Start"
    description="Get started in minutes"
    href="/quickstart"
  />
  <Card
    title="API Reference"
    description="Complete API documentation"
    href="/api"
    variant="primary"
  />
  <Card
    title="SDKs"
    description="JavaScript and Python SDKs"
    href="/sdks"
    variant="secondary"
  />
</CardGrid>
```

**Card Props:**
- `title` (required) - Card title
- `description` - Card description text
- `icon` - Optional emoji or icon
- `href` - Optional link URL
- `variant` - Style variant: `default`, `primary`, `secondary`, `dark`

**CardGrid Props:**
- `cols` - Number of columns: 1, 2, 3, or 4 (responsive)

---

### 3. Alert (`Alert.jsx.mdx`)
Alert/callout component for important messages.

**Import:**
```jsx
import { Alert } from '/snippets/Alert.jsx.mdx'
```

**Usage:**
```jsx
<Alert type="info" title="Information">
  This is an informational message about the API.
</Alert>

<Alert type="success" title="Success">
  Your request was processed successfully!
</Alert>

<Alert type="warning" title="Warning">
  Please review the rate limits before proceeding.
</Alert>

<Alert type="error" title="Error">
  Authentication failed. Check your API key.
</Alert>

<Alert type="tip" title="Pro Tip">
  Use pagination for better performance with large datasets.
</Alert>
```

**Props:**
- `type` - Alert type: `info`, `success`, `warning`, `error`, `tip`
- `title` - Optional alert title
- `children` - Alert content

**Color Mapping:**
- `info` - UI Blue (#3F58C7)
- `success` - Mint Green (#59CE7E)
- `warning` - Light Gold (#F4BD4D)
- `error` - Cool Red (#FF1A45)
- `tip` - Sky Blue (#6BCCD1)

---

### 4. ColorPalette (`ColorPalette.jsx.mdx`)
Display the complete Octav color palette.

**Import:**
```jsx
import { ColorPalette, ColorSwatch } from '/snippets/ColorPalette.jsx.mdx'
```

**Usage:**
```jsx
<ColorPalette />
```

**Individual Swatch:**
```jsx
<ColorSwatch name="Cool Red" hex="#FF1A45" />
```

---

## Brand Resources

### Brand Configuration (`octav-brand.json`)
Complete brand specification in JSON format including:
- All color values (hex, RGB, CMYK)
- Typography specifications
- Logo asset paths

Access programmatically:
```javascript
import brandConfig from '/snippets/octav-brand.json';
const primaryColor = brandConfig.brand.colors.primary.coolRed; // "#FF1A45"
```

---

### Brand Guide (`octav-brand-guide.mdx`)
Quick reference guide for Octav branding including:
- Color palette with usage guidelines
- Typography specifications
- Component usage examples
- Logo asset locations
- CSS utility classes

---

## Styling

### CSS Variables
All components use CSS variables defined in `/octav-styles.css`:

```css
var(--octav-primary)        /* #FF1A45 - Cool Red */
var(--octav-ui-blue)        /* #3F58C7 */
var(--octav-sky-blue)       /* #6BCCD1 */
var(--octav-mint-green)     /* #59CE7E */
var(--octav-light-gold)     /* #F4BD4D */
var(--octav-mango-orange)   /* #F68A54 */
var(--octav-blue-charcoal)  /* #091018 - Dark background */
var(--octav-deep-sea)       /* #06323E */
var(--octav-sea-green)      /* #095762 */
var(--octav-sea-foam)       /* #558789 */
```

### Utility Classes
Available CSS utility classes:

**Buttons:**
- `.octav-btn-primary`
- `.octav-btn-secondary`
- `.octav-btn-outline`

**Cards:**
- `.octav-card`

**Colors:**
- `.octav-accent-1` through `.octav-accent-6` (text colors)
- `.octav-bg-accent-1` through `.octav-bg-accent-6` (backgrounds)

---

## Best Practices

1. **Always use branded components** when available instead of creating custom ones
2. **Import from the snippets directory** using absolute paths starting with `/snippets/`
3. **Use CSS variables** for custom styling to maintain brand consistency
4. **Reference the brand guide** (`octav-brand-guide.mdx`) for usage guidelines
5. **Test in both light and dark modes** to ensure proper contrast

---

## Creating New Components

When creating new branded components:

1. Use the Octav color palette from `octav-brand.json`
2. Follow typography guidelines (Space Grotesk for headings, Geist for body)
3. Include variants for different use cases
4. Add proper TypeScript/PropTypes documentation
5. Test accessibility (WCAG AA minimum)
6. Update this README with usage examples

---

## Support

For questions or issues with branded components:
- Review [OCTAV_BRANDING.md](/OCTAV_BRANDING.md) for comprehensive documentation
- Check the brand guide: [octav-brand-guide.mdx](octav-brand-guide.mdx)
- Refer to original brand guidelines PDF

**Last Updated:** November 2025
