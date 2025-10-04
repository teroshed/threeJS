import { IdleEffect } from './IdleEffect.js';
import * as THREE from 'three';

export default class Kaleidoscope extends IdleEffect {
    constructor(maxCubes, cubeSize, cubeSpawnRate, cubeFadeRate, cubeRandomColor, rotationSpeed, spawnBounds) {
        console.log('🌀 Kaleidoscope constructor called with params:', { maxCubes, cubeSize, cubeSpawnRate, cubeFadeRate, cubeRandomColor, rotationSpeed, spawnBounds });
        super(maxCubes, cubeSize, cubeSpawnRate, cubeFadeRate, cubeRandomColor, rotationSpeed, spawnBounds);
        
        // Set the name property for EffectsManager lookup
        this.name = "Kaleidoscope";
        
        // Kaleidoscope-specific properties
        this.segments = 12; // Number of symmetry segments
        this.baseRadius = 2.0; // Base radius for the kaleidoscope
        this.frequencyBins = 120; // Number of frequency bins to sample
        this.lineWidth = 2.0; // Line width for the kaleidoscope lines
        this.hueOffset = 0; // Hue rotation offset
        this.mirrorAlpha = 0.7; // Alpha for mirrored segments
        
        // Audio analysis properties
        this.audioAnalyzer = null;
        
        // Create kaleidoscope geometry
        this.createKaleidoscopeGeometry();
        
        console.log('🌀 Kaleidoscope constructor completed, name:', this.name, 'mesh created:', !!this.kaleidoscopeMesh);
    }

