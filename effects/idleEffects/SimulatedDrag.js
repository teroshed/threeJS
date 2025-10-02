import { IdleEffect } from "./IdleEffect.js";
import * as THREE from 'three';

/**
 * 🎨 SIMULATED DRAG - Autopilot Meta-Effect
 * 
 * This effect simulates mouse dragging by automatically moving a virtual cursor
 * and TRIGGERING ALL ACTIVE DRAG EFFECTS (ClickSnake, DragSpiral, etc.)
 * 
 * It's a meta-effect that drives other effects! 🤯
 */
class SimulatedDrag extends IdleEffect {
    constructor(pattern, speed, trailLength, cubeSize, fadeSpeed, rotationSpeed, randomColor, fixedColor, pathSize) {
        super();
        this.name = "SimulatedDrag";
        this.active = false;
        
        console.log('🎨 SimulatedDrag initialized with pattern:', pattern);
        console.log('🎨 This is a META-EFFECT that triggers all active drag effects!');

        // Pattern settings
        this.pattern = pattern;           // 'circle', 'line', 'spiral', 'figure8', 'random', 'lissajous'
        this.speed = speed;                // How fast the cursor moves
        this.pathSize = pathSize;          // Size/radius of the pattern

        // Animation state
        this.t = 0;                        // Time parameter for animation
        this.virtualCursor = new THREE.Vector2(0, 0);
        this.frameCounter = 0;             // Frame counter for throttling
        this.spawnInterval = 3;            // Spawn cube every N frames
        
        // Reference to EffectsManager (will be set by EffectsManager)
        this.effectsManager = null;
    }

    update(camera, scene, mouse) {
        super.update(camera, scene, mouse);

        if (!this.active) {
            return;
        }

        if (!this.effectsManager) {
            console.warn('⚠️ SimulatedDrag: No effectsManager reference! Cannot trigger drag effects.');
            return;
        }

        // Update time parameter
        this.t += this.speed;

        // Calculate virtual cursor position based on pattern
        this.updateCursorPosition();

        // Throttle triggering (only trigger every N frames)
        this.frameCounter++;
        if (this.frameCounter >= this.spawnInterval) {
            this.frameCounter = 0;
            
            // 🎯 TRIGGER ALL ACTIVE DRAG EFFECTS WITH VIRTUAL CURSOR!
            this.triggerDragEffects(camera);
        }
    }
    
    /**
     * Trigger all active drag effects (ClickSnake, DragSpiral, etc.)
     * with the virtual cursor position
     */
    triggerDragEffects(camera) {
        if (!this.effectsManager) return;
        
        // Call onClick() on all active drag effects
        this.effectsManager.onClickEffects.forEach(effect => {
            if (effect.active && effect !== this) {
                // Pass virtual cursor to the effect
                effect.onClick(this.virtualCursor, camera);
            }
        });
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

}

export default SimulatedDrag;

