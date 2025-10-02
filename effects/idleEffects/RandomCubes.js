import { IdleEffect } from "./IdleEffect.js";
import * as THREE from 'three';

class RandomCubes extends IdleEffect {

    constructor(maxCubes, cubeSize, cubeSpawnRate, cubeFadeRate, cubeRandomColor, rotationSpeed, spawnBounds) {
        super();

        this.name = "RandomCubes";
        this.maxCubes = maxCubes;
        this.cubeSize = cubeSize;
        this.cubeSpawnRate = cubeSpawnRate;
        this.cubeFadeRate = cubeFadeRate;
        this.cubeRandomColor = cubeRandomColor;
        this.rotationSpeed = rotationSpeed;
        // Sync with base Effect flag so createCube() uses the correct color mode
        this.randomColor = cubeRandomColor;
        this.spawnBounds = spawnBounds || {
            xMin: -20, xMax: 20,
            yMin: -10, yMax: 10,
            zMin: -20, zMax: 20
        };

        this.active = false;
    }

    setActive(active) {
        this.active = active;
        console.log('🎲 RandomCubes setActive:', active);
    }

    update(camera, scene, mouse) {
        super.update(camera, scene, mouse);
        
        // Audio-responsive effects active
        if (!this.active) {
            return;
        }

        // Spawn cubes randomly based on spawn rate
        if (Math.random() < this.cubeSpawnRate) {

            const position = {
                x: this.spawnBounds.xMin + Math.random() * (this.spawnBounds.xMax - this.spawnBounds.xMin), 
                y: this.spawnBounds.yMin + Math.random() * (this.spawnBounds.yMax - this.spawnBounds.yMin), 
                z: this.spawnBounds.zMin + Math.random() * (this.spawnBounds.zMax - this.spawnBounds.zMin)
            };
            
            this.createCube(this.cubeSize, position, Math.random() * 0xFFFFFF);
        }

        // Remove oldest cube if we exceed max
        if (this.cubeArray.length > this.maxCubes) {
            this.removeCube(0);
        }

        // Apply fade effect to all cubes
        this.cubeArray.forEach(cube => {
            cube.material.opacity -= this.cubeFadeRate;
            if (cube.material.opacity <= 0) {
                this.scene.remove(cube);
            }
        });
        

        // Apply beat response to all cubes
        if (this.cubeArray.length > 0) {
            this.cubeArray.forEach(cube => {
                this.pulseToBeat(cube, scene);
            });
        }
        // Remove fully faded cubes
        this.cubeArray = this.cubeArray.filter(cube => cube.material.opacity > 0);
    }


    /**
     * 🎵 PULSE TO BEAT - RandomCubes Audio Response
     * 
     * Enhanced beat response for RandomCubes with frequency-based effects
     * @param {THREE.Mesh} cube - The cube to animate
     * @param {THREE.Scene} scene - The Three.js scene
     */
    pulseToBeat(cube, scene) {
        if (!this.audioAnalyzer || !cube) return;

        const beat = this.audioAnalyzer.getBeat();
        const volume = this.audioAnalyzer.getVolumeLevel();
        const bass = this.audioAnalyzer.getBassLevel();
        const treble = this.audioAnalyzer.getTrebleLevel();
        
        // Debug logging to see what's happening
        if (Math.random() < 0.01) { // Only log 1% of the time to avoid spam
            console.log(`🎵 Audio Debug - Beat: ${beat.isBeat}, Volume: ${volume.toFixed(3)}, Bass: ${bass.toFixed(3)}, Treble: ${treble.toFixed(3)}`);
        }
        
        // Calculate target scale based on audio
        let targetScale = 1.0;
        
        // Beat response - immediate pulse with intensity
        if (beat.isBeat) {
            const beatIntensity = Math.min(beat.intensity || 1, 2);
            targetScale += beatIntensity * 0.3; // Add to target scale instead of setting
            
            // Opacity burst on beat
            cube.material.opacity = Math.min(0.8 + (beatIntensity * 0.2), 1);
            
            // Add rotation on beat (not random, more controlled)
            cube.rotation.x += beatIntensity * 0.1;
            cube.rotation.y += beatIntensity * 0.1;
            cube.rotation.z += beatIntensity * 0.05;
            
            // Color shift on beat
            if (this.randomColor) {
                const beatHue = (Date.now() * 0.001) % 1; // Time-based hue
                const beatColor = new THREE.Color().setHSL(beatHue, 1, 0.7);
                cube.material.color.lerp(beatColor, 0.3);
            }
        }
        
        // Volume response - continuous scaling
        targetScale += volume * 0.2;
        
        // Bass response - additional scale boost and red color (no position changes)
        if (bass > 0.2) {
            targetScale += bass * 0.2; // Scale instead of moving position
            
            // Bass color (red spectrum)
            if (this.randomColor) {
                const bassColor = new THREE.Color().setHSL(0.0, 1, 0.3 + bass * 0.4);
                cube.material.color.lerp(bassColor, 0.1);
            }
        }
        
        // Treble response - fast rotation and blue color
        if (treble > 0.2) {
            cube.rotation.x += treble * 0.05;
            cube.rotation.z += treble * 0.03;
            
            // Treble color (blue spectrum)
            if (this.randomColor) {
                const trebleColor = new THREE.Color().setHSL(0.6, 1, 0.3 + treble * 0.4);
                cube.material.color.lerp(trebleColor, 0.1);
            }
        }
        
        // Apply smooth scaling to target
        const targetScaleVector = new THREE.Vector3(targetScale, targetScale, targetScale);
        cube.scale.lerp(targetScaleVector, 0.1);
        
        // Overall volume affects opacity
        const targetOpacity = Math.min(0.6 + volume * 0.4, 1);
        cube.material.opacity = THREE.MathUtils.lerp(cube.material.opacity, targetOpacity, 0.08);
    }
}

export default RandomCubes;
