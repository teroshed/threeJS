# 🎨 Cube Outline Solutions

## The Problem

WebGL's `linewidth` property is **not supported** by most browsers!

From the Three.js docs:
> "Due to limitations of the OpenGL Core Profile with the WebGL renderer on most platforms, linewidth will always be 1 regardless of the set value."

### Why Your Change Didn't Work

```javascript
// ❌ This does NOTHING in most browsers!
linewidth: 10  // Browser ignores this, always uses 1
```

**Console shows:** `outlineWidth: 10` ✅ (config is loading correctly)
**Visual result:** No change ❌ (browser ignores linewidth)

---

## Solutions

### Option 1: 🎯 **Use Line2 / LineSegments2** (BEST QUALITY)

Three.js provides a special line renderer that supports width:

```javascript
// Install if needed: npm install three/examples/jsm/lines/Line2
import { Line2 } from 'three/examples/jsm/lines/Line2.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry.js';

// In createCube()
const edges = new THREE.EdgesGeometry(geometry);
const positions = edges.attributes.position.array;

const lineGeometry = new LineSegmentsGeometry();
lineGeometry.setPositions(positions);

const lineMaterial = new LineMaterial({
    color: this.outlineColor,
    linewidth: this.outlineWidth / 1000, // In world units, need to scale
    resolution: new THREE.Vector2(window.innerWidth, window.innerHeight)
});

const outline = new Line2(lineGeometry, lineMaterial);
cube.add(outline);
```

**Pros:**
- ✅ Actually respects line width!
- ✅ Smooth, high-quality lines
- ✅ Antialiased

**Cons:**
- ⚠️ More complex setup
- ⚠️ Requires additional imports
- ⚠️ Slightly more expensive performance-wise

---

### Option 2: 🔲 **Use Thicker Geometry** (SIMPLEST)

Create actual geometry for the outlines instead of lines:

```javascript
// Instead of LineSegments, use TubeGeometry or BoxGeometry for edges
const edgesMesh = new THREE.Mesh(
    new THREE.BoxGeometry(
        size * 1.01,  // Slightly larger
        size * 1.01,
        size * 1.01
    ),
    new THREE.MeshBasicMaterial({
        color: this.outlineColor,
        transparent: true,
        opacity: 0.3,
        side: THREE.BackSide  // Only show back faces
    })
);
cube.add(edgesMesh);
```

**Pros:**
- ✅ Simple to implement
- ✅ Works everywhere
- ✅ Can control thickness easily

**Cons:**
- ⚠️ Not as crisp as real lines
- ⚠️ Slight performance overhead

---

### Option 3: 🌟 **Use Custom Shader** (MOST CONTROL)

Write a custom shader to render outlines:

```javascript
const outlineMaterial = new THREE.ShaderMaterial({
    vertexShader: `
        uniform float outlineWidth;
        void main() {
            vec3 newPosition = position + normal * outlineWidth;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
    `,
    fragmentShader: `
        uniform vec3 outlineColor;
        void main() {
            gl_FragColor = vec4(outlineColor, 1.0);
        }
    `,
    uniforms: {
        outlineWidth: { value: this.outlineWidth / 100 },
        outlineColor: { value: new THREE.Color(this.outlineColor) }
    },
    side: THREE.BackSide
});

const outlineMesh = new THREE.Mesh(geometry, outlineMaterial);
cube.add(outlineMesh);
```

**Pros:**
- ✅ Maximum control
- ✅ Can make outlines glow, pulse, etc.
- ✅ Good performance

**Cons:**
- ⚠️ Requires GLSL knowledge
- ⚠️ More complex to maintain

---

### Option 4: 🎨 **Just Change Opacity** (CURRENT - WORKS!)

Since `linewidth` doesn't work, focus on what DOES work:

```javascript
// In GlobalConfig.js
outlineOpacity: 0.1,   // Make barely visible
outlineOpacity: 1.0,   // Make very prominent
outlineColor: 0xffffff, // Change to white
outlineColor: 0xff0000, // Change to red
```

**Pros:**
- ✅ Works RIGHT NOW with no code changes!
- ✅ Opacity IS respected by browsers
- ✅ Color changes work

**Cons:**
- ❌ Lines are always thin (1px)

---

### Option 5: 🎯 **Vertex Markers** (IMPLEMENTED! ✅)

Add small spheres or cubes at each vertex of the cube:

```javascript
// effects/GlobalConfig.js
useVertexMarkers: true,      // Enable vertex markers
vertexMarkerSize: 0.05,      // Size of markers
vertexMarkerShape: 'sphere', // 'sphere', 'box', or 'none'
```

**Pros:**
- ✅ **Works RIGHT NOW!** No WebGL limitations
- ✅ Actually visible and configurable
- ✅ Size is fully controllable
- ✅ Adds visual interest and style
- ✅ Scales with cube transformations

**Cons:**
- ⚠️ Adds 8 extra objects per cube (one per corner)
- ⚠️ Slight performance overhead for many cubes

---

## My Recommendation

### ✅ **CURRENT SOLUTION: Vertex Markers**
We've implemented **Option 5** - small shapes at each corner that are actually visible!

Try these settings in `effects/GlobalConfig.js`:

```javascript
// Subtle markers
vertexMarkerSize: 0.03,
vertexMarkerShape: 'sphere',
outlineOpacity: 0.8,

// Bold markers
vertexMarkerSize: 0.1,
vertexMarkerShape: 'box',
outlineOpacity: 1.0,

// Disable markers
useVertexMarkers: false,
```

### For Best Quality (LATER):
Implement **Option 1** (Line2) - it's the proper way to get thick lines in Three.js.

### For Best Performance (LATER):
Implement **Option 3** (Custom Shader) - gives you full control and effects.

---

## Quick Test

Try changing these in `GlobalConfig.js` and see INSTANT results:

```javascript
const GLOBAL_CONFIG = {
    // These WORK:
    outlineOpacity: 0.9,      // ✅ Try 0.1 vs 1.0
    outlineColor: 0xff00ff,   // ✅ Try different colors
    
    // This DOESN'T work in most browsers:
    outlineWidth: 10,         // ❌ Ignored by WebGL
};
```

---

## Browser Support Table

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| `linewidth` | ❌ | ❌ | ❌ | ❌ |
| `opacity` | ✅ | ✅ | ✅ | ✅ |
| `color` | ✅ | ✅ | ✅ | ✅ |
| Line2 | ✅ | ✅ | ✅ | ✅ |
| Shaders | ✅ | ✅ | ✅ | ✅ |

---

*WebGL linewidth limitation is not a bug in our code - it's a platform limitation!*

