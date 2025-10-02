import { ClickEffect } from "./ClickEffect.js";
import * as THREE from 'three';

/**
 * 🌀 DRAG SPIRAL EFFECT
 * 
 * Creates a mesmerizing spiral pattern that follows your drag motion.
 * Cubes spiral outward from the drag path, creating a vortex-like trail.
 * 
 * Features:
 * - Spiral motion using parametric equations
 * - Dynamic rotation based on spiral angle
 * - Size variation for depth effect
 * - Color shifting along the spiral
 * - Smooth interpolation between drag points
 */
class DragSpiral extends ClickEffect {

    constructor(spiralArms, spiralTightness, maxCubes, cubeSize, fadeSpeed, rotationSpeed, randomColor, fixedColor, colorShift, sizeVariation) {
        super();
        
        this.name = "DragSpiral";
        
        // Spiral parameters
        this.spiralArms = spiralArms;           // Number of spiral arms (1-6)
        this.spiralTightness = spiralTightness; // How tight the spiral is (0.1-2.0)
        this.maxCubes = maxCubes;               // Maximum cubes in effect
        this.cubeSize = cubeSize;               // Base cube size
        this.fadeSpeed = fadeSpeed;             // How fast cubes fade
        this.rotationSpeed = rotationSpeed;     // Individual cube rotation
        this.randomColor = randomColor;         // Use random colors
        this.fixedColor = fixedColor;           // Fixed color if not random
        this.colorShift = colorShift;           // Hue shift amount per cube
        this.sizeVariation = sizeVariation;     // Size variation (0-1)
        
        // State tracking
        this.dragPath = [];                     // Store drag positions
        this.spiralAngle = 0;                   // Current spiral rotation
        this.lastDragPoint = null;              // Last mouse position
        this.cubeCounter = 0;                   // Counter for color shifting
        
        console.log(`🌀 DragSpiral initialized: ${spiralArms} arms, tightness ${spiralTightness}`);
    }

    onClick(mouse, camera) {
        super.onClick(mouse, camera);
        
        // Convert mouse position to 3D world space
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);
        
        const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
        const currentPoint = new THREE.Vector3();
        raycaster.ray.intersectPlane(plane, currentPoint);
        
        if (!currentPoint) {
            console.warn('🌀 DragSpiral: No intersection point!');
            return;
        }
        
        // Initialize on first call
        if (!this.lastDragPoint) {
            this.lastDragPoint = currentPoint.clone();
            this.dragPath = [currentPoint.clone()];
            console.log('🌀 DragSpiral: First drag point set');
            return;
        }
        
        // Calculate distance moved
        const distance = currentPoint.distanceTo(this.lastDragPoint);
        
