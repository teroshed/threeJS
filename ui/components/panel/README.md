# 🎛️ Panel Components

This folder contains reusable HTML templates for the main control panel.

## 📁 Structure

```
panel/
├── effect-toggle.html    # Template for individual effect toggles
└── README.md            # This file
```

## 🔧 Components

### Effect Toggle (`effect-toggle.html`)

A reusable template for effect checkboxes with icons and labels.

**Template Variables:**
- `{{effectId}}` - Unique ID for the checkbox (e.g., "clickSnakeActive")
- `{{icon}}` - Emoji icon for the effect (e.g., "🐍")
- `{{name}}` - Display name of the effect (e.g., "Click Snake")
- `{{checked}}` - Optional "checked" attribute for default state

**Usage Example:**
```html
<div class="effect-toggle">
  <input type="checkbox" class="effect-checkbox" id="clickSnakeActive" checked>
  <label for="clickSnakeActive">
    <span class="effect-icon">🐍</span>
    <span class="effect-name">Click Snake</span>
  </label>
</div>
```

## 🎨 Styling

The panel is split into two vertical sections:
1. **Drag Effects** - Effects triggered by mouse interaction
2. **Idle Effects** - Background ambient effects

Each section has:
- A header with category name and cog button
- List of effect toggles
- Footer with "Clear All" button (shared)

## 🔗 Related Files

- `index.html` - Main panel structure
- `public/styles/panel-simple.css` - Panel styling
- `ui/components/settings/settings-manager.js` - Modal navigation

