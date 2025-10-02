# 📁 Project Structure Guide

## 🎯 Quick Reference - Where to Change Things

### Want to change effect defaults? (max length, rotation speed, etc.)
**File:** `effects/EffectsDefaults.js`
```javascript
CLICK_SNAKE: {
    maxLength: 200,        // ← Change here
    rotationSpeed: 0.1,    // ← Change here
    zMode: 'wave'          // ← Change here
}
```

### Want to change UI defaults? (default gradient, Z-mode, etc.)
**File:** `ui/ui-options.js`
```javascript
UI_DEFAULTS: {
    defaultBackground: 'twilight',  // ← Change here
    defaultZMode: 'random',         // ← Change here
    gradientOpacity: 1.0            // ← Change here
}
```

### Want to add a new gradient?
**File:** `ui/ui-options.js` → `BACKGROUND_GRADIENTS`
```javascript
'myGradient': {
    name: 'My Gradient',
    colors: ['#ff0000', '#00ff00', '#0000ff'],
    emoji: '🌈'
}
```

### Want to add a new Z-mode?
**File:** `ui/ui-options.js` → `Z_MODES`
```javascript
'bounce': {
    name: 'Bounce',
    description: 'Bouncing depth effect'
}
```
Then implement the logic in `effects/clickEffects/ClickSnake.js` → `calculateZ()`

## 📂 Complete File Structure

```
threeJS/
├── effects/                      # Effect logic & configuration
│   ├── EffectsDefaults.js       # 🌟 Effect parameters (change defaults here!)
│   ├── EffectsManager.js        # Effect orchestration
│   ├── Effect.js                # Base effect class (shared functionality)
│   ├── clickEffects/            # Mouse click effects
│   │   ├── ClickEffect.js       # Base for click effects
│   │   └── ClickSnake.js        # Snake trail implementation
│   └── idleEffects/             # Ambient/idle effects
│       ├── IdleEffect.js        # Base for idle effects
│       └── RandomCubes.js       # Random cube spawner
│
├── ui/                           # UI controllers & configuration
│   ├── ui-options.js            # 🌟 UI defaults (change UI config here!)
│   └── ui-controller.js         # UI ↔ Effects bridge
│
├── main.js                       # Application entry point
├── index.html                    # UI structure
│
├── package.json                  # Dependencies
├── README.md                     # Project documentation
├── CONFIGURATION.md              # Configuration guide
├── COMMIT_MESSAGE.md             # Commit message template
└── STRUCTURE_GUIDE.md            # This file!
```

## 🔄 Data Flow

```
User Interaction (mouse/keyboard)
    ↓
main.js (event handlers)
    ↓
EffectsManager (coordinates effects)
    ↓
Individual Effects (ClickSnake, etc.)
    ↓
Three.js Scene (renders 3D)

UI Controls
    ↓
ui-controller.js
    ↓
EffectsManager
    ↓
Individual Effects (parameter updates)
```

## 🎨 UI Configuration Flow

```
ui/ui-options.js (defaults)
    ↓
ui-controller.js (reads defaults, initializes UI)
    ↓
index.html (displays controls)
    ↓
User adjusts controls
    ↓
ui-controller.js (updates effects in real-time)
```

## 🔧 Effect Configuration Flow

```
effects/EffectsDefaults.js (defaults)
    ↓
EffectsManager.js (reads config, creates effects)
    ↓
Individual Effect Classes (initialized with parameters)
    ↓
UI reads same defaults (sliders auto-scale)
```

## 💡 Common Tasks

### Add a New Click Effect
1. Create `effects/clickEffects/MyEffect.js`
2. Extend `ClickEffect` class
3. Add config to `effects/EffectsDefaults.js`
4. Register in `effects/EffectsManager.js`
5. Optionally add UI controls in `index.html` + `ui/ui-controller.js`

### Add a New Background Gradient
1. Open `ui/ui-options.js`
2. Add to `BACKGROUND_GRADIENTS` object
3. Done! It appears automatically in the grid

### Change Default Values
1. Open `effects/EffectsDefaults.js` OR `ui/ui-options.js`
2. Change the value
3. Refresh browser
4. Sliders and effects automatically update!

### Add a New Gradient Direction
1. Open `ui/ui-options.js`
2. Add to `GRADIENT_DIRECTIONS`
3. Done! Appears in dropdown automatically

## 🚀 Magic Slider System

When you change a default in `EffectsDefaults.js`:
```javascript
rotationSpeed: 0.1  // Changed from 0.02
```

The slider automatically becomes:
- min: 0
- max: 0.5 (0.1 * 5)
- step: 0.01 (0.1 * 0.1)
- value: 0.1

**No manual configuration needed!**

## 📝 Best Practices

1. **Change effect behavior?** → `effects/EffectsDefaults.js`
2. **Change UI appearance?** → `ui/ui-options.js`
3. **Add new effect?** → Create in `effects/`, register in `EffectsManager.js`
4. **Add UI option?** → Add to `ui/ui-options.js`
5. **Want to understand something?** → Check console logs (we log everything!)

## 🎯 Remember

- **effects/** = Logic and behavior
- **ui/** = UI controls and appearance
- **main.js** = Glues everything together
- **index.html** = Structure only (no logic!)

---

**Everything is designed to be changed easily - just edit the config files!** ✨

