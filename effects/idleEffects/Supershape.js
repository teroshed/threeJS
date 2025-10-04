/**
 * 🌟 SUPERSHAPE IDLE EFFECT
 * 
 * Creates 3D superformula shapes that respond to audio
 * Based on the superformula: r = (|cos(m*φ/4)/a|^n2 + |sin(m*φ/4)/b|^n3)^(-1/n1)
 */

import * as THREE from 'three';
import { IdleEffect } from './IdleEffect.js';

export default class Supershape extends IdleEffect {
    constructor(maxCubes, cubeSize, cubeSpawnRate, cubeFadeRate, cubeRandomColor, rotationSpeed, spawnBounds) {
        console.log('🌟 Supershape constructor called with params:', { maxCubes, cubeSize, cubeSpawnRate, cubeFadeRate, cubeRandomColor, rotationSpeed, spawnBounds });
        super(maxCubes, cubeSize, cubeSpawnRate, cubeFadeRate, cubeRandomColor, rotationSpeed, spawnBounds);
        this.name = "Supershape";
        
        // Supershape-specific properties
        this.segments = 12; // Number of symmetry segments
        this.baseRadius = 2.0; // Base radius for the supershape
        this.frequencyBins = 120; // Number of frequency bins to sample
        this.lineWidth = 2.0; // Line width for the supershape lines
        this.mirrorAlpha = 0.7; // Alpha for mirrored segments
        
        // Superformula parameters
        this.m = 6; // Symmetry parameter
        this.a = 1; // First scaling parameter
        this.b = 1; // Second scaling parameter
        this.n1 = 0.5; // First shape parameter
        this.n2 = 0.5; // Second shape parameter
        this.n3 = 0.5; // Third shape parameter
        
        // Animation properties
        this.time = 0;
        this.hueOffset = 0;
        
        // Create the supershape geometry
        this.createSupershapeGeometry();
        
        console.log('🌟 Supershape constructor completed, name:', this.name, 'mesh created:', !!this.supershapeMesh);
    }
    
    createSupershapeGeometry() {
        // Create a plane geometry for the supershape pattern
        this.supershapeGeometry = new THREE.PlaneGeometry(8, 8);
        
        // Create the beautiful audio-responsive shader material
        this.supershapeMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0.0 },
                segments: { value: this.segments },
                baseRadius: { value: this.baseRadius },
                hueOffset: { value: this.hueOffset },
                frequencyData: { value: new Float32Array(120) },
                bassLevel: { value: 0.0 },
                midLevel: { value: 0.0 },
                highLevel: { value: 0.0 },
                beatIntensity: { value: 0.0 },
                m: { value: this.m },
                a: { value: this.a },
                b: { value: this.b },
                n1: { value: this.n1 },
                n2: { value: this.n2 },
                n3: { value: this.n3 }
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
                uniform float m;
                uniform float a;
                uniform float b;
                uniform float n1;
                uniform float n2;
                uniform float n3;
                
                varying vec2 vUv;
                
                // Convert HSV to RGB
                vec3 hsv2rgb(vec3 c) {
                    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
                    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
                    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
                }
                
