# 🎯 Vertex Markers Guide

## What Are Vertex Markers?

Small 3D shapes (spheres or boxes) placed at each corner (vertex) of the cube to make edges more visible.

```
    ● ————————— ●
   /|          /|
  / |         / |
 ●————————— ●  |
 |  ●————————|——●
 | /         | /
 |/          |/
 ●————————— ●

 ● = Vertex Marker (sphere or box)
 ─ = Edge line
```

---

## Configuration

All settings are in `effects/GlobalConfig.js`:

```javascript
const GLOBAL_CONFIG = {
    // Vertex markers (cubes/spheres at corners)
    useVertexMarkers: true,      // Enable/disable markers
    vertexMarkerSize: 0.05,      // Size of each marker
    vertexMarkerShape: 'sphere', // 'sphere', 'box', or 'none'
    
    // These also affect markers:
    outlineColor: 0x000000,      // Color of markers
    outlineOpacity: 0.6,         // Opacity of markers
};
```

---

## Shape Options

### 🔵 **Sphere** (Recommended)
```javascript
vertexMarkerShape: 'sphere'
```
- Smooth, round appearance
- Looks polished and professional
- Good for organic/flowing effects

### 🔲 **Box**
```javascript
vertexMarkerShape: 'box'
```
- Sharp, geometric appearance
- Matches cube aesthetic
- Good for tech/digital effects

### ⚫ **None**
```javascript
vertexMarkerShape: 'none'
// or
useVertexMarkers: false
```
- Disables vertex markers
- Just thin edge lines (WebGL default)

---

## Size Guide

### Subtle (Barely visible dots)
```javascript
vertexMarkerSize: 0.02  // Tiny dots at corners
```
Good for: Minimal style, many cubes

### Normal (Default)
```javascript
vertexMarkerSize: 0.05  // Noticeable but not dominant
```
Good for: Balance between visibility and style

### Bold (Prominent markers)
```javascript
vertexMarkerSize: 0.1   // Large, eye-catching
```
Good for: Emphasis, fewer cubes, artistic style

### Extreme (Very large)
```javascript
vertexMarkerSize: 0.2   // Almost as big as small cubes!
```
Good for: Special effects, transitions

---

## Color Combinations

### High Contrast (Black on colored cubes)
```javascript
outlineColor: 0x000000,    // Black
outlineOpacity: 1.0,       // Fully opaque
```
**Effect:** Sharp, defined edges

### Low Contrast (Subtle)
```javascript
outlineColor: 0xffffff,    // White
outlineOpacity: 0.3,       // Translucent
```
**Effect:** Soft, ethereal look

### Colorful Accents
```javascript
outlineColor: 0xff00ff,    // Magenta
outlineOpacity: 0.8,       // Mostly opaque
```
**Effect:** Vibrant, playful style

---

## Performance Considerations

### How Many Objects?

For a cube with vertex markers:
- 1 main cube mesh
- 1 edge line mesh
- 8 vertex marker meshes
- **Total: 10 objects per cube**

### Performance Impact

| Cubes | Objects | Performance |
|-------|---------|-------------|
| 10    | 100     | ✅ Excellent |
| 50    | 500     | ✅ Very Good |
| 100   | 1000    | ⚠️ Good (may lag on slow devices) |
| 200+  | 2000+   | ❌ May be slow |

### Optimization Tips

1. **Disable for high cube counts:**
```javascript
// In effect constructor
if (this.maxCubes > 100) {
    this.useVertexMarkers = false;
}
```

2. **Use smaller markers:**
```javascript
vertexMarkerSize: 0.03  // Smaller = less geometry
```

3. **Reduce sphere segments:**
```javascript
// In Effect.js addVertexMarkers()
markerGeometry = new THREE.SphereGeometry(
    this.vertexMarkerSize, 
    4, 4  // Lower detail (was 8, 8)
);
```

---

## Examples & Presets

### Preset 1: Minimal Tech
```javascript
useVertexMarkers: true,
vertexMarkerSize: 0.03,
vertexMarkerShape: 'box',
outlineColor: 0x00ffff,    // Cyan
outlineOpacity: 1.0,
```
**Style:** Clean, digital, cyberpunk

### Preset 2: Organic Glow
```javascript
useVertexMarkers: true,
vertexMarkerSize: 0.08,
vertexMarkerShape: 'sphere',
outlineColor: 0xffffff,    // White
outlineOpacity: 0.5,
```
**Style:** Soft, dreamy, ethereal

### Preset 3: Bold Statement
```javascript
useVertexMarkers: true,
vertexMarkerSize: 0.12,
vertexMarkerShape: 'sphere',
outlineColor: 0xff0000,    // Red
outlineOpacity: 1.0,
```
**Style:** Dramatic, eye-catching

### Preset 4: Classic Wireframe
```javascript
useVertexMarkers: false,
outlineColor: 0x000000,    // Black
outlineOpacity: 0.8,
```
**Style:** Traditional, simple

---

## Dynamic Changes

### Change at Runtime

You can modify settings after effects are created:

```javascript
// In your effect or main.js
effectInstance.vertexMarkerSize = 0.1;
effectInstance.useVertexMarkers = false;

// Note: Existing cubes won't update, only new ones
```

### Animate Marker Size

```javascript
// In effect update() method
this.vertexMarkerSize = 0.05 + Math.sin(Date.now() / 1000) * 0.02;
// Creates pulsing effect (0.03 to 0.07)
```

---

## Troubleshooting

### Markers Not Showing
- ✅ Check `useVertexMarkers: true`
- ✅ Check `vertexMarkerShape` is 'sphere' or 'box'
- ✅ Increase `vertexMarkerSize`
- ✅ Check `outlineOpacity` is > 0

### Markers Too Small
```javascript
vertexMarkerSize: 0.1  // Increase this
```

### Too Many Objects (Performance)
```javascript
useVertexMarkers: false  // Disable for high cube counts
```

### Markers Same Color as Cubes
```javascript
outlineColor: 0xffffff  // Use contrasting color
```

---

## Technical Details

### How It Works

1. When `createCube()` is called, it checks `useVertexMarkers`
2. If enabled, calls `addVertexMarkers(cube, geometry)`
3. Extracts all 8 vertex positions from box geometry
4. Creates a small sphere/box at each position
5. Attaches markers to parent cube (inherits all transformations)

### Code Structure

```javascript
createCube() {
    // ... create main cube ...
    // ... add edge lines ...
    
    if (this.useVertexMarkers) {
        this.addVertexMarkers(cube, geometry);
    }
}

addVertexMarkers(parentCube, geometry) {
    // Get 8 corner positions
    // Create marker geometry
    // Place marker at each corner
    // Attach to parent cube
}
```

---

## Future Enhancements

Potential improvements:

- [ ] Per-effect vertex marker overrides
- [ ] Animated marker size (pulse, wave)
- [ ] Gradient colors on markers
- [ ] Different shapes (octahedron, tetrahedron)
- [ ] Glow/bloom effect on markers
- [ ] UI controls for vertex markers
- [ ] Performance monitoring and auto-disable

---

*Vertex markers are a creative solution to WebGL's linewidth limitation!*

