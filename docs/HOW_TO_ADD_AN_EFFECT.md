# 🎯 How to Add a New Effect

## Overview

This guide walks you through adding a new visual effect to the Three.js Visualizer. The system is designed to be modular and easy to extend.

## 📁 File Structure

```
effects/
├── Effect.js                    # Base class (inherited by all effects)
├── clickEffects/
│   ├── ClickEffect.js          # Base for click-triggered effects
│   ├── ClickSnake.js           # Example: Snake trail effect
│   └── DragSpiral.js           # Example: Spiral drag effect
├── idleEffects/
│   ├── IdleEffect.js           # Base for continuous effects
│   ├── RandomCubes.js          # Example: Random cube spawner
│   ├── CameraOrbit.js          # Example: Camera rotation
│   └── SimulatedDrag.js        # Example: Simulated drag patterns
└── EffectsDefaults.js          # Configuration for all effects

enums/
├── index.js                    # Central export point
├── effect-enums.js             # Effect-related enums
├── ui-enums.js                 # UI-related enums
└── audio-enums.js              # Audio-related enums

ui/components/settings/effects/
├── click/
│   ├── templates/
│   │   └── click-effects.html  # Click effects UI template
│   └── styles/
└── idle/
    ├── templates/
    │   └── idle-effects.html   # Idle effects UI template
    └── styles/
```

## 🚀 Step-by-Step Guide

### Step 1: Choose Effect Type

**Click Effects** (triggered by mouse click):
- Inherit from `ClickEffect`
- Examples: ClickSnake, DragSpiral
- File location: `effects/clickEffects/`

**Idle Effects** (continuous background effects):
- Inherit from `IdleEffect` 
- Examples: RandomCubes, CameraOrbit, SimulatedDrag
- File location: `effects/idleEffects/`

### Step 2: Create the Effect Class

#### For Click Effects:

```javascript
// effects/clickEffects/MyNewEffect.js
import { ClickEffect } from "./ClickEffect.js";
import * as THREE from 'three';

class MyNewEffect extends ClickEffect {
    
    constructor(param1, param2, param3, /* ... other params */) {
        super();
        
        this.name = "MyNewEffect";
        this.active = false;
        
        // Store parameters
        this.param1 = param1;
        this.param2 = param2;
        this.param3 = param3;
        
        // Initialize any arrays or objects
        this.cubeArray = [];
    }
    
    // Required: Handle click events
    handleClick(mousePosition, camera, scene) {
        if (!this.active) return;
        
        // Your click logic here
        // Create cubes, particles, etc.
    }
    
    // Required: Update effect each frame
    update() {
        if (!this.active) return;
        
        // Your update logic here
        // Animate cubes, fade effects, etc.
    }
    
    // Required: Clean up when effect is disabled
    cleanup(scene) {
        // Remove all cubes from scene
        this.cubeArray.forEach(cube => {
            scene.remove(cube);
        });
        this.cubeArray = [];
    }
}

export default MyNewEffect;
```

#### For Idle Effects:

```javascript
// effects/idleEffects/MyNewIdleEffect.js
import { IdleEffect } from "./IdleEffect.js";
import * as THREE from 'three';

class MyNewIdleEffect extends IdleEffect {
    
    constructor(param1, param2, param3, /* ... other params */) {
        super();
        
        this.name = "MyNewIdleEffect";
        this.active = false;
        
        // Store parameters
        this.param1 = param1;
        this.param2 = param2;
        this.param3 = param3;
        
        // Initialize any arrays or objects
        this.cubeArray = [];
    }
    
    // Required: Update effect each frame
    update() {
        if (!this.active) return;
        
        // Your update logic here
        // Spawn cubes, animate, etc.
    }
    
    // Required: Clean up when effect is disabled
    cleanup(scene) {
        // Remove all cubes from scene
        this.cubeArray.forEach(cube => {
            scene.remove(cube);
        });
        this.cubeArray = [];
    }
}

export default MyNewIdleEffect;
```

