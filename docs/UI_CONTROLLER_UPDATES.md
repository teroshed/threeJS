# UI Controller Updates Needed

## Add Gradient Angle Support

### 1. Add currentAngle variable (line 13)

```javascript
let currentGradient = UI_DEFAULTS.defaultBackground;
let currentDirection = UI_DEFAULTS.gradientDirection;
let currentOpacity = UI_DEFAULTS.gradientOpacity;
let currentAngle = UI_DEFAULTS.gradientAngle;  // ← ADD THIS
```

### 2. Add angle slider initialization (after line 111)

```javascript
// Background gradient controls
setupSmartSlider('bgOpacity', UI_DEFAULTS.gradientOpacity, { min: 0, max: 1, step: 0.05 });
setupSmartSlider('bgAngle', UI_DEFAULTS.gradientAngle, { min: 0, max: 360, step: 5 });  // ← ADD THIS
populateGradientDirections();
createGradientGrid();
```

### 3. Add angle slider event handler (after line 452, after bgOpacity handler)

```javascript
// Background gradient opacity
setupRangeControl('bgOpacity', 'bgOpacityValue', (value) => {
    currentOpacity = parseFloat(value);
    applyGradientBackground(currentGradient);
});

// Background gradient angle  ← ADD THIS BLOCK
setupRangeControl('bgAngle', 'bgAngleValue', (value) => {
    currentAngle = parseInt(value);
    updateGradientPreviews();
    applyGradientBackground(currentGradient);
});
```

### 4. Update applyGradientBackground to use currentAngle (line 270)

**CHANGE:**
```javascript
const angle = dirInfo.angle;
```

**TO:**
```javascript
// Use custom angle if direction is set to custom, otherwise use preset angle
const angle = currentDirection === 'custom' ? currentAngle : dirInfo.angle;
```

### 5. Update getGradientCSS to use currentAngle (similar change)

**CHANGE:**
```javascript
const angle = dirInfo.angle;
```

**TO:**
```javascript
const angle = currentDirection === 'custom' ? currentAngle : dirInfo.angle;
```

## Result

- Gradient angle slider (0-360°)
- Auto-scales from defaults (currently 140°)
- Updates gradient in real-time
- Updates all preview tiles
- Works with opacity

## Quick Apply

Just add these 3 sections to `ui/ui-controller.js` and you're done!

