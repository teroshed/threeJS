import { IdleEffect } from "./IdleEffect.js";

/**
 * 🔄 Camera Orbit Effect
 * Rotates the camera around the scene origin
 */
class CameraOrbit extends IdleEffect {

    constructor(params) {
        super();

        this.name = "CameraOrbit";
        this.active = false;

        // Configuration
        this.radius = params.radius || 10;              // Distance from origin
        this.speed = params.speed || 0.005;             // Rotation speed
        this.direction = params.direction || 1;         // 1 = clockwise, -1 = counter-clockwise
        this.height = params.height || 0;               // Y position offset
        this.tilt = params.tilt || 0;                   // Camera tilt angle (0-90)

        // Internal state
        this.angle = 0;
    }

    update(camera, scene, mouse) {
        super.update(camera, scene, mouse);

        // Apply beat-responsive camera effects
        this.pulseToBeat(camera, scene);

        // Increment rotation angle
        this.angle += this.speed * this.direction;

        // Calculate camera position
        camera.position.x = Math.sin(this.angle) * this.radius;
        camera.position.z = Math.cos(this.angle) * this.radius;
        camera.position.y = this.height;

        // Apply tilt by adjusting lookAt target
        const tiltRadians = (this.tilt * Math.PI) / 180;
        const lookAtY = Math.tan(tiltRadians) * this.radius;
        camera.lookAt(0, lookAtY, 0);
    }

    /**
     * 🎵 PULSE TO BEAT - CameraOrbit Audio Response
     * 
     * Enhanced beat response for CameraOrbit with dynamic camera movement
     * @param {THREE.Camera} camera - The Three.js camera
     * @param {THREE.Scene} scene - The Three.js scene
     */
    pulseToBeat(camera, scene) {
        if (!this.audioAnalyzer) return;

        const beat = this.audioAnalyzer.getBeat();
        const volume = this.audioAnalyzer.getVolumeLevel();
        const bass = this.audioAnalyzer.getBassLevel();
        const treble = this.audioAnalyzer.getTrebleLevel();

        // Beat response - camera shake and speed boost
        if (beat.isBeat) {
            const beatIntensity = Math.min(beat.intensity || 1, 2);
            
            // Camera shake on beat
            const shakeIntensity = beatIntensity * 0.5;
            camera.position.x += (Math.random() - 0.5) * shakeIntensity;
            camera.position.y += (Math.random() - 0.5) * shakeIntensity;
            camera.position.z += (Math.random() - 0.5) * shakeIntensity;
            
            // Speed boost on beat
            this.speed *= (1 + beatIntensity * 0.3);
        }
        
        // Volume response - radius pulsing
        const volumeRadius = this.radius * (1 + volume * 0.3);
        camera.position.x = Math.sin(this.angle) * volumeRadius;
        camera.position.z = Math.cos(this.angle) * volumeRadius;
        
        // Bass response - vertical movement and slower orbit
        if (bass > 0.3) {
            // Vertical bounce
            camera.position.y += Math.sin(Date.now() * 0.01) * bass * 2;
            
            // Slower orbit for bass-heavy sections
            this.speed *= (1 - bass * 0.2);
        }
        
        // Treble response - faster orbit and tilt changes
        if (treble > 0.3) {
            // Faster orbit
            this.speed *= (1 + treble * 0.4);
            
            // Dynamic tilt based on treble
            const trebleTilt = this.tilt + (treble * 20);
            const tiltRadians = (trebleTilt * Math.PI) / 180;
            const lookAtY = Math.tan(tiltRadians) * this.radius;
            camera.lookAt(0, lookAtY, 0);
        }
    }

    // Override clear - camera effect doesn't create objects
    clear() {
        // Reset camera to default position when disabled
        if (this.camera) {
            this.camera.position.set(0, 0, 10);
            this.camera.lookAt(0, 0, 0);
        }
    }
}

export default CameraOrbit;

