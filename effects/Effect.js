import * as THREE from 'three';
import GLOBAL_CONFIG from './GlobalConfig.js';

export class Effect {

    constructor() {
        this.cubeArray = [];
        this.rotationSpeed = 0.02; // Default rotation speed
        this.randomColor = true;
        this.fixedColor = '#ff00ff';
        this.active = false; // Default to inactive
        this.audioAnalyzer = null; // Will be set by EffectsManager
              
        // Outline settings from global config (can be overridden by child classes)
        this.outlineWidth = GLOBAL_CONFIG.outlineWidth;
        this.outlineOpacity = GLOBAL_CONFIG.outlineOpacity;
        this.outlineColor = GLOBAL_CONFIG.outlineColor;
        
        // Vertex marker settings
        this.useVertexMarkers = GLOBAL_CONFIG.useVertexMarkers;
        this.vertexMarkerSize = GLOBAL_CONFIG.vertexMarkerSize;
        this.vertexMarkerShape = GLOBAL_CONFIG.vertexMarkerShape;
        
        // Debug: Log outline settings
        console.log(`✨ Effect initialized with outlineWidth: ${this.outlineWidth}, vertexMarkers: ${this.useVertexMarkers}`);
    }

    setActive(active) {
        this.active = active;
    }

    /**
     * 🎵 Set Audio Analyzer Reference
     * 
     * Called by EffectsManager to provide audio analysis capabilities
     * @param {AudioAnalyzer} audioAnalyzer - The shared audio analyzer instance
     */
    setAudioAnalyzer(audioAnalyzer) {
        this.audioAnalyzer = audioAnalyzer;
        console.log(`🎵 Audio analyzer set for ${this.constructor.name}`);
    }

    update(camera, scene, mouse) {
        this.camera = camera;
        this.scene = scene;
        this.mouse = mouse;

        // Apply rotation to all cubes if rotation is enabled
        if (this.rotationSpeed > 0) {
            this.cubeArray.forEach(cube => {
                cube.rotation.x += this.rotationSpeed;
                cube.rotation.y += this.rotationSpeed;
            });
        }
        
        // Sync vertex marker opacity with parent cube opacity
        this.cubeArray.forEach(cube => {
            const markers = cube.children.filter(child => child.userData.isVertexMarker);
            markers.forEach(marker => {
                if (marker.material && cube.material) {
                    marker.material.opacity = cube.material.opacity * this.outlineOpacity;
                }
            });
        });
    }


    /**
     * 🎵 PULSE TO BEAT - Audio-Responsive Effect
     * 
     * Makes cubes pulse and react to audio beats and frequency data
     * @param {THREE.Scene} scene - The Three.js scene
     */
    pulseToBeat(scene) {
        if (!this.audioAnalyzer || !this.cubeArray) return;

        this.cubeArray.forEach(cube => {
            const beat = this.audioAnalyzer.getBeat();
            const volume = this.audioAnalyzer.getVolumeLevel();
            const bass = this.audioAnalyzer.getBassLevel();
            const treble = this.audioAnalyzer.getTrebleLevel();
            
            // Beat detection (debug logging removed for performance)
            
            // Base scale and opacity
            const baseScale = 1.0;
            const baseOpacity = cube.material.opacity || 0.8;
            
            // Calculate target scale based on audio
            let targetScale = baseScale;
            
            // Beat response - immediate pulse (more sensitive)
            if (beat.isBeat) {
                const beatIntensity = Math.min(beat.intensity || 1, 3); // Cap at 3x, increased from 2x
                targetScale += beatIntensity * 0.8; // Increased from 0.3 to 0.8
                cube.material.opacity = Math.min(baseOpacity * (1 + beatIntensity * 0.8), 1); // Increased from 0.5 to 0.8
                
                // Add more pronounced rotation on beat
                cube.rotation.x += beatIntensity * 0.3; // Increased from 0.1 to 0.3
                cube.rotation.y += beatIntensity * 0.3; // Increased from 0.1 to 0.3
                cube.rotation.z += beatIntensity * 0.2; // Increased from 0.05 to 0.2
            }
            
            // Volume response - continuous scaling (more sensitive)
            targetScale += volume * 0.6; // Increased from 0.3 to 0.6
            
            // Bass response - additional scale (no color changes)
            if (bass > 0.3) {
                targetScale += bass * 0.2; // Scale instead of moving position
            }
            
            // Treble response - rotation only (no color changes)
            if (treble > 0.3) {
                cube.rotation.x += treble * 0.05;
                cube.rotation.z += treble * 0.03;
            }
            
            // Apply smooth scaling to target
            const targetScaleVector = new THREE.Vector3(targetScale, targetScale, targetScale);
            cube.scale.lerp(targetScaleVector, 0.1);
            
            // Smooth opacity based on overall volume
            const targetOpacity = Math.min(baseOpacity * (0.5 + volume * 0.5), 1);
            cube.material.opacity = THREE.MathUtils.lerp(cube.material.opacity, targetOpacity, 0.1);
        });
    }

