# 🎯 Enums System

## Overview

This folder contains all type-safe enums used throughout the Three.js Visualizer. Enums provide better IDE support, prevent typos, and make the code more maintainable.

## 📁 Structure

```
enums/
├── index.js                    # Central export point
├── effect-enums.js             # Effect-related enums
├── ui-enums.js                 # UI-related enums
├── audio-enums.js              # Audio-related enums
└── README.md                   # This file
```

## 🚀 Usage

### Import Enums

```javascript
// Import specific enums
import { Z_MODES, COLOR_MODES, PATTERN_TYPES } from './enums/index.js';

// Import all enums from a category
import * as EffectEnums from './enums/effect-enums.js';
import * as UIEnums from './enums/ui-enums.js';
import * as AudioEnums from './enums/audio-enums.js';
```

### Use in Code

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

## 📚 Available Enums

### Effect Enums (`effect-enums.js`)

#### **Z_MODES** - Z-position modes
```javascript
Z_MODES.SET          // Fixed Z position
Z_MODES.RANDOM       // Random depth variation
Z_MODES.WAVE         // Smooth sine wave pattern
Z_MODES.SPIRAL       // Spiraling depth effect
Z_MODES.PULSE        // Rhythmic depth pulsing
Z_MODES.OSCILLATE    // Back and forth motion
```

#### **PATTERN_TYPES** - Pattern types for drag effects
```javascript
PATTERN_TYPES.CIRCLE     // Smooth circular motion
PATTERN_TYPES.LINE       // Straight line movement
PATTERN_TYPES.SPIRAL     // Spiraling outward motion
PATTERN_TYPES.FIGURE8    // Infinity symbol pattern
PATTERN_TYPES.LISSAJOUS  // Complex harmonic curves
PATTERN_TYPES.RANDOM     // Random walk pattern
PATTERN_TYPES.SQUARE     // Square wave pattern
PATTERN_TYPES.TRIANGLE   // Triangular wave pattern
```

#### **COLOR_MODES** - Color modes
```javascript
COLOR_MODES.RANDOM           // Random colors for each cube
COLOR_MODES.FIXED            // Single color for all cubes
COLOR_MODES.GRADIENT         // Smooth color transitions
COLOR_MODES.AUDIO_RESPONSIVE // Colors change with audio
COLOR_MODES.TIME_BASED       // Colors change over time
```

#### **SPAWN_MODES** - Spawn modes for particles
```javascript
SPAWN_MODES.CONTINUOUS      // Steady stream of particles
SPAWN_MODES.BURST           // Sudden burst of particles
SPAWN_MODES.WAVE            // Wave-like spawning pattern
SPAWN_MODES.RANDOM          // Random timing intervals
SPAWN_MODES.AUDIO_TRIGGERED // Spawn based on audio beats
```

#### **EASING_TYPES** - Animation easing
```javascript
EASING_TYPES.LINEAR      // Constant speed
EASING_TYPES.EASE_IN     // Slow start, fast end
EASING_TYPES.EASE_OUT    // Fast start, slow end
EASING_TYPES.EASE_IN_OUT // Slow start and end
EASING_TYPES.BOUNCE      // Bouncing motion
EASING_TYPES.ELASTIC     // Elastic spring motion
EASING_TYPES.BACK        // Overshoot and settle
```

### UI Enums (`ui-enums.js`)

#### **GRADIENT_KEYS** - Background gradient options
```javascript
GRADIENT_KEYS.MIDNIGHT    // Midnight theme
GRADIENT_KEYS.TWILIGHT    // Twilight theme
GRADIENT_KEYS.SUNSET      // Sunset theme
GRADIENT_KEYS.OCEAN       // Ocean theme
GRADIENT_KEYS.FOREST      // Forest theme
GRADIENT_KEYS.NEON        // Neon theme
GRADIENT_KEYS.AURORA      // Aurora theme
GRADIENT_KEYS.FIRE        // Fire theme
GRADIENT_KEYS.COSMIC      // Cosmic theme
GRADIENT_KEYS.PURE_BLACK  // Pure black
GRADIENT_KEYS.PURE_WHITE  // Pure white
```

#### **DIRECTION_KEYS** - Gradient direction options
```javascript
DIRECTION_KEYS.VERTICAL     // Vertical gradient
DIRECTION_KEYS.HORIZONTAL   // Horizontal gradient
DIRECTION_KEYS.DIAGONAL_TL  // Diagonal top-left
DIRECTION_KEYS.DIAGONAL_TR  // Diagonal top-right
DIRECTION_KEYS.RADIAL       // Radial gradient
```

#### **VERTEX_MARKER_SHAPES** - Vertex marker shape options
```javascript
VERTEX_MARKER_SHAPES.NONE    // No vertex markers
VERTEX_MARKER_SHAPES.SPHERE  // Spherical vertex markers
VERTEX_MARKER_SHAPES.BOX     // Box-shaped vertex markers
```

### Audio Enums (`audio-enums.js`)

#### **AUDIO_ANALYSIS_TYPES** - Audio analysis types
```javascript
AUDIO_ANALYSIS_TYPES.FREQUENCY      // Analyze frequency components
AUDIO_ANALYSIS_TYPES.TIME_DOMAIN    // Analyze amplitude over time
AUDIO_ANALYSIS_TYPES.BEAT_DETECTION // Detect rhythmic patterns
AUDIO_ANALYSIS_TYPES.VOLUME         // Overall audio volume
AUDIO_ANALYSIS_TYPES.SPECTRUM       // Full frequency spectrum
```

