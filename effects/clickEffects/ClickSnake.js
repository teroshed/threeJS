import { ClickEffect } from "./ClickEffect.js";
import * as THREE from 'three';

class ClickSnake extends ClickEffect {

    constructor(maxLength, autoFade, cubeSize, fadeSpeed, rotationSpeed, randomColor, fixedColor, zMode, zValue, zVariance, zMin, zMax, planeDistance) {
        super();

        this.name = "ClickSnake";
        this.headPosition = {x: 0, y: 0, z: 0};
        this.active = false;

        this.maxLength = maxLength;
        this.autoFade = autoFade;
        this.cubeSize = cubeSize;
        this.fadeSpeed = fadeSpeed;
        this.rotationSpeed = rotationSpeed;
        this.randomColor = randomColor;
        this.fixedColor = fixedColor;
        
        // Z-position parameters
        this.zMode = zMode;
        this.zValue = zValue;
        this.zVariance = zVariance;
        this.zMin = zMin;
        this.zMax = zMax;
        this.planeDistance = planeDistance || 0;  // Distance of interaction plane from camera
        this.zCounter = 0; // For wave/pulse effects
    }

    /**
     * Calculate Z position based on current mode
     * Clamps to zMin/zMax boundaries
     */
    calculateZ() {
        let z;
        
        switch(this.zMode) {
            case 'set':
                z = this.zValue;
                break;
            
            case 'random':
                z = this.zValue - this.zVariance + Math.random() * (this.zVariance * 2);
                break;
            
            case 'wave':
                // Smooth sine wave pattern
                this.zCounter += 0.3;
                z = this.zValue + Math.sin(this.zCounter) * this.zVariance;
                break;
            
            case 'spiral':
                // Spiral outward
                this.zCounter += 0.2;
                z = this.zValue + Math.sin(this.zCounter * 2) * this.zVariance * (this.zCounter % 10) / 10;
                break;
            
            case 'pulse':
                // Rhythmic pulsing
                this.zCounter += 0.4;
                z = this.zValue + Math.abs(Math.sin(this.zCounter)) * this.zVariance;
                break;
            
            case 'oscillate':
                // Back and forth
                this.zCounter += 0.15;
                const cycle = Math.floor(this.zCounter / Math.PI) % 2;
                z = this.zValue + (cycle ? this.zVariance : -this.zVariance) * Math.sin(this.zCounter);
                break;
            
            default:
                z = this.zValue;
        }

        // Clamp to boundaries
        return Math.max(this.zMin, Math.min(this.zMax, z));
    }

    onClick(mouse, camera) {
        super.onClick(mouse, camera);
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);

        // Create a plane at z=planeDistance, perpendicular to Z axis
        // This creates a simple XY plane at a specific depth
        const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -this.planeDistance);
        const intersectionPoint = new THREE.Vector3();
        
        // Find intersection point
        raycaster.ray.intersectPlane(plane, intersectionPoint);

        const cube = this.createCube(
            this.cubeSize,
            {
                x: intersectionPoint.x, 
                y: intersectionPoint.y, 
                z: this.calculateZ()  // Use dynamic Z calculation with clamping
            }, 
            Math.random() * 0xFFFFFF
        );

        if(this.cubeArray.length >= this.maxLength) {
            this.removeCube(0);
        }
    }

    update(camera, scene, mouse) {
        super.update(camera, scene, mouse);

        // Apply beat-responsive effects to all cubes
        this.pulseToBeat(scene);

        if(this.autoFade) {
            // Iterate backwards to avoid index issues when removing
            for(let i = this.cubeArray.length - 1; i >= 0; i--) {
                const cube = this.cubeArray[i];
                cube.material.opacity -= this.fadeSpeed;
                if(cube.material.opacity <= 0) {
                    this.removeCube(i);
                }
            }
        }
    }

    /**
     * 🎵 PULSE TO BEAT - ClickSnake Audio Response
     * 
     * Enhanced beat response for ClickSnake with trail effects
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
                
                // Scale based on beat intensity and position in trail
                const trailPosition = index / this.cubeArray.length; // 0 to 1
                const scaleMultiplier = 1 + (beatIntensity * 0.3 * (1 - trailPosition * 0.5));
                cube.scale.setScalar(scaleMultiplier);
                
                // Opacity burst on beat (stronger for newer cubes)
                const opacityBoost = beatIntensity * 0.4 * (1 - trailPosition * 0.3);
                cube.material.opacity = Math.min(cube.material.opacity + opacityBoost, 1);
                
                // Add rotation on beat
                cube.rotation.x += beatIntensity * 0.1;
                cube.rotation.y += beatIntensity * 0.1;
                cube.rotation.z += beatIntensity * 0.05;
            }
            
            // Volume response - continuous scaling
            const volumeScale = 1 + (volume * 0.2);
            cube.scale.lerp(new THREE.Vector3(volumeScale, volumeScale, volumeScale), 0.05);
            
            // Bass response - vertical movement only
            if (bass > 0.3) {
                cube.position.y += Math.sin(Date.now() * 0.01 + index * 0.1) * bass * 0.1;
            }
            
            // Treble response - fast rotation only
            if (treble > 0.3) {
                cube.rotation.x += treble * 0.05;
                cube.rotation.z += treble * 0.03;
            }
            
            // Overall volume affects opacity
            const targetOpacity = Math.min(0.7 + volume * 0.3, 1);
            cube.material.opacity = THREE.MathUtils.lerp(cube.material.opacity, targetOpacity, 0.05);
        });
    }

    setActive(active) {
        this.active = active;
    }

    clear() {
        this.cubeArray.forEach(cube => {
            this.scene.remove(cube);
        });
        this.cubeArray = [];
        this.zCounter = 0; // Reset counter when clearing
    }

    removeCube(index) {
        this.scene.remove(this.cubeArray[index]);
        this.cubeArray.splice(index, 1);
    }
}

export default ClickSnake;
