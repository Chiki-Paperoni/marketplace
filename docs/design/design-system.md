# Design System

## Color Palette (Tailwind)

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#3b82f6', // Main brand color
          600: '#2563eb',
          700: '#1d4ed8',
        },
        secondary: {
          500: '#8b5cf6',
          600: '#7c3aed',
        },
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
      },
    },
  },
}
```

## Typography

- **Headings:** Inter or Poppins
- **Body:** Inter or system fonts
- **Code:** Fira Code or JetBrains Mono

## Spacing System

- Use Tailwind's default spacing scale (4px increments)
- Consistent padding/margin across both apps