    /**
     * 🎵 PULSE ALL CUBES TO BEAT
     * 
     * Applies beat response to all cubes in the effect
     */
    pulseAllCubesToBeat() {
        if (!this.audioAnalyzer || !this.cubeArray) return;
        
        this.cubeArray.forEach(cube => {
            this.pulseToBeat(this.scene);
        });
    }

    removeCube(index) {
        if (!this.cubeArray || index < 0 || index >= this.cubeArray.length) {
            return;
        }
        const cube = this.cubeArray[index];
        if (this.scene && cube) {
            this.scene.remove(cube);
        }
        this.cubeArray.splice(index, 1);
    }

    createCube(size, position, color) {
        const geometry = new THREE.BoxGeometry(size, size, size);

        let cubeColor;
        if (this.randomColor) {
            // Use the provided random color
            let r = color & 0xFF;
            let g = (color >> 8) & 0xFF;
            let b = (color >> 16) & 0xFF;
            cubeColor = new THREE.Color(r / 255, g / 255, b / 255);
        } else {
            // Use fixed color
            cubeColor = new THREE.Color(this.fixedColor);
        }

        const material = new THREE.MeshBasicMaterial({
            color: cubeColor, 
            opacity: 1, 
            transparent: true
        });
        
        const cube = new THREE.Mesh(geometry, material);
        cube.position.x = position.x;
        cube.position.y = position.y;
        cube.position.z = position.z;
        
        // Add outline to cube for better visual definition
        const edges = new THREE.EdgesGeometry(geometry);
        const lineMaterial = new THREE.LineBasicMaterial({ 
            color: this.outlineColor,
            transparent: true,
            opacity: this.outlineOpacity,
            linewidth: this.outlineWidth
        });
        const outline = new THREE.LineSegments(edges, lineMaterial);
        outline.userData.isOutline = true; // Tag for identification
        cube.add(outline); // Attach to cube so it follows all transformations
        
        // Add vertex markers (small shapes at corners) for better visibility
        if (this.useVertexMarkers && this.vertexMarkerShape !== 'none') {
            this.addVertexMarkers(cube, geometry, size); // Pass cube size for relative scaling
        }
        
        this.cubeArray.push(cube);
        this.scene.add(cube);
        return cube;
    }

    addVertexMarkers(parentCube, geometry, cubeSize) {
        // Get unique vertices from the geometry
        const positions = geometry.attributes.position;
        const vertices = [];
        
        // Extract unique vertex positions
        for (let i = 0; i < positions.count; i++) {
            vertices.push(new THREE.Vector3(
                positions.getX(i),
                positions.getY(i),
                positions.getZ(i)
            ));
        }
        
        // Calculate marker size relative to cube size
        // This ensures markers scale proportionally with the cube
        const relativeMarkerSize = cubeSize * this.vertexMarkerSize;
        
        // Create marker geometry based on shape
        let markerGeometry;
        if (this.vertexMarkerShape === 'sphere') {
            markerGeometry = new THREE.SphereGeometry(relativeMarkerSize, 8, 8);
        } else if (this.vertexMarkerShape === 'box') {
            markerGeometry = new THREE.BoxGeometry(
                relativeMarkerSize, 
                relativeMarkerSize, 
                relativeMarkerSize
            );
        } else {
            return; // Unknown shape
        }
        
        // Add a marker at each vertex
        vertices.forEach(vertex => {
            // Create NEW material instance for each marker (so opacity can be controlled independently)
            const markerMaterial = new THREE.MeshBasicMaterial({ 
                color: this.outlineColor,
                transparent: true,
                opacity: this.outlineOpacity
            });
            
            const marker = new THREE.Mesh(markerGeometry, markerMaterial);
            marker.position.copy(vertex);
            marker.userData.isVertexMarker = true; // Tag for identification
            parentCube.add(marker); // Attach to parent so it follows transformations
        });
    }

    clear() {
        this.cubeArray.forEach(cube => {
            this.scene.remove(cube);
        });
        this.cubeArray = [];
    }
}