#### **FREQUENCY_BANDS** - Audio frequency bands
```javascript
FREQUENCY_BANDS.BASS        // 20-250 Hz
FREQUENCY_BANDS.LOW_MID     // 250-500 Hz
FREQUENCY_BANDS.MID         // 500-2000 Hz
FREQUENCY_BANDS.HIGH_MID    // 2000-4000 Hz
FREQUENCY_BANDS.TREBLE      // 4000-8000 Hz
FREQUENCY_BANDS.PRESENCE    // 8000-12000 Hz
FREQUENCY_BANDS.BRILLIANCE  // 12000-20000 Hz
```

#### **BEAT_DETECTION_ALGORITHMS** - Beat detection algorithms
```javascript
BEAT_DETECTION_ALGORITHMS.SIMPLE_THRESHOLD    // Basic volume threshold
BEAT_DETECTION_ALGORITHMS.ADAPTIVE_THRESHOLD  // Self-adjusting threshold
BEAT_DETECTION_ALGORITHMS.FREQUENCY_WEIGHTED  // Weighted by frequency
BEAT_DETECTION_ALGORITHMS.ENERGY_BASED        // Based on energy changes
BEAT_DETECTION_ALGORITHMS.SPECTRAL_FLUX       // Advanced spectral analysis
```

## 🎯 Benefits

### 1. **Type Safety**
- Prevents typos and invalid values
- IDE autocomplete support
- Compile-time error checking

### 2. **Maintainability**
- Centralized definition of constants
- Easy to add new values
- Clear documentation of available options

### 3. **Readability**
- Self-documenting code
- Clear intent and purpose
- Consistent naming conventions

### 4. **Refactoring**
- Easy to rename values globally
- Safe find-and-replace operations
- IDE refactoring support

## 🔧 Adding New Enums

### 1. Choose the Right File
- **Effect-related**: `effect-enums.js`
- **UI-related**: `ui-enums.js`
- **Audio-related**: `audio-enums.js`

### 2. Define the Enum
```javascript
// enums/effect-enums.js
export const MY_NEW_ENUM = {
    OPTION1: 'option1',
    OPTION2: 'option2',
    OPTION3: 'option3'
};
```

### 3. Add Descriptions (Optional)
```javascript
export const MY_NEW_ENUM_INFO = {
    [MY_NEW_ENUM.OPTION1]: {
        name: 'Option 1',
        description: 'First option description',
        emoji: '1️⃣'
    },
    // ... other options
};
```

### 4. Export from Index
```javascript
// enums/index.js
export * from './effect-enums.js';  // Already included
```

### 5. Use in Code
```javascript
import { MY_NEW_ENUM } from '../enums/index.js';

// Use the enum
const value = MY_NEW_ENUM.OPTION1;
```

## 🎨 Best Practices

### 1. **Naming Conventions**
- Use `SCREAMING_SNAKE_CASE` for enum keys
- Use descriptive names that indicate purpose
- Group related enums together

### 2. **Value Conventions**
- Use lowercase strings for values
- Use kebab-case for multi-word values
- Keep values short but descriptive

### 3. **Documentation**
- Add JSDoc comments for complex enums
- Include descriptions and examples
- Document any special behavior

### 4. **Consistency**
- Follow the same pattern across all enums
- Use consistent naming conventions
- Maintain similar structure for related enums

## 🚀 Examples

### Effect Configuration
```javascript
import { Z_MODES, COLOR_MODES, PATTERN_TYPES } from '../enums/index.js';

const effectConfig = {
    name: "MyEffect",
    zMode: Z_MODES.WAVE,
    colorMode: COLOR_MODES.RANDOM,
    pattern: PATTERN_TYPES.CIRCLE
};
```

### UI Configuration
```javascript
import { GRADIENT_KEYS, DIRECTION_KEYS } from '../enums/index.js';

const uiConfig = {
    background: GRADIENT_KEYS.TWILIGHT,
    direction: DIRECTION_KEYS.VERTICAL
};
```

### Audio Configuration
```javascript
import { FREQUENCY_BANDS, BEAT_DETECTION_ALGORITHMS } from '../enums/index.js';

const audioConfig = {
    analysisType: FREQUENCY_BANDS.BASS,
    beatAlgorithm: BEAT_DETECTION_ALGORITHMS.ADAPTIVE_THRESHOLD
};
```

## 🎯 Migration Guide

### From Magic Strings to Enums

**Before:**
```javascript
// Magic strings (error-prone)
zMode: 'wave',
pattern: 'circle',
colorMode: 'random'
```

**After:**
```javascript
// Type-safe enums
import { Z_MODES, PATTERN_TYPES, COLOR_MODES } from '../enums/index.js';

zMode: Z_MODES.WAVE,
pattern: PATTERN_TYPES.CIRCLE,
colorMode: COLOR_MODES.RANDOM
```

### Benefits of Migration
- ✅ **IDE Autocomplete**: Type `Z_MODES.` and see all options
- ✅ **Type Safety**: No more typos like `'wav'` instead of `'wave'`
- ✅ **Refactoring**: Easy to rename values globally
- ✅ **Documentation**: Self-documenting code
- ✅ **Consistency**: Standardized values across the codebase

Happy coding with type-safe enums! 🚀✨