### Step 3: Add to EffectsDefaults.js

Add your effect configuration to `effects/EffectsDefaults.js`:

```javascript
// effects/EffectsDefaults.js
import MyNewEffect from './clickEffects/MyNewEffect.js';  // Add import
import { Z_MODES, PATTERN_TYPES, COLOR_MODES, SPAWN_MODES } from '../enums/index.js';  // Import enums
// ... other imports

const EFFECTS_DEFAULTS = {
    // ... existing effects
    
    // Add your new effect configuration
    MY_NEW_EFFECT: {
        name: "MyNewEffect",
        class: MyNewEffect,
        param1: 10,                    // Default values
        param2: 0.5,
        param3: true,
        colorMode: COLOR_MODES.RANDOM, // Use enums for type safety!
        zMode: Z_MODES.WAVE,           // Use enums for type safety!
        pattern: PATTERN_TYPES.CIRCLE, // Use enums for type safety!
        spawnMode: SPAWN_MODES.CONTINUOUS, // Use enums for type safety!
        // ... other parameters
    },
    
    // ... rest of effects
};
```

### Step 3.5: Use Enums for Type Safety

**Available Enums:**

```javascript
// Import what you need
import { 
    Z_MODES,           // Z-position modes
    PATTERN_TYPES,     // Pattern types for drag effects
    COLOR_MODES,       // Color modes
    SPAWN_MODES,       // Spawn modes for particles
    EASING_TYPES,      // Animation easing
    EFFECT_TYPES,      // Effect categories
    AUDIO_ANALYSIS_TYPES, // Audio analysis types
    FREQUENCY_BANDS    // Audio frequency bands
} from '../enums/index.js';
```

**Example Usage:**
```javascript
// Instead of magic strings
zMode: 'wave',                    // ❌ Magic string
pattern: 'circle',                // ❌ Magic string
colorMode: 'random',              // ❌ Magic string

// Use enums for type safety
zMode: Z_MODES.WAVE,              // ✅ Type-safe enum
pattern: PATTERN_TYPES.CIRCLE,    // ✅ Type-safe enum
colorMode: COLOR_MODES.RANDOM,    // ✅ Type-safe enum
```

### Step 4: Add to EffectsManager

Update `effects/EffectsManager.js` to include your effect:

```javascript
// effects/EffectsManager.js
import { MY_NEW_EFFECT } from './EffectsDefaults.js';  // Add import

class EffectsManager {
    constructor(scene, camera) {
        // ... existing code
        
        // Add your effect initialization
        this.myNewEffect = new MY_NEW_EFFECT.class(
            MY_NEW_EFFECT.param1,
            MY_NEW_EFFECT.param2,
            MY_NEW_EFFECT.param3
            // ... other parameters
        );
    }
    
    // Add effect to the effects array
    getEffects() {
        return [
            this.clickSnake,
            this.dragSpiral,
            this.randomCubes,
            this.cameraOrbit,
            this.simulatedDrag,
            this.myNewEffect  // Add your effect here
        ];
    }
    
    // Add effect to click effects array (if it's a click effect)
    getClickEffects() {
        return [
            this.clickSnake,
            this.dragSpiral,
            this.myNewEffect  // Add your effect here
        ];
    }
    
    // Add effect to idle effects array (if it's an idle effect)
    getIdleEffects() {
        return [
            this.randomCubes,
            this.cameraOrbit,
            this.simulatedDrag,
            this.myNewEffect  // Add your effect here
        ];
    }
}
```

### Step 5: Add UI Controls

#### For Click Effects:

Update `ui/components/settings/effects/click/templates/click-effects.html`:

```html
<!-- Add your effect controls -->
<div class="effect-control-group">
    <h4>My New Effect</h4>
    
    <!-- Toggle -->
    <div class="control-row">
        <label for="myNewEffectActive">Enable</label>
        <input type="checkbox" id="myNewEffectActive" class="effect-toggle">
    </div>
    
    <!-- Parameter 1 -->
    <div class="control-row">
        <label for="myNewEffectParam1">Parameter 1</label>
        <input type="range" id="myNewEffectParam1" min="1" max="20" step="1">
        <span id="myNewEffectParam1Value">10</span>
    </div>
    
    <!-- Parameter 2 -->
    <div class="control-row">
        <label for="myNewEffectParam2">Parameter 2</label>
        <input type="range" id="myNewEffectParam2" min="0" max="1" step="0.1">
        <span id="myNewEffectParam2Value">0.5</span>
    </div>
    
    <!-- Parameter 3 (checkbox) -->
    <div class="control-row">
        <label for="myNewEffectParam3">Parameter 3</label>
        <input type="checkbox" id="myNewEffectParam3">
    </div>
</div>
```

#### For Idle Effects:

Update `ui/components/settings/effects/idle/templates/idle-effects.html` with similar controls.

### Step 6: Add Event Handlers

#### For Click Effects:

Update `ui/event-handlers/click-effects-handlers.js`:

```javascript
// ui/event-handlers/click-effects-handlers.js
import { setupEffectRangeControl, setupEffectCheckbox, setupEffectActivation } from '../effect-control-utils.js';

export function setupMyNewEffectControls() {
    // Toggle control
    setupEffectActivation('myNewEffectActive', 'MyNewEffect');
    
    // Range controls
    setupEffectRangeControl('myNewEffectParam1', 'myNewEffectParam1Value', 'MyNewEffect', 'param1', parseInt);
    setupEffectRangeControl('myNewEffectParam2', 'myNewEffectParam2Value', 'MyNewEffect', 'param2', parseFloat);
    
    // Checkbox control
    setupEffectCheckbox('myNewEffectParam3', 'MyNewEffect', 'param3');
}
```

#### For Idle Effects:

Update `ui/event-handlers/idle-effects-handlers.js` with similar code.

### Step 7: Register Event Handlers

Update `ui/event-handlers.js` to call your new handler:

```javascript
// ui/event-handlers.js
import { setupMyNewEffectControls } from './event-handlers/click-effects-handlers.js';  // Add import

// ... existing code

export function setupAllEventHandlers() {
    // ... existing handlers
    
    // Add your new handler
    setupMyNewEffectControls();
}
```

## 🎨 Effect Development Tips

### 1. **Use the Base Classes**
- Inherit from `ClickEffect` or `IdleEffect`
- They provide common functionality like cube management, color handling, etc.

### 2. **Follow the Constructor Pattern**
- Match the parameter order in `EffectsDefaults.js`
- Use descriptive parameter names
- Set reasonable defaults

### 3. **Implement Required Methods**
- `update()`: Called every frame
- `cleanup(scene)`: Clean up when disabled
- `handleClick()`: For click effects only

### 4. **Use Three.js Best Practices**
- Reuse geometry and materials when possible
- Dispose of resources in `cleanup()`
- Use `scene.add()` and `scene.remove()` for cubes

### 5. **Test Your Effect**
- Enable/disable the effect
- Adjust parameters in real-time
- Check for memory leaks (cubes not being removed)

## 🔧 Common Patterns

### Creating Cubes
```javascript
createCube(x, y, z, size, color) {
    const geometry = new THREE.BoxGeometry(size, size, size);
    const material = new THREE.MeshBasicMaterial({ 
        color: color,
        wireframe: this.outlineWidth > 0,
        transparent: true,
        opacity: 1.0
    });
    
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(x, y, z);
    
    this.cubeArray.push(cube);
    return cube;
}
```

### Fading Cubes
```javascript
update() {
    if (!this.active) return;
    
    // Fade out cubes
    this.cubeArray.forEach((cube, index) => {
        cube.material.opacity -= this.fadeSpeed;
        
        if (cube.material.opacity <= 0) {
            this.scene.remove(cube);
            this.cubeArray.splice(index, 1);
        }
    });
}
```

