# 🌀 Drag Spiral Effect - Complete Guide

## Overview

**Drag Spiral** is a new drag effect that creates mesmerizing spiral patterns as you drag your mouse. It features:

- 🌀 **Multiple spiral arms** (1-6 configurable arms)
- 🎨 **Rainbow color palettes** with smooth HSL color shifting
- 📏 **Size variation** for organic, dynamic spirals
- 💫 **3D wave motion** with subtle Z-axis oscillation
- 🔄 **Individual cube rotation** for enhanced visual depth
- ⚡ **Smooth fade-out** animations

---

## How It Works

### The Math Behind the Spiral

The spiral effect uses **polar coordinates** with multiple arms:

```javascript
for (let i = 0; i < spiralArms; i++) {
    const armAngle = spiralAngle + (i / spiralArms) * Math.PI * 2;
    const radius = spiralAngle * spiralTightness;
    
    const x = centerX + Math.cos(armAngle) * radius;
    const y = centerY + Math.sin(armAngle) * radius;
    const z = centerZ + Math.sin(spiralAngle * 2) * 0.5; // 3D wave
}
```

- **`spiralAngle`** increases continuously as you drag
- **`spiralTightness`** controls how fast the spiral expands
- **`spiralArms`** creates symmetrical arms by dividing 2π

### Color System

Uses **HSL color space** for smooth rainbow transitions:

```javascript
const hue = (cubeCounter * colorShift) % 360;
const color = new THREE.Color().setHSL(hue / 360, 0.8, 0.6);
```

This creates a continuous rainbow that shifts through the spectrum!

---

## Configuration Parameters

### Spiral Shape
- **`spiralArms`** (1-6): Number of spiral arms
- **`spiralTightness`** (0.5-3.0): How tight/loose the spiral is
- **`maxCubes`** (50-300): Maximum cubes before cleanup

### Visual Properties
- **`cubeSize`** (0.2-2.0): Base size of cubes
- **`sizeVariation`** (0-1): Randomness in cube sizes
- **`fadeSpeed`** (0.001-0.1): How fast cubes fade out
- **`rotationSpeed`** (0-0.2): Individual cube rotation speed

### Color System
- **`randomColor`** (boolean): Use rainbow HSL colors
- **`colorShift`** (1-20): Hue shift amount per cube
- **`fixedColor`** (hex): Single color if randomColor is false

---

## UI Controls

### Color Palette Grid

The Drag Spiral settings include a **visual color palette selector** (reusable component!):

```javascript
import { createColorPaletteGrid, getColorFromPalette } from './ui-color-palettes.js';

// Create grid
createColorPaletteGrid('spiralColorPaletteGrid', 'rainbow', (paletteKey) => {
    // Handle palette selection
    updateEffectColorPalette('DragSpiral', paletteKey);
});
```

Available palettes:
- 🌈 **Rainbow** - Full spectrum
- 🔥 **Fire** - Hot reds and oranges
- 🌊 **Ocean** - Cool blues
- 🌲 **Forest** - Natural greens
- 🌅 **Sunset** - Warm pinks
- 💜 **Purple Haze** - Deep purples
- ⚡ **Neon** - Electric colors
- ⚫ **Monochrome** - Black to white
- 🎀 **Pastel** - Soft tones
- 🤖 **Cyberpunk** - High-tech vibes

---

## Integration with SimulatedDrag

### 🎯 Meta-Effect Architecture

**SimulatedDrag** was refactored to be a **meta-effect** that triggers ALL active drag effects:

```javascript
// SimulatedDrag update loop
triggerDragEffects(camera) {
    this.effectsManager.onClickEffects.forEach(effect => {
        if (effect.active && effect !== this) {
            effect.onClick(this.virtualCursor, camera);
        }
    });
}
```

#### What This Means:
1. **SimulatedDrag** creates a virtual cursor that follows patterns (circle, spiral, figure-8, etc.)
2. It calls `onClick()` on **all active drag effects** (ClickSnake, DragSpiral, etc.)
3. You get **automatic drawing** with whatever drag effects you have enabled!

#### Example Combo:
- ✅ **ClickSnake** ON
- ✅ **DragSpiral** ON
- ✅ **SimulatedDrag** ON (pattern: `circle`)

Result: A circular path that draws BOTH a snake AND a spiral simultaneously! 🤯

---

## Implementation Details

### File Structure

```
effects/
├── clickEffects/
│   ├── DragSpiral.js          # Main effect class
│   └── ClickSnake.js           # Original drag effect
├── idleEffects/
│   └── SimulatedDrag.js        # Meta-effect (triggers drag effects)
├── EffectsDefaults.js          # Configuration
└── EffectsManager.js           # Orchestrator

ui/
├── ui-color-palettes.js        # Reusable color palette system
├── event-handlers.js           # UI wiring
└── components/settings/effects/drag/
    └── templates/
        └── drag-effects.html   # UI template
```

### Key Design Patterns

1. **Composition over Inheritance**: DragSpiral extends ClickEffect but uses Effect base
2. **Meta-Effect Pattern**: SimulatedDrag triggers other effects instead of creating cubes
3. **Reusable Components**: Color palette grid can be used by any effect
4. **Centralized Config**: All parameters in EffectsDefaults.js

---

## Performance Considerations

### Optimization Techniques

1. **Frame Throttling**: Only creates cubes every N frames
2. **Max Cube Limit**: Removes oldest cubes when limit exceeded
3. **Fade Cleanup**: Automatically removes fully faded cubes
4. **Distance Check**: Only spawns cubes if mouse moved significantly

```javascript
if (distance > 0.1) {
    this.createSpiralCubes(currentPoint);
}
```

### Recommended Settings for Performance

- **Low-end**: maxCubes: 100, spiralArms: 2, sizeVariation: 0.2
- **Mid-range**: maxCubes: 150, spiralArms: 3, sizeVariation: 0.4
- **High-end**: maxCubes: 300, spiralArms: 5, sizeVariation: 0.6

---

## Future Enhancements

### Planned Features
- [ ] Color palettes with custom colors (user-defined)
- [ ] Spiral reverse direction toggle
- [ ] Texture support for cubes
- [ ] Particle trails behind spiral arms
- [ ] Sound reactivity (spiral expands with bass)

### Community Ideas
- [ ] Golden ratio spiral mode
- [ ] Fibonacci spiral
- [ ] DNA double-helix mode
- [ ] Galaxy spiral with rotation

---

## Credits

**Created**: October 2, 2025  
**Effect Type**: Drag/Click  
**Complexity**: Advanced  
**Fun Factor**: 🌀🌀🌀🌀🌀/5

**Special Thanks**: The user who suggested making SimulatedDrag trigger all drag effects! 🎉

---

## Quick Start

1. **Enable the effect**: Check ✅ "Drag Spiral" in the UI
2. **Adjust arms**: Start with 3 arms
3. **Set tightness**: 1.5 is a good default
4. **Pick a palette**: Try 🌈 Rainbow first!
5. **Drag and enjoy!** 🎨

Pro tip: Enable BOTH ClickSnake and DragSpiral, then activate SimulatedDrag for hypnotic patterns! 🤯

