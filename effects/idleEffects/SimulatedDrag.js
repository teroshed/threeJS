import { IdleEffect } from "./IdleEffect.js";
import * as THREE from 'three';

/**
 * 🎨 SIMULATED DRAG - Autopilot drawing patterns
 * 
 * This effect simulates mouse dragging by automatically moving a virtual cursor
 * and creating cubes along its path, just like ClickSnake but automated.
 */
class SimulatedDrag extends IdleEffect {
    constructor(pattern, speed, trailLength, cubeSize, fadeSpeed, rotationSpeed, randomColor, fixedColor, pathSize) {
        super();
        this.name = "SimulatedDrag";
        this.active = false;
        
        console.log('🎨 SimulatedDrag initialized with pattern:', pattern);

        // Pattern settings
        this.pattern = pattern;           // 'circle', 'line', 'spiral', 'figure8', 'random', 'lissajous'
        this.speed = speed;                // How fast the cursor moves
        this.trailLength = trailLength;    // Max cubes in trail
        this.pathSize = pathSize;          // Size/radius of the pattern

        // Cube settings
        this.cubeSize = cubeSize;
        this.fadeSpeed = fadeSpeed;
        this.rotationSpeed = rotationSpeed;
        this.randomColor = randomColor;
        this.fixedColor = fixedColor;

        // Animation state
        this.t = 0;                        // Time parameter for animation
        this.virtualCursor = new THREE.Vector2(0, 0);
        this.isDrawing = true;             // Always drawing for this effect
        this.frameCounter = 0;             // Frame counter for throttling
        this.spawnInterval = 3;            // Spawn cube every N frames
    }

    update(camera, scene, mouse) {
        super.update(camera, scene, mouse);

        if (!this.active) {
            return;
        }

        // Update time parameter
        this.t += this.speed;

        // Calculate virtual cursor position based on pattern
        this.updateCursorPosition();

        // Throttle cube creation (only create every N frames)
        this.frameCounter++;
        if (this.frameCounter >= this.spawnInterval) {
            this.frameCounter = 0;
            // Create cube at virtual cursor position
            this.createCubeAtCursor(camera);
        }

        // Manage trail length
        if (this.cubeArray.length > this.trailLength) {
            this.removeCube(0);
        }

        // Apply fade effect
        this.cubeArray.forEach(cube => {
            cube.material.opacity -= this.fadeSpeed;
            if (cube.material.opacity <= 0) {
                this.scene.remove(cube);
            }
        });
        this.cubeArray = this.cubeArray.filter(cube => cube.material.opacity > 0);

        // Apply rotation
        if (this.rotationSpeed > 0) {
            this.cubeArray.forEach(cube => {
                cube.rotation.x += this.rotationSpeed;
                cube.rotation.y += this.rotationSpeed;
            });
        }
    }

    updateCursorPosition() {
        // Normalize size to screen coordinates (-1 to 1 range for raycaster)
        // pathSize is in world units, we need to scale it to normalized device coords
        const normalizedSize = 0.8; // Max 80% of screen

        switch (this.pattern) {
            case 'circle':
                // Simple circular motion
                this.virtualCursor.x = Math.cos(this.t) * normalizedSize;
                this.virtualCursor.y = Math.sin(this.t) * normalizedSize;
                break;

            case 'line':
                // Horizontal line back and forth
                this.virtualCursor.x = Math.sin(this.t) * normalizedSize;
                this.virtualCursor.y = 0;
                break;

            case 'spiral':
                // Spiral outward and inward
                const radius = (Math.sin(this.t * 0.1) * 0.5 + 0.5) * normalizedSize;
                this.virtualCursor.x = Math.cos(this.t) * radius;
                this.virtualCursor.y = Math.sin(this.t) * radius;
                break;

            case 'figure8':
                // Figure-8 / infinity symbol
                this.virtualCursor.x = Math.sin(this.t) * normalizedSize;
                this.virtualCursor.y = Math.sin(this.t * 2) * normalizedSize * 0.5;
                break;

            case 'lissajous':
                // Lissajous curve (3:2 ratio)
                this.virtualCursor.x = Math.sin(this.t * 3) * normalizedSize;
                this.virtualCursor.y = Math.sin(this.t * 2) * normalizedSize;
                break;

            case 'random':
                // Smooth random walk using Perlin-like noise
                this.virtualCursor.x += (Math.random() - 0.5) * this.speed * 2;
                this.virtualCursor.y += (Math.random() - 0.5) * this.speed * 2;
                
                // Clamp to normalized bounds
                this.virtualCursor.x = Math.max(-normalizedSize, Math.min(normalizedSize, this.virtualCursor.x));
                this.virtualCursor.y = Math.max(-normalizedSize, Math.min(normalizedSize, this.virtualCursor.y));
                break;

            default:
                // Default to circle
                this.virtualCursor.x = Math.cos(this.t) * normalizedSize;
                this.virtualCursor.y = Math.sin(this.t) * normalizedSize;
        }
    }

    createCubeAtCursor(camera) {
        // Convert 2D cursor position to 3D world position
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(this.virtualCursor, camera);

        // Create a plane perpendicular to camera view, at a visible distance
        // Place it at z = -5 (or configurable planeDistance)
        const planeDistance = 5; // Distance in front of camera origin
        const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -planeDistance);
        const intersectionPoint = new THREE.Vector3();
        raycaster.ray.intersectPlane(plane, intersectionPoint);

        if (!intersectionPoint) {
            console.warn('⚠️ No intersection point found!');
            return;
        }

        // Create cube at intersection point
        const geometry = new THREE.BoxGeometry(this.cubeSize, this.cubeSize, this.cubeSize);
        
        let finalColor;
        if (this.randomColor) {
            finalColor = Math.random() * 0xFFFFFF;
        } else {
            finalColor = new THREE.Color(this.fixedColor).getHex();
        }

        const material = new THREE.MeshBasicMaterial({ 
            color: finalColor, 
            opacity: 1, 
            transparent: true 
        });
        
        const cube = new THREE.Mesh(geometry, material);
        cube.position.copy(intersectionPoint);
        
        // Add outline/edges to the cube
        const edges = new THREE.EdgesGeometry(geometry);
        const lineMaterial = new THREE.LineBasicMaterial({ 
            color: 0x000000,  // Black outline
            transparent: true,
            opacity: 0.6,
            linewidth: 2
        });
        const outline = new THREE.LineSegments(edges, lineMaterial);
        cube.add(outline); // Attach outline to cube so it follows rotation
        
        this.cubeArray.push(cube);
        this.scene.add(cube);
    }

    removeCube(index) {
        const cube = this.cubeArray[index];
        if (cube) {
            this.scene.remove(cube);
            this.cubeArray.splice(index, 1);
        }
    }
}

export default SimulatedDrag;

