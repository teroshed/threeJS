# 🎛️ Control Panel Architecture

## Visual Structure

```
┌─────────────────────────────────┐
│   🎛️ Effects            ✕       │  ← Panel Header
├─────────────────────────────────┤
│                                 │
│  🖱️ Drag Effects          ⚙️   │  ← Category Header
│  ┌─────────────────────────┐   │
│  │ ☐ 🐍 Click Snake        │   │  ← Effect Toggle
│  └─────────────────────────┘   │
│                                 │
├─────────────────────────────────┤  ← Section Divider
│                                 │
│  ✨ Idle Effects          ⚙️   │  ← Category Header
│  ┌─────────────────────────┐   │
│  │ ☐ ✨ Random Cubes       │   │  ← Effect Toggle
│  │ ☐ 🔄 Camera Orbit       │   │
│  │ ☐ 🎨 Simulated Drag     │   │
│  └─────────────────────────┘   │
│                                 │
├─────────────────────────────────┤
│   🗑️ Clear All                 │  ← Panel Footer
└─────────────────────────────────┘
```

## Component Hierarchy

```
control-panel
├── panel-header
│   ├── panel-title ("Effects")
│   └── close-btn (×)
│
├── panel-body
│   ├── effect-category (Drag Effects)
│   │   ├── category-header
│   │   │   ├── h3 ("🖱️ Drag Effects")
│   │   │   └── cog-btn (⚙️) [data-category="drag"]
│   │   └── effect-toggle
│   │       ├── checkbox (clickSnakeActive)
│   │       └── label
│   │           ├── effect-icon (🐍)
│   │           └── effect-name ("Click Snake")
│   │
│   └── effect-category (Idle Effects)
│       ├── category-header
│       │   ├── h3 ("✨ Idle Effects")
│       │   └── cog-btn (⚙️) [data-category="idle"]
│       └── effect-toggle (×3)
│           ├── checkbox (randomCubesActive, etc.)
│           └── label
│               ├── effect-icon
│               └── effect-name
│
└── panel-footer
    └── btn (Clear All)
```

## Interaction Flow

```mermaid
graph TD
    A[User clicks ⚙️ cog button] --> B{Which category?}
    B -->|data-category='drag'| C[Open Modal → Drag Effects]
    B -->|data-category='idle'| D[Open Modal → Idle Effects]
    
    E[User toggles checkbox] --> F[Update effect state]
    F --> G[EffectsManager.setEffectActive()]
    
    H[User clicks Clear All] --> I[EffectsManager.clearEffects()]
```

## Design Principles

### 🎯 **Separation of Concerns**
- **Drag Effects**: User-initiated interactions
- **Idle Effects**: Automatic ambient behaviors

### 🧩 **Component-Based**
- Reusable `effect-toggle` template
- Consistent styling across categories
- Easy to add new effects

### 🚀 **Progressive Disclosure**
- Simple toggles in main panel
- Detailed settings in modal (cog button)
- Outline panel for quick navigation

## CSS Architecture

```
panel-simple.css
├── .panel-body          # Container for categories
├── .effect-category     # Individual section (Drag/Idle)
├── .category-header     # Title + cog button
├── .effect-toggle       # Checkbox + label wrapper
│   ├── checkbox         # Styled with accent-color
│   └── label
│       ├── .effect-icon     # Emoji
│       └── .effect-name     # Text
└── .panel-footer        # Clear All button container
```

## Key Features

### ✨ **Visual Feedback**
- **Unchecked**: Gray text, normal weight
- **Checked**: Green text (`#00ff64`), bold weight
- **Hover**: Lighter text, smooth transition

### ⚙️ **Quick Settings Access**
- Each category has its own cog button
- Opens modal directly to relevant settings
- No need to navigate through grid menu

### 🎨 **Clean Separation**
- Clear visual divider between categories
- Consistent padding and spacing
- Footer anchored at bottom

## Future Enhancements

- [ ] Dynamic loading of effects from config
- [ ] Drag-and-drop reordering
- [ ] Collapsible sections
- [ ] Effect presets (save/load combinations)
- [ ] Keyboard shortcuts for toggles