### Random Colors
```javascript
getRandomColor() {
    if (this.randomColor) {
        return new THREE.Color().setHSL(Math.random(), 1, 0.5);
    } else {
        return new THREE.Color(this.fixedColor);
    }
}
```

## 🐛 Troubleshooting

### Effect Not Appearing
- Check if `active` is set to `true`
- Verify cubes are added to `scene`
- Check console for errors

### Parameters Not Updating
- Ensure parameter names match in `EffectsDefaults.js`
- Check event handler setup
- Verify UI element IDs match

### Memory Leaks
- Implement proper `cleanup()` method
- Remove cubes from scene before splicing array
- Dispose of geometries and materials

### Performance Issues
- Limit number of cubes
- Use object pooling for frequently created/destroyed objects
- Optimize update loops

## 📚 Examples

Check out these existing effects for reference:
- **ClickSnake**: Simple click effect with trail
- **DragSpiral**: Complex drag effect with multiple parameters
- **RandomCubes**: Idle effect with spawning and fading
- **CameraOrbit**: Camera animation effect

## 🎯 Enums Reference

### Available Enum Categories

#### **Effect Enums** (`enums/effect-enums.js`)
- `Z_MODES` - Z-position modes (SET, RANDOM, WAVE, SPIRAL, PULSE, OSCILLATE)
- `PATTERN_TYPES` - Pattern types for drag effects (CIRCLE, LINE, SPIRAL, FIGURE8, etc.)
- `COLOR_MODES` - Color modes (RANDOM, FIXED, GRADIENT, AUDIO_RESPONSIVE, TIME_BASED)
- `SPAWN_MODES` - Spawn modes for particles (CONTINUOUS, BURST, WAVE, RANDOM, AUDIO_TRIGGERED)
- `EASING_TYPES` - Animation easing (LINEAR, EASE_IN, EASE_OUT, BOUNCE, ELASTIC, BACK)
- `EFFECT_TYPES` - Effect categories (CLICK, IDLE, AUDIO)
- `EFFECT_CATEGORIES` - Effect categories (VISUAL, ANIMATION, INTERACTION, AUDIO_RESPONSIVE)

#### **UI Enums** (`enums/ui-enums.js`)
- `GRADIENT_KEYS` - Background gradient options
- `DIRECTION_KEYS` - Gradient direction options
- `VERTEX_MARKER_SHAPES` - Vertex marker shape options
- `CONTROL_TYPES` - UI control types
- `PANEL_TYPES` - Panel types

#### **Audio Enums** (`enums/audio-enums.js`)
- `AUDIO_ANALYSIS_TYPES` - Audio analysis types
- `FREQUENCY_BANDS` - Audio frequency bands
- `BEAT_DETECTION_ALGORITHMS` - Beat detection algorithms
- `AUDIO_VISUALIZATION_MODES` - Audio visualization modes
- `AUDIO_FILE_FORMATS` - Supported audio file formats
- `AUDIO_QUALITY_LEVELS` - Audio quality levels

### Using Enums in Your Effect

```javascript
// Import enums
import { Z_MODES, COLOR_MODES, PATTERN_TYPES } from '../enums/index.js';

// Use in constructor
constructor(zMode, colorMode, pattern) {
    super();
    
    // Type-safe enum usage
    this.zMode = zMode || Z_MODES.WAVE;
    this.colorMode = colorMode || COLOR_MODES.RANDOM;
    this.pattern = pattern || PATTERN_TYPES.CIRCLE;
}

// Use in logic
update() {
    if (this.colorMode === COLOR_MODES.RANDOM) {
        // Random color logic
    } else if (this.colorMode === COLOR_MODES.FIXED) {
        // Fixed color logic
    }
}
```

## 🎯 Next Steps

1. Create your effect class
2. Add to `EffectsDefaults.js` (use enums!)
3. Update `EffectsManager.js`
4. Add UI controls
5. Set up event handlers
6. Test thoroughly
7. Document any special parameters

Happy coding! 🚀✨