        // Only create cubes if moved enough (prevents overcrowding)
        if (distance > 0.1) {
            this.createSpiralCubes(currentPoint);
            this.lastDragPoint = currentPoint.clone();
            this.dragPath.push(currentPoint.clone());
            
            // Keep path limited
            if (this.dragPath.length > 20) {
                this.dragPath.shift();
            }
        }
    }

    createSpiralCubes(centerPoint) {
        // Create cubes in a spiral pattern around the drag point
        for (let arm = 0; arm < this.spiralArms; arm++) {
            const armAngle = (arm / this.spiralArms) * Math.PI * 2;
            
            // Calculate spiral position using polar coordinates
            const angle = this.spiralAngle + armAngle;
            const radius = this.spiralTightness;
            
            const spiralX = centerPoint.x + Math.cos(angle) * radius;
            const spiralY = centerPoint.y + Math.sin(angle) * radius;
            const spiralZ = centerPoint.z + Math.sin(this.spiralAngle * 2) * 0.5; // Wave motion
            
            // Calculate size with variation
            const sizeVariation = 1 + (Math.random() - 0.5) * this.sizeVariation;
            const finalSize = this.cubeSize * sizeVariation;
            
            // Calculate color
            let finalColor;
            if (this.randomColor) {
                // Shift hue based on position in spiral
                const hue = (this.cubeCounter * this.colorShift) % 360;
                const color = new THREE.Color();
                color.setHSL(hue / 360, 0.8, 0.6);
                finalColor = color.getHex();
            } else {
                finalColor = new THREE.Color(this.fixedColor).getHex();
            }
            
            // Create the cube
            const cube = this.createCube(
                finalSize,
                { x: spiralX, y: spiralY, z: spiralZ },
                finalColor
            );
            
            // Add spiral-specific rotation
            cube.rotation.z = angle;
            
            this.cubeCounter++;
        }
        
        // Increment spiral angle for next iteration
        this.spiralAngle += 0.2;
        
        // Cleanup old cubes
        if (this.cubeArray.length > this.maxCubes) {
            const toRemove = this.cubeArray.length - this.maxCubes;
            for (let i = 0; i < toRemove; i++) {
                this.removeCube(0);
            }
        }
    }

    update(camera, scene, mouse) {
        super.update(camera, scene, mouse);
        
        // Apply beat-responsive effects to all cubes
        this.pulseToBeat(scene);
        
        // Apply fade effect
        this.cubeArray.forEach(cube => {
            cube.material.opacity -= this.fadeSpeed;
            
            // Additional rotation for spiral effect
            if (this.rotationSpeed > 0) {
                cube.rotation.x += this.rotationSpeed;
                cube.rotation.y += this.rotationSpeed;
                cube.rotation.z += this.rotationSpeed * 0.5;
            }
        });
        
        // Remove fully faded cubes
        this.cubeArray = this.cubeArray.filter(cube => {
            if (cube.material.opacity <= 0) {
                this.scene.remove(cube);
                return false;
            }
            return true;
        });
    }

    /**
     * 🎵 PULSE TO BEAT - DragSpiral Audio Response
     * 
     * Enhanced beat response for DragSpiral with spiral-specific effects
     * @param {THREE.Scene} scene - The Three.js scene
     */
    pulseToBeat(scene) {
        if (!this.audioAnalyzer || !this.cubeArray) return;

        const beat = this.audioAnalyzer.getBeat();
        const volume = this.audioAnalyzer.getVolumeLevel();
        const bass = this.audioAnalyzer.getBassLevel();
        const treble = this.audioAnalyzer.getTrebleLevel();

        this.cubeArray.forEach((cube, index) => {
            // Beat response - immediate pulse with intensity
            if (beat.isBeat) {
                const beatIntensity = Math.min(beat.intensity || 1, 2);
                
                // Scale based on beat intensity
                const scaleMultiplier = 1 + (beatIntensity * 0.4);
                cube.scale.setScalar(scaleMultiplier);
                
                // Opacity burst on beat
                cube.material.opacity = Math.min(cube.material.opacity + beatIntensity * 0.3, 1);
                
                // Enhanced spiral rotation on beat
                cube.rotation.x += beatIntensity * 0.2;
                cube.rotation.y += beatIntensity * 0.2;
                cube.rotation.z += beatIntensity * 0.15;
                
                // Color shift on beat
                if (this.randomColor) {
                    const beatHue = (Date.now() * 0.002 + index * 0.1) % 1;
                    const beatColor = new THREE.Color().setHSL(beatHue, 1, 0.7);
                    cube.material.color.lerp(beatColor, 0.4);
                }
            }
            
            // Volume response - continuous scaling
            const volumeScale = 1 + (volume * 0.3);
            cube.scale.lerp(new THREE.Vector3(volumeScale, volumeScale, volumeScale), 0.08);
            
            // Bass response - spiral expansion and red color
            if (bass > 0.2) {
                // Expand spiral radius based on bass
                const bassExpansion = bass * 0.5;
                cube.position.x *= (1 + bassExpansion * 0.1);
                cube.position.y *= (1 + bassExpansion * 0.1);
                
                // Bass color (red spectrum)
                if (this.randomColor) {
                    const bassColor = new THREE.Color().setHSL(0.0, 1, 0.3 + bass * 0.4);
                    cube.material.color.lerp(bassColor, 0.1);
                }
            }
            
            // Treble response - fast rotation and blue color
            if (treble > 0.2) {
                // Enhanced spiral rotation
                cube.rotation.x += treble * 0.1;
                cube.rotation.y += treble * 0.1;
                cube.rotation.z += treble * 0.08;
                
                // Treble color (blue spectrum)
                if (this.randomColor) {
                    const trebleColor = new THREE.Color().setHSL(0.6, 1, 0.3 + treble * 0.4);
                    cube.material.color.lerp(trebleColor, 0.1);
                }
            }
            
            // Overall volume affects opacity
            const targetOpacity = Math.min(0.6 + volume * 0.4, 1);
            cube.material.opacity = THREE.MathUtils.lerp(cube.material.opacity, targetOpacity, 0.06);
        });
    }

    removeCube(index) {
        const cube = this.cubeArray[index];
        if (cube) {
            this.scene.remove(cube);
            this.cubeArray.splice(index, 1);
        }
    }

    clear() {
        super.clear();
        this.dragPath = [];
        this.lastDragPoint = null;
        this.spiralAngle = 0;
        this.cubeCounter = 0;
    }
}

export default DragSpiral;

