# 🎛️ Effect Configuration Guide

## Single Source of Truth: `EffectsDefaults.js`

All effect parameters are defined in **`effects/EffectsDefaults.js`**. Change values there and they automatically propagate to:
- ✅ EffectsManager (backend logic)
- ✅ UI Controller (control panel)
- ✅ Initial effect instances

## How to Add/Modify Effects

### 1. Change Existing Parameters

Edit `effects/EffectsDefaults.js`:

```javascript
CLICK_SNAKE: {
    name: "ClickSnake",
    class: ClickSnake,
    maxLength: 50,        // ← Change this!
    autoFade: true,
    cubeSize: 0.5,
    fadeSpeed: 0.01,
    rotationSpeed: 0.02,
    randomColor: true,
    fixedColor: '#ff00ff'
}
```

**That's it!** Both the UI and the effect will use the new value.

### 2. Add New Parameters

**Step 1:** Add to `EffectsDefaults.js`:
```javascript
CLICK_SNAKE: {
    // ... existing params
    newParameter: 123
}
```

**Step 2:** Update the effect class constructor:
```javascript
constructor(maxLength, autoFade, ..., newParameter) {
    this.newParameter = newParameter;
}
```

**Step 3:** Add UI controls in `index.html` (optional):
```html
<div class="control-group">
    <div class="control-label">
        <span>New Parameter</span>
        <span class="control-value" id="snakeNewParamValue">123</span>
    </div>
    <input type="range" id="snakeNewParam" min="0" max="1000" value="123">
</div>
```

**Step 4:** Wire it up in `ui-controller.js`:
```javascript
// In initializeUIValues():
setInputValue('snakeNewParam', snakeDefaults.newParameter);
updateValueDisplay('snakeNewParam', snakeDefaults.newParameter);

// In setupEventListeners():
setupRangeControl('snakeNewParam', 'snakeNewParamValue', (value) => {
    updateEffectConfig('ClickSnake', 'newParameter', parseFloat(value));
});
```

### 3. Add a Brand New Effect

**Step 1:** Create the effect class in `effects/clickEffects/` or `effects/idleEffects/`

**Step 2:** Add to `EffectsDefaults.js`:
```javascript
MY_NEW_EFFECT: {
    name: "MyNewEffect",
    class: MyNewEffect,
    param1: value1,
    param2: value2
}
```

**Step 3:** Reference it in `EffectsManager.js`:
```javascript
import MyNewEffect from './clickEffects/MyNewEffect.js';

static ON_CLICK_EFFECTS = [
    EFFECTS_DEFAULTS.CLICK_SNAKE,
    EFFECTS_DEFAULTS.MY_NEW_EFFECT  // ← Add here
];
```

**Step 4:** Add UI section in `index.html` (copy existing pattern)

**Step 5:** Add UI handlers in `ui-controller.js`

## Architecture Benefits

### ✨ Single Source of Truth
- Change one value → Updates everywhere
- No duplicate constants scattered around
- Easy to maintain and understand

### 🔧 Type Safety
- All parameters explicitly named
- Easy to see what each effect accepts
- JSDoc can document expected types

### 🎨 Designer-Friendly
- Non-programmers can tweak values
- Visual results match configuration
- No need to hunt through code

### 🚀 Scalable
- Add effects without touching core logic
- Parameters are self-documenting
- Easy to add/remove features

## File Structure

```
effects/
├── EffectsDefaults.js        ← 🌟 EDIT THIS to change parameters
├── EffectsManager.js          ← References defaults
├── Effect.js                  ← Base class
├── clickEffects/
│   ├── ClickEffect.js
│   └── ClickSnake.js          ← Uses parameters from defaults
└── idleEffects/
    ├── IdleEffect.js
    └── RandomCubes.js         ← Uses parameters from defaults

ui-controller.js               ← Reads defaults for UI
index.html                     ← UI structure
main.js                        ← Initializes everything
```

## Quick Reference

| Want to...                    | Edit this file                |
|-------------------------------|-------------------------------|
| Change effect parameters      | `EffectsDefaults.js`          |
| Add new effect                | Create class + add to defaults|
| Modify UI layout              | `index.html`                  |
| Change UI behavior            | `ui-controller.js`            |
| Add effect logic              | Effect class file             |

## Example: Changing Snake Length

**Before:**
```javascript
// EffectsDefaults.js
CLICK_SNAKE: {
    maxLength: 10,  // Too short!
    ...
}
```

**After:**
```javascript
// EffectsDefaults.js
CLICK_SNAKE: {
    maxLength: 100,  // Much longer trails!
    ...
}
```

**Result:**
- ✅ Effect initializes with maxLength = 100
- ✅ UI slider shows 100 as initial value
- ✅ UI label displays "100"
- ✅ User can still adjust it dynamically

**No other files need to change!** 🎉

## Tips

1. **Keep defaults sensible** - They should look good out of the box
2. **Document units** - Is fadeSpeed in seconds? Percentage?
3. **Use comments** - Explain what each parameter does
4. **Test defaults** - Make sure UI ranges accommodate them
5. **Version control** - Commit `EffectsDefaults.js` to track parameter evolution

---

Happy configuring! 🎨✨

