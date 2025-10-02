# ⚙️ Configuration Architecture

## Overview

The project uses **two separate configuration files** to avoid circular dependencies while maintaining centralized control:

```
effects/
├── GlobalConfig.js        # 🌍 Base-level visual settings (no dependencies)
├── EffectsDefaults.js     # 🎯 Effect-specific parameters (imports effects)
└── Effect.js              # 📦 Base class (imports GlobalConfig only)
```

---

## 1. 🌍 **GlobalConfig.js** - Universal Settings

**Purpose:** Settings that apply to ALL effects globally

**Location:** `effects/GlobalConfig.js`

**Can be imported by:** 
- ✅ Base classes (`Effect.js`, `IdleEffect.js`, etc.)
- ✅ Individual effects
- ✅ UI components
- ✅ Main application

**Cannot import:**
- ❌ Effect classes (would create circular dependency)
- ❌ EffectsDefaults.js (would create circular dependency)

### Current Settings:

```javascript
const GLOBAL_CONFIG = {
    // Timing settings
    clickDelay: 30,      // ms delay between click events
    frameRate: 60,       // Target FPS
    
    // Visual settings
    outlineWidth: 2,     // Line width for cube outlines
    outlineOpacity: 0.6, // Opacity for cube outlines (0-1)
    outlineColor: 0x000000, // Color for cube outlines (hex)
};
```

### When to use GlobalConfig:

✅ **Settings that affect visual appearance of ALL cubes**
- Outline width/opacity/color
- Default material properties
- Anti-aliasing settings
- Render quality settings

✅ **Global timing/performance settings**
- Frame rate limits
- Click delays
- Animation speed multipliers

---

## 2. 🎯 **EffectsDefaults.js** - Effect-Specific Parameters

**Purpose:** Configuration for individual effect behaviors

**Location:** `effects/EffectsDefaults.js`

**Can import:**
- ✅ Effect classes (to reference them in configs)
- ✅ UI constants (for enums)
- ❌ **NOT** GlobalConfig (use Effect.js properties instead)

**Structure:**

```javascript
const EFFECTS_DEFAULTS = {
    CLICK_SNAKE: {
        name: "ClickSnake",
        class: ClickSnake,
        maxLength: 200,
        cubeSize: 1,
        fadeSpeed: 0.05,
        // ... effect-specific params
    },
    
    RANDOM_CUBES: { /* ... */ },
    CAMERA_ORBIT: { /* ... */ },
    
    GLOBAL: {
        clickDelay: 30,  // Timing
        frameRate: 60    // Performance
    }
};
```

### When to use EffectsDefaults:

✅ **Effect-specific behavior**
- Max cubes, trail length
- Spawn rates, fade speeds
- Effect-specific sizes/colors

✅ **Effect registration**
- Linking effect names to classes
- Default parameters for initialization

---

## 3. 📦 **Effect.js** - The Bridge

**How it works:**

```javascript
// Effect.js
import GLOBAL_CONFIG from './GlobalConfig.js';  // ✅ Safe!

export class Effect {
    constructor() {
        // Load global settings into instance properties
        this.outlineWidth = GLOBAL_CONFIG.outlineWidth;
        this.outlineOpacity = GLOBAL_CONFIG.outlineOpacity;
        this.outlineColor = GLOBAL_CONFIG.outlineColor;
    }
    
    createCube(size, position, color) {
        // Use instance properties (inherited by all effects)
        const lineMaterial = new THREE.LineBasicMaterial({ 
            color: this.outlineColor,
            opacity: this.outlineOpacity,
            linewidth: this.outlineWidth
        });
    }
}
```

**Why this works:**
1. `Effect.js` imports `GlobalConfig.js` ✅
2. `EffectsDefaults.js` imports effect classes (which extend `Effect`) ✅
3. **No circular dependency** because `GlobalConfig.js` doesn't import anything! ✅

---

## Import Dependency Graph

```
┌─────────────────┐
│  GlobalConfig   │  ← No imports (pure data)
└────────┬────────┘
         │ imports
         ↓
┌─────────────────┐
│    Effect.js    │  ← Base class
└────────┬────────┘
         │ extends
         ↓
┌─────────────────┐
│  ClickSnake.js  │  ← Individual effects
│  RandomCubes.js │
│  etc.           │
└────────┬────────┘
         │ imports
         ↓
┌─────────────────┐
│ EffectsDefaults │  ← Configuration
└─────────────────┘
```

**Key Rule:** Lower levels cannot import higher levels!

---

## How to Add New Global Settings

### Example: Adding "Default Cube Color"

1. **Add to GlobalConfig.js:**
```javascript
const GLOBAL_CONFIG = {
    // ... existing settings
    defaultCubeColor: 0xff00ff,  // Magenta
};
```

2. **Use in Effect.js constructor:**
```javascript
constructor() {
    // ... existing properties
    this.fixedColor = GLOBAL_CONFIG.defaultCubeColor;
}
```

3. **That's it!** All effects now use this global default.

---

## How to Add New Effect Parameters

### Example: Adding "Glow Intensity" to ClickSnake

1. **Add to EffectsDefaults.js:**
```javascript
CLICK_SNAKE: {
    // ... existing params
    glowIntensity: 0.5,
}
```

2. **Use in ClickSnake constructor:**
```javascript
constructor(maxLength, autoFade, ..., glowIntensity) {
    super();
    this.glowIntensity = glowIntensity;
}
```

3. **Apply in effect logic:**
```javascript
// Use this.glowIntensity in your effect code
```

---

## UI Integration

### Reading Global Settings:

```javascript
// ui/ui-init.js
import GLOBAL_CONFIG from '../effects/GlobalConfig.js';

function initializeOutlineSlider() {
    const slider = document.getElementById('outlineWidth');
    slider.value = GLOBAL_CONFIG.outlineWidth;
}
```

### Updating Global Settings at Runtime:

```javascript
// Option 1: Direct mutation (simple but not reactive)
GLOBAL_CONFIG.outlineWidth = 5;

// Option 2: Effect property override (per-effect)
effectInstance.outlineWidth = 5;
```

---

## Best Practices

### ✅ **DO:**
- Put visual/rendering settings in `GlobalConfig.js`
- Put effect-specific behavior in `EffectsDefaults.js`
- Use instance properties for runtime overrides
- Document what each setting does

### ❌ **DON'T:**
- Import `EffectsDefaults` in `Effect.js` (circular!)
- Import effect classes in `GlobalConfig.js` (circular!)
- Hardcode magic numbers in effect code
- Mix global and effect-specific settings

---

## Troubleshooting

### "Cannot access 'Effect' before initialization"
- ❌ You have a circular import!
- ✅ Move the setting to `GlobalConfig.js`
- ✅ Or use property inheritance from `Effect.js`

### "Setting doesn't update when I change GlobalConfig"
- ⚠️ Values are read at construction time
- ✅ Restart the app to see changes
- ✅ Or implement a `updateConfig()` method

### "Want per-effect override of global setting"
- ✅ Override in effect constructor:
  ```javascript
  constructor() {
      super();
      this.outlineWidth = 5; // Override global default
  }
  ```

---

## Future Enhancements

- [ ] Runtime config hot-reload
- [ ] UI sliders for global settings
- [ ] Config presets (save/load)
- [ ] Per-effect outline overrides in EffectsDefaults
- [ ] Validation/type checking for config values

---

*Architecture designed to avoid circular dependencies while maintaining centralized configuration*


