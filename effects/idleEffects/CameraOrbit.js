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

