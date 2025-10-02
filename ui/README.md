# 🎛️ UI Folder - Control Panel System

## 📁 File Structure

```
ui/
├── ui-defaults.js       ← 🌟 CHANGE DEFAULTS HERE!
├── ui-constants.js      ← Reference data (enums, presets)
└── ui-controller.js     ← Logic (don't touch unless adding features)
```

## 🎯 Quick Reference

### Want to change a default?
**→ `ui-defaults.js`**

### Want to see available options?
**→ `ui-constants.js`**

### Want to add UI functionality?
**→ `ui-controller.js`**

## 📝 Files Explained

### `ui-defaults.js` - THE place to change defaults
```javascript
export const UI_DEFAULTS = {
    defaultBackground: 'twilight',
    gradientDirection: 'vertical',
    gradientOpacity: 0.65,
    defaultZMode: Z_MODES.WAVE,        // ← Uses enum!
    rotationEnabled: true
};
```

**Change any value here and it updates everywhere!**

### `ui-constants.js` - Reference data
Contains:
- `Z_MODES` - Enum for Z-position modes
- `Z_MODE_INFO` - Descriptions for each mode
- `BACKGROUND_GRADIENTS` - All gradient presets
- `GRADIENT_DIRECTIONS` - Direction options

**Look here to see all available options!**

### `ui-controller.js` - The brain
Handles:
- Initializing UI from defaults
- Magic slider calculations
- Event listeners
- Gradient rendering
- Effects communication

**Only touch if adding new UI features!**

## 💡 Common Tasks

### Change Default Z-Mode
```javascript
// ui-defaults.js
defaultZMode: Z_MODES.SPIRAL  // ← Change this!
```

### Change Default Gradient Opacity
```javascript
// ui-defaults.js
gradientOpacity: 0.5  // ← Change this!
```

### Add New Gradient
```javascript
// ui-constants.js → BACKGROUND_GRADIENTS
'newGradient': {
    name: 'New Gradient',
    colors: ['#hex1', '#hex2'],
    emoji: '🌈'
}
```

### Add New Z-Mode
1. Add enum key:
```javascript
// ui-constants.js → Z_MODES
MYNEWMODE: 'mynewmode'
```

2. Add description:
```javascript
// ui-constants.js → Z_MODE_INFO
[Z_MODES.MYNEWMODE]: {
    name: 'My New Mode',
    description: 'Description here'
}
```

3. Implement logic in `effects/clickEffects/ClickSnake.js`

## 🎨 Why This Structure?

**Before:**
- Everything mixed together
- Magic strings everywhere
- Unclear where to change things

**After:**
- Defaults in ONE place
- Type-safe enums
- Clear separation
- Easy to find things

## ⚡ Pro Tips

1. **Use enums!** `Z_MODES.WAVE` not `'wave'`
2. **One file per concern** - defaults vs constants vs logic
3. **Import what you need** - Tree-shaking friendly
4. **Check constants first** - See all options before changing

---

**This folder makes UI configuration STUPID EASY!** 🎉

