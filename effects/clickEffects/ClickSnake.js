import { ClickEffect } from "./ClickEffect.js";
import * as THREE from 'three';

class ClickSnake extends ClickEffect {

    constructor(maxLength, autoFade, cubeSize, fadeSpeed, rotationSpeed, randomColor, fixedColor, zMode, zValue, zVariance, zMin, zMax) {
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

        // Create a plane at z=0 to intersect with
        const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
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
