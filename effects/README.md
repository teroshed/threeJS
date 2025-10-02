# 🎨 Effects System

This folder contains all effect classes and their configuration.

## 📁 Folder Structure

```
effects/
├── GlobalConfig.js           # 🌍 Universal settings (outlines, timing)
├── EffectsDefaults.js        # 🎯 Effect-specific parameters
├── EffectsManager.js         # 🎪 Orchestrates all effects
├── Effect.js                 # 📦 Base class for all effects
│
├── clickEffects/             # ⚡ Click-triggered effects
│   ├── ClickEffect.js        # Base for click effects
│   └── ClickSnake.js         # Trail of cubes on click
│
└── idleEffects/              # ✨ Automatic background effects
    ├── IdleEffect.js         # Base for idle effects
    ├── RandomCubes.js        # Random cube spawning
    ├── CameraOrbit.js        # Orbiting camera
    └── SimulatedDrag.js      # Automated drawing patterns
```

## ⚙️ Configuration Files

### 🌍 **GlobalConfig.js** - Universal Settings
Settings that apply to ALL effects (outline width, colors, timing).

**Read this for:** Visual appearance, performance settings

### 🎯 **EffectsDefaults.js** - Effect Parameters
Individual effect configurations (max cubes, speeds, sizes).

**Read this for:** Effect-specific behavior

### 📖 Full Documentation
See [`CONFIG_ARCHITECTURE.md`](./CONFIG_ARCHITECTURE.md) for detailed explanation of the configuration system and how to avoid circular dependencies.

## 🚀 Quick Start

### Creating a New Effect

1. **Create effect class:**
```javascript
// effects/idleEffects/MyEffect.js
import { IdleEffect } from "./IdleEffect.js";

class MyEffect extends IdleEffect {
    constructor(param1, param2) {
        super();
        this.param1 = param1;
        this.param2 = param2;
    }
    
    update(camera, scene, mouse) {
        super.update(camera, scene, mouse);
        if (!this.active) return;
        
        // Your effect logic here
    }
}

export default MyEffect;
```

2. **Register in EffectsDefaults.js:**
```javascript
import MyEffect from './idleEffects/MyEffect.js';

const EFFECTS_DEFAULTS = {
    // ...
    MY_EFFECT: {
        name: "MyEffect",
        class: MyEffect,
        param1: 100,
        param2: 0.5
    }
};
```

3. **Add to EffectsManager:**
```javascript
static IDLE_EFFECTS = [
    EFFECTS_DEFAULTS.MY_EFFECT
];
```

### Changing Global Settings

Edit `effects/GlobalConfig.js`:
```javascript
const GLOBAL_CONFIG = {
    outlineWidth: 5,      // Make outlines thicker
    outlineOpacity: 0.8,  // Make outlines more visible
    // ...
};
```

All effects will automatically use these values!

## 🎯 Effect Types

### Click Effects
Triggered when user clicks or drags.
- Extend `ClickEffect`
- `onClick(mouse, camera)` - Called on click
- `onClickTick()` - Called while mouse is held

### Idle Effects
Run continuously in background.
- Extend `IdleEffect`
- `update(camera, scene, mouse)` - Called every frame
- Must check `if (!this.active) return;`

## 🔧 Common Methods

### `createCube(size, position, color)`
Creates a cube with automatic outline.
```javascript
this.createCube(1, {x: 0, y: 0, z: 0}, 0xff0000);
```

### `removeCube(index)`
Removes cube from scene and array.
```javascript
this.removeCube(0); // Remove first cube
```

### `clear()`
Removes all cubes created by this effect.
```javascript
this.clear();
```

## 📚 Related Documentation

- [`CONFIG_ARCHITECTURE.md`](./CONFIG_ARCHITECTURE.md) - Configuration system design
- [`../docs/BUGFIX_OUTLINE_SETTINGS.md`](../docs/BUGFIX_OUTLINE_SETTINGS.md) - Circular dependency fix
- [`../docs/PANEL_STRUCTURE.md`](../docs/PANEL_STRUCTURE.md) - UI integration

## 🐛 Common Issues

**"Cannot access Effect before initialization"**
- You have a circular import! Check import order.
- Move global settings to `GlobalConfig.js`

**"Effect not spawning cubes"**
- Check `if (!this.active) return;` at start of `update()`
- Ensure effect is registered in EffectsManager
- Verify effect is enabled in UI

**"Outlines not showing"**
- Check `GlobalConfig.outlineOpacity` is > 0
- Verify `outlineWidth` is > 1
- WebGL linewidth support varies by browser

## 💡 Tips

- Use `console.log` with emoji for debugging (e.g., `console.log('🎨 MyEffect spawned')`)
- Keep effect logic in `update()`, not constructor
- Always check `this.active` before doing work
- Use `super.update()` to get rotation/fade for free
- Test with effect disabled to catch bugs


