# 🚀 Three.js Interactive Visualizer

A professional-grade, extensible 3D effects system built with Three.js. Create stunning interactive visual effects with an intuitive real-time control panel.

![Three.js](https://img.shields.io/badge/Three.js-black?style=flat&logo=three.js)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

## ✨ Features

### 🎨 **Built-in Effects**
- **Click Snake** - Paint beautiful fading trails with your cursor
  - Customizable length, size, fade speed, rotation
  - Random or fixed colors
  - Auto-fade mode
- **Random Cubes** *(Coming Soon)* - Ambient idle animation
  - Configurable spawn rate, fade rate, colors

### 🎛️ **Real-time Control Panel**
- Sleek, modern UI with glassmorphism design
- Live parameter adjustment - see changes instantly
- Toggle effects on/off
- Collapsible panel for distraction-free viewing
- Background customization

### 🏗️ **Extensible Architecture**
- Clean OOP design with inheritance
- Single source of truth for configuration
- Easy to add new effects
- Modular and maintainable codebase

## 🎮 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd threeJS

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5173`

### Usage

**Mouse Controls:**
- **Click & Drag** - Paint snake trails
- **Space Bar** - Clear all effects

**UI Controls:**
- Click **⚙️** to show/hide control panel
- Adjust sliders to modify effect parameters in real-time
- Toggle checkboxes to enable/disable effects
- Click **Clear All Effects** to reset the scene

## 🛠️ Development

### Project Structure

```
threeJS/
├── effects/
│   ├── EffectsDefaults.js      # 🌟 Single source of truth for all parameters
│   ├── EffectsManager.js        # Orchestrates all effects
│   ├── Effect.js                # Base effect class
│   ├── clickEffects/
│   │   ├── ClickEffect.js
│   │   └── ClickSnake.js        # Snake trail effect
│   └── idleEffects/
│       ├── IdleEffect.js
│       └── RandomCubes.js       # Ambient cube spawner
├── main.js                      # Application entry point
├── ui-controller.js             # UI ↔ Effects bridge
├── index.html                   # UI structure
├── package.json
└── README.md
```

### Adding New Effects

See [CONFIGURATION.md](./CONFIGURATION.md) for detailed instructions.

**Quick Example:**

1. Create your effect class:
```javascript
// effects/clickEffects/MyEffect.js
import { ClickEffect } from "./ClickEffect.js";

class MyEffect extends ClickEffect {
    constructor(param1, param2) {
        super();
        this.name = "MyEffect";
        this.param1 = param1;
        this.param2 = param2;
    }

    onClick(mouse, camera) {
        // Your effect logic here
    }
}
export default MyEffect;
```

2. Add to `EffectsDefaults.js`:
```javascript
MY_EFFECT: {
    name: "MyEffect",
    class: MyEffect,
    param1: 100,
    param2: 0.5
}
```

3. Register in `EffectsManager.js`:
```javascript
static ON_CLICK_EFFECTS = [
    EFFECTS_DEFAULTS.CLICK_SNAKE,
    EFFECTS_DEFAULTS.MY_EFFECT
];
```

4. Add UI controls (optional) in `index.html` and `ui-controller.js`

**Done!** Your effect is now live and controllable. 🎉

### Modifying Parameters

All effect parameters live in `effects/EffectsDefaults.js`. Change values there and they automatically propagate to:
- ✅ Effect instances
- ✅ UI controls
- ✅ Display values

```javascript
// effects/EffectsDefaults.js
CLICK_SNAKE: {
    maxLength: 200,        // ← Change this
    cubeSize: 1.5,         // ← And this
    rotationSpeed: 0.05    // ← And this
}
// UI and effects update automatically!
```

## 🎨 Customization

### Effect Parameters

| Effect | Parameter | Type | Description |
|--------|-----------|------|-------------|
| **Click Snake** | maxLength | number | Maximum cubes in trail |
| | cubeSize | number | Size of each cube |
| | fadeSpeed | number | How fast cubes fade out |
| | rotationSpeed | number | Cube rotation speed |
| | autoFade | boolean | Enable auto-fading |
| | randomColor | boolean | Random vs fixed colors |
| | fixedColor | string | Color when not random |

### Adding UI Controls

1. Add HTML in `index.html`:
```html
<div class="control-group">
    <div class="control-label">
        <span>Your Parameter</span>
        <span class="control-value" id="yourParamValue">10</span>
    </div>
    <input type="range" id="yourParam" min="0" max="100" value="10">
</div>
```

2. Wire up in `ui-controller.js`:
```javascript
setupRangeControl('yourParam', 'yourParamValue', (value) => {
    updateEffectConfig('EffectName', 'paramName', parseFloat(value));
});
```

## 📚 Documentation

- **[CONFIGURATION.md](./CONFIGURATION.md)** - In-depth configuration guide
- **Code is heavily commented** - Read the source!

## 🏛️ Architecture

### Design Principles

1. **Single Source of Truth** - `EffectsDefaults.js` is the only place to define parameters
2. **Separation of Concerns** - UI, logic, and effects are decoupled
3. **Open/Closed Principle** - Easy to extend, no need to modify core
4. **Inheritance** - Shared functionality in base classes
5. **Configuration over Code** - Parameters drive behavior

### Effect Lifecycle

```
User Interaction
    ↓
EffectsManager.onClickTick()
    ↓
Effect.onClick() → Create cubes
    ↓
Effect.update() → Apply transformations (rotation, fade)
    ↓
Three.js Renderer
```

### Data Flow

```
EffectsDefaults.js
    ↓
    ├→ EffectsManager (initializes effects)
    └→ ui-controller (sets UI values)
        ↓
    User adjusts UI
        ↓
    ui-controller updates effect properties
        ↓
    Changes visible immediately
```

## 🚀 Performance

- **60 FPS** default frame rate
- **Efficient cube management** - Old cubes auto-removed
- **Configurable spawn rates** - Control performance vs visual density
- **WebGL acceleration** - Hardware-accelerated rendering

## 🎯 Roadmap

- [ ] More click effects (spiral, particles, waves)
- [ ] Idle/ambient effects
- [ ] Camera controls (orbit, zoom, pan)
- [ ] Effect presets (save/load configurations)
- [ ] Export animations as GIF/video
- [ ] Post-processing effects (bloom, blur)
- [ ] Mobile touch support
- [ ] Keyboard shortcuts
- [ ] Audio reactivity

## 🤝 Contributing

This is a personal learning project, but ideas and suggestions are welcome!

### Guidelines
1. Follow existing code style
2. Add parameters to `EffectsDefaults.js`
3. Comment your code
4. Test with the UI controls
5. Update README if adding features

## 📝 License

MIT License - Feel free to use this for learning or your own projects!

## 🙏 Acknowledgments

- **Three.js** - Amazing 3D library
- **Vite** - Lightning-fast dev server
- The open-source community for endless inspiration

## 🐛 Known Issues

- None yet! Report issues if you find any.

## 📧 Contact

Built with ❤️ by a passionate developer

---

**Star ⭐ this repo if you found it useful!**

**Happy coding! 🎨✨**