    createKaleidoscopeGeometry() {
        // Create a plane geometry for the kaleidoscope pattern
        this.kaleidoscopeGeometry = new THREE.PlaneGeometry(8, 8);
        
        // Create the beautiful audio-responsive shader material
        this.kaleidoscopeMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0.0 },
                segments: { value: this.segments },
                baseRadius: { value: this.baseRadius },
                hueOffset: { value: this.hueOffset },
                frequencyData: { value: new Float32Array(120) },
                bassLevel: { value: 0.0 },
                midLevel: { value: 0.0 },
                highLevel: { value: 0.0 },
                beatIntensity: { value: 0.0 }
            },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float time;
                uniform int segments;
                uniform float baseRadius;
                uniform float hueOffset;
                uniform float frequencyData[120];
                uniform float bassLevel;
                uniform float midLevel;
                uniform float highLevel;
                uniform float beatIntensity;
                
                varying vec2 vUv;
                
                // Convert HSV to RGB
                vec3 hsv2rgb(vec3 c) {
                    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
                    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
                    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
                }
                
                // Get frequency value at angle
                float getFrequencyAtAngle(float angle) {
                    int bin = int(angle * float(frequencyData.length()) / (2.0 * 3.14159));
                    bin = clamp(bin, 0, frequencyData.length() - 1);
                    return frequencyData[bin];
                }
                
                void main() {
                    vec2 center = vec2(0.5, 0.5);
                    vec2 pos = vUv - center;
                    
                    // Convert to polar coordinates
                    float r = length(pos);
                    float angle = atan(pos.y, pos.x);
                    
                    // Normalize angle to [0, 2π]
                    if (angle < 0.0) angle += 2.0 * 3.14159;
                    
                    // Calculate segment angle
                    float segmentAngle = 2.0 * 3.14159 / float(segments);
                    float segment = floor(angle / segmentAngle);
                    
                    // Mirror angle within segment
                    float mirroredAngle = mod(angle, segmentAngle);
                    if (mirroredAngle > segmentAngle * 0.5) {
                        mirroredAngle = segmentAngle - mirroredAngle;
                    }
                    
                    // Normalize mirrored angle to [0, 1] for frequency sampling
                    float normalizedAngle = mirroredAngle / (segmentAngle * 0.5);
                    
                    // Get frequency data
                    float freq = getFrequencyAtAngle(normalizedAngle * 3.14159);
                    
                    // Calculate radius with audio response
                    float audioRadius = baseRadius * (0.25 + 0.12 * bassLevel + 0.08 * midLevel);
                    float radius = r * 2.0; // Scale to match our coordinate system
                    
                    // Create kaleidoscope pattern
                    float pattern = 0.0;
                    
                    // Main radial lines
                    float radialFreq = freq * (1.0 + highLevel * 2.5);
                    float radialPattern = sin(radius * 20.0 + time * 2.0) * radialFreq;
                    
                    // Beat response
                    float beatResponse = beatIntensity * 0.5;
                    
                    // Combine patterns
                    pattern = radialPattern + beatResponse;
                    
                    // Add some geometric patterns
                    float geometric = sin(radius * 15.0 + time * 1.5) * 0.3;
                    pattern += geometric;
                    
                    // Color based on segment and audio
                    float hue = (hueOffset + segment * 360.0 / float(segments)) / 360.0;
                    float saturation = 1.0;
                    float value = 0.6 + highLevel * 0.4;
                    
                    // Add audio-responsive color changes
                    hue += bassLevel * 0.1;
                    saturation += midLevel * 0.3;
                    value += highLevel * 0.2;
                    
                    vec3 color = hsv2rgb(vec3(hue, saturation, value));
                    
                    // Apply pattern as alpha
                    float alpha = pattern * 0.5 + 0.5;
                    alpha = clamp(alpha, 0.0, 1.0);
                    
                    // Add some glow effect
                    float glow = exp(-radius * 2.0) * (0.3 + highLevel * 0.4);
                    alpha += glow;
                    
                    gl_FragColor = vec4(color, alpha);
                }
            `,
            transparent: true,
            side: THREE.DoubleSide
        });
        
        // Create mesh
        this.kaleidoscopeMesh = new THREE.Mesh(this.kaleidoscopeGeometry, this.kaleidoscopeMaterial);
        this.kaleidoscopeMesh.position.set(0, 0, -5); // Move it in front of camera
        this.kaleidoscopeMesh.rotation.x = 0; // Face the camera directly
        
        console.log('🌀 Kaleidoscope mesh created with audio-responsive shader:', this.kaleidoscopeMesh);
    }

    setActive(active) {
        console.log('🌀 Kaleidoscope setActive called:', active);
        super.setActive(active);
        if (active && this.kaleidoscopeMesh && this.scene) {
            console.log('🌀 Adding kaleidoscope mesh to scene');
            this.scene.add(this.kaleidoscopeMesh);
        } else if (this.kaleidoscopeMesh && this.scene) {
            console.log('🌀 Removing kaleidoscope mesh from scene');
            this.scene.remove(this.kaleidoscopeMesh);
        } else {
            console.log('🌀 Scene not available yet, will add in update method');
        }
    }

    update(camera, scene, mouse) {
        super.update(camera, scene, mouse);
        
        console.log('🌀 Kaleidoscope update called - active:', this.active, 'mesh:', !!this.kaleidoscopeMesh, 'scene:', !!scene);
        
        if (!this.active || !this.kaleidoscopeMesh) {
            console.log('🌀 Kaleidoscope update early return - active:', this.active, 'mesh:', !!this.kaleidoscopeMesh);
            return;
        }
        
        // If we're active but not in the scene yet, add us now
        if (this.active && this.kaleidoscopeMesh && scene && !this.kaleidoscopeMesh.parent) {
            console.log('🌀 Adding kaleidoscope mesh to scene in update method');
            scene.add(this.kaleidoscopeMesh);
            console.log('🌀 Kaleidoscope mesh added to scene, parent:', this.kaleidoscopeMesh.parent);
            console.log('🌀 Scene children count:', scene.children.length);
        }
        
        // Debug: Check if mesh is in scene
        if (this.kaleidoscopeMesh && this.kaleidoscopeMesh.parent) {
            console.log('🌀 Kaleidoscope mesh is in scene, position:', this.kaleidoscopeMesh.position);
        }
        
        // Update time uniform (only if we have the shader material)
        if (this.kaleidoscopeMaterial && this.kaleidoscopeMaterial.uniforms && this.kaleidoscopeMaterial.uniforms.time) {
            this.kaleidoscopeMaterial.uniforms.time.value = performance.now() * 0.001;
        }
        
        // Update audio analysis if available (only if we have shader material)
        if (this.audioAnalyzer && this.kaleidoscopeMaterial && this.kaleidoscopeMaterial.uniforms) {
            const beat = this.audioAnalyzer.getBeat();
            const volume = this.audioAnalyzer.getVolumeLevel();
            const bass = this.audioAnalyzer.getBassLevel();
            const treble = this.audioAnalyzer.getTrebleLevel();
            
            // Update uniforms
            if (this.kaleidoscopeMaterial.uniforms.bassLevel) this.kaleidoscopeMaterial.uniforms.bassLevel.value = bass;
            if (this.kaleidoscopeMaterial.uniforms.midLevel) this.kaleidoscopeMaterial.uniforms.midLevel.value = volume;
            if (this.kaleidoscopeMaterial.uniforms.highLevel) this.kaleidoscopeMaterial.uniforms.highLevel.value = treble;
            if (this.kaleidoscopeMaterial.uniforms.beatIntensity) this.kaleidoscopeMaterial.uniforms.beatIntensity.value = beat.isBeat ? beat.intensity || 1.0 : 0.0;
            
            // Update frequency data
            const frequencyData = this.audioAnalyzer.getFrequencyData();
            if (frequencyData && this.kaleidoscopeMaterial.uniforms.frequencyData) {
                const uniformArray = this.kaleidoscopeMaterial.uniforms.frequencyData.value;
                const step = Math.max(1, Math.floor(frequencyData.length / this.frequencyBins));
                
                for (let i = 0; i < this.frequencyBins; i++) {
                    const index = Math.min(i * step, frequencyData.length - 1);
                    uniformArray[i] = frequencyData[index] / 255.0;
                }
            }
            
            // Rotate hue over time
            this.hueOffset = (this.hueOffset + (36 + volume * 120 + treble * 200) * 0.016) % 360;
            if (this.kaleidoscopeMaterial.uniforms.hueOffset) this.kaleidoscopeMaterial.uniforms.hueOffset.value = this.hueOffset;
        }
        
        // Rotate the kaleidoscope slowly
        this.kaleidoscopeMesh.rotation.z += 0.001;
    }

    setAudioAnalyzer(audioAnalyzer) {
        this.audioAnalyzer = audioAnalyzer;
    }

    // Method to update kaleidoscope settings
    setSegments(segments) {
        this.segments = Math.max(4, Math.min(64, segments));
        this.kaleidoscopeMaterial.uniforms.segments.value = this.segments;
    }

    setBaseRadius(radius) {
        this.baseRadius = Math.max(0.5, Math.min(5.0, radius));
        this.kaleidoscopeMaterial.uniforms.baseRadius.value = this.baseRadius;
    }

    setLineWidth(width) {
        this.lineWidth = Math.max(0.5, Math.min(10.0, width));
    }
}