                // Superformula function
                float superformula(float phi, float m, float a, float b, float n1, float n2, float n3) {
                    float r1 = pow(abs(cos(m * phi / 4.0) / a), n2);
                    float r2 = pow(abs(sin(m * phi / 4.0) / b), n3);
                    return pow(r1 + r2, -1.0 / n1);
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
                    float phi = atan(pos.y, pos.x);
                    
                    // Normalize angle to [0, 2π]
                    if (phi < 0.0) phi += 2.0 * 3.14159;
                    
                    // Calculate superformula radius
                    float superRadius = superformula(phi, m, a, b, n1, n2, n3);
                    
                    // Scale radius with audio response
                    float audioRadius = baseRadius * (0.3 + 0.2 * bassLevel + 0.1 * midLevel);
                    superRadius *= audioRadius;
                    
                    // Get frequency data for this angle
                    float freq = getFrequencyAtAngle(phi);
                    
                    // Create supershape pattern
                    float pattern = 0.0;
                    
                    // Main supershape boundary
                    float boundary = step(r * 2.0, superRadius);
                    
                    // Add frequency-based modulation
                    float freqMod = freq * (1.0 + highLevel * 2.0);
                    float modulatedRadius = superRadius * (1.0 + freqMod * 0.3);
                    
                    // Beat response
                    float beatResponse = beatIntensity * 0.8;
                    modulatedRadius += beatResponse;
                    
                    // Create the supershape
                    float supershape = step(r * 2.0, modulatedRadius);
                    
                    // Add some geometric patterns inside
                    float innerPattern = sin(r * 20.0 + time * 2.0) * 0.3;
                    innerPattern += sin(phi * 8.0 + time * 1.5) * 0.2;
                    
                    // Combine patterns
                    pattern = supershape + innerPattern * supershape;
                    
                    // Color based on angle and audio
                    float hue = (hueOffset + phi * 180.0 / 3.14159) / 360.0;
                    float saturation = 0.8 + midLevel * 0.2;
                    float value = 0.6 + highLevel * 0.4;
                    
                    // Add audio-responsive color changes
                    hue += bassLevel * 0.1;
                    saturation += midLevel * 0.3;
                    value += highLevel * 0.2;
                    
                    vec3 color = hsv2rgb(vec3(hue, saturation, value));
                    
                    // Apply pattern as alpha
                    float alpha = pattern * 0.8 + 0.2;
                    alpha = clamp(alpha, 0.0, 1.0);
                    
                    // Add some glow effect
                    float glow = exp(-r * 3.0) * (0.4 + highLevel * 0.3);
                    alpha += glow;
                    
                    gl_FragColor = vec4(color, alpha);
                }
            `,
            transparent: true,
            side: THREE.DoubleSide
        });
        
        // Create mesh
        this.supershapeMesh = new THREE.Mesh(this.supershapeGeometry, this.supershapeMaterial);
        this.supershapeMesh.position.set(0, 0, -3); // Position it in front of camera
        this.supershapeMesh.rotation.x = 0; // Face the camera directly
        
        console.log('🌟 Supershape mesh created with audio-responsive shader:', this.supershapeMesh);
    }
    
    setActive(active) {
        console.log('🌟 Supershape setActive called:', active);
        super.setActive(active);
        if (active && this.supershapeMesh && this.scene) {
            console.log('🌟 Adding supershape mesh to scene');
            this.scene.add(this.supershapeMesh);
        } else if (this.supershapeMesh && this.scene) {
            console.log('🌟 Removing supershape mesh from scene');
            this.scene.remove(this.supershapeMesh);
        } else {
            console.log('🌟 Scene not available yet, will add in update method');
        }
    }
    
    update(camera, scene, mouse) {
        super.update(camera, scene, mouse);
        console.log('🌟 Supershape update called - active:', this.active, 'mesh:', !!this.supershapeMesh, 'scene:', !!scene);
        
        if (!this.active || !this.supershapeMesh) {
            console.log('🌟 Supershape update early return - active:', this.active, 'mesh:', !!this.supershapeMesh);
            return;
        }
        
        // Add mesh to scene if not already added
        if (this.active && this.supershapeMesh && scene && !this.supershapeMesh.parent) {
            console.log('🌟 Adding supershape mesh to scene in update method');
            scene.add(this.supershapeMesh);
            console.log('🌟 Supershape mesh added to scene, parent:', this.supershapeMesh.parent);
            console.log('🌟 Scene children count:', scene.children.length);
        }
        
        // Update time for animation
        this.time += 0.016; // Assuming 60fps
        
        // Update shader uniforms if material exists
        if (this.supershapeMaterial && this.supershapeMaterial.uniforms) {
            this.supershapeMaterial.uniforms.time.value = this.time;
            this.supershapeMaterial.uniforms.hueOffset.value = this.time * 0.1;
            
            // Update audio data if audio analyzer is available
            if (this.audioAnalyzer) {
                const frequencyData = this.audioAnalyzer.getFrequencyData();
                if (frequencyData && this.supershapeMaterial.uniforms.frequencyData) {
                    this.supershapeMaterial.uniforms.frequencyData.value = frequencyData;
                }
                
                this.supershapeMaterial.uniforms.bassLevel.value = this.audioAnalyzer.getBassLevel();
                this.supershapeMaterial.uniforms.midLevel.value = this.audioAnalyzer.getVolumeLevel(); // Use volume as mid-level
                this.supershapeMaterial.uniforms.highLevel.value = this.audioAnalyzer.getTrebleLevel();
                
                const beat = this.audioAnalyzer.getBeat();
                this.supershapeMaterial.uniforms.beatIntensity.value = beat.isBeat ? beat.intensity || 1 : 0;
            }
        }
        
        // Rotate the supershape
        if (this.supershapeMesh) {
            this.supershapeMesh.rotation.z += this.rotationSpeed;
        }
    }
    
    setAudioAnalyzer(audioAnalyzer) {
        this.audioAnalyzer = audioAnalyzer;
        console.log('🎵 Audio analyzer set for Supershape');
    }
}
