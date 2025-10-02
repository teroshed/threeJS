# 🌀 Drag Spiral Effect

A mesmerizing drag effect that creates spiral patterns following your mouse movement.

## ✨ Features

- **Multiple Spiral Arms**: 1-6 configurable arms rotating around the drag path
- **Parametric Spiral Motion**: Mathematical polar coordinates for smooth spirals
- **Dynamic Rotation**: Cubes rotate based on their position in the spiral
- **Color Shifting**: Rainbow hue shifting along the spiral (HSL color space)
- **Size Variation**: Random size changes for organic feel
- **Z-Wave Motion**: Vertical sine wave for 3D depth
- **Smooth Interpolation**: Only creates cubes when you move enough

## 🎯 Configuration

All parameters are in `effects/EffectsDefaults.js`:

```javascript
DRAG_SPIRAL: {
    spiralArms: 3,          // Number of spiral arms (1-6)
    spiralTightness: 1.5,   // How tight the spiral (0.5-3.0)
    maxCubes: 150,          // Maximum cubes
    cubeSize: 0.8,          // Base cube size
    fadeSpeed: 0.02,        // Fade out speed
    rotationSpeed: 0.08,    // Individual cube rotation
    randomColor: true,      // Use rainbow colors
    fixedColor: '#00ffff',  // Cyan if randomColor is false
    colorShift: 5,          // Hue shift per cube (0-360)
    sizeVariation: 0.4      // Size randomness (0-1)
}
```

## 🎨 Visual Style

- **1 Arm**: Simple spiral trail
- **2 Arms**: DNA double-helix style
- **3 Arms**: Triskelion pattern (default)
- **4 Arms**: Cross/flower pattern
- **5-6 Arms**: Dense, flower-like spirals

## 📐 Mathematical Details

### Spiral Position Calculation
```javascript
angle = spiralAngle + (armIndex / totalArms) * 2π
x = centerX + cos(angle) × tightness
y = centerY + sin(angle) × tightness  
z = centerZ + sin(spiralAngle × 2) × 0.5  // Wave motion
```

### Color Shifting (HSL)
```javascript
hue = (cubeCounter × colorShift) % 360
color.setHSL(hue / 360, 0.8, 0.6)
```

### Size Variation
```javascript
finalSize = baseSize × (1 + random(-0.5, 0.5) × sizeVariation)
```

## 🎮 Usage

1. **Enable** the effect via checkbox in main panel
2. **Click and drag** your mouse
3. **Watch** the spiral pattern emerge!

## 🔧 Customization Ideas

### Tight Spiral
```javascript
spiralTightness: 0.5
spiralArms: 2
```

### Explosive Flower
```javascript
spiralTightness: 3.0
spiralArms: 6
colorShift: 10
```

### Monochrome Ribbon
```javascript
randomColor: false
fixedColor: '#ffffff'
spiralArms: 1
```

### Psychedelic Vortex
```javascript
spiralArms: 4
colorShift: 15
sizeVariation: 0.8
rotationSpeed: 0.15
```

## 🐛 Troubleshooting

**Cubes too crowded?**
- Increase fade speed
- Reduce max cubes
- Increase spiral tightness

**Pattern not visible?**
- Increase cube size
- Reduce size variation
- Check if vertex markers are enabled

**Colors not changing?**
- Ensure `randomColor: true`
- Increase `colorShift` value

## 🚀 Performance

- **Low** (1 arm, 50 cubes): Excellent
- **Medium** (3 arms, 150 cubes): Very Good
- **High** (6 arms, 300+ cubes): May lag on slow devices

## 💡 Future Enhancements

- [ ] UI controls for all parameters
- [ ] Preset spiral patterns
- [ ] Spiral direction toggle (clockwise/counter-clockwise)
- [ ] Speed-based tightness (faster drag = tighter spiral)
- [ ] Trail smoothing for cleaner curves
- [ ] Particle emission from spiral center
- [ ] Sound-reactive spiral expansion

---

*Created as a test of AI capabilities - mission accomplished! 🎖️*

