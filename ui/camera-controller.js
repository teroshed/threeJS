/**
 * 🎥 CAMERA CONTROLLER
 * 
 * Handles camera controls with right-click rotation and scroll zoom
 */

export class CameraController {
    constructor(camera, renderer) {
        this.camera = camera;
        this.renderer = renderer;
        
        // Camera state
        this.isRotating = false;
        this.lastMouseX = 0;
        this.lastMouseY = 0;
        this.rotationSpeed = 0.005;
        
        // Camera orbit parameters
        this.radius = 10;
        this.theta = 0; // Horizontal angle
        this.phi = Math.PI / 2; // Vertical angle (0 = top, PI = bottom)
        this.minRadius = 2;
        this.maxRadius = 50;
        this.zoomSpeed = 0.3; // Increased from 0.1 for faster zoom
        
        // Clamp phi to prevent camera flipping
        this.minPhi = 0.1;
        this.maxPhi = Math.PI - 0.1;
        
        this.setupEventListeners();
        this.updateCameraPosition();
    }
    
    setupEventListeners() {
        const canvas = this.renderer.domElement;
        
        // Disable right-click context menu
        canvas.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
        
        // Right-click drag for camera rotation
        canvas.addEventListener('mousedown', (e) => {
            if (e.button === 2) { // Right mouse button
                e.preventDefault();
                this.isRotating = true;
                this.lastMouseX = e.clientX;
                this.lastMouseY = e.clientY;
                canvas.style.cursor = 'grabbing';
            }
        });
        
        canvas.addEventListener('mousemove', (e) => {
            if (this.isRotating) {
                e.preventDefault();
                const deltaX = e.clientX - this.lastMouseX;
                const deltaY = e.clientY - this.lastMouseY;
                
                // Update angles (inversed movement)
                this.theta += deltaX * this.rotationSpeed; // Changed from -= to +=
                this.phi -= deltaY * this.rotationSpeed; // Changed from += to -=
                
                // Clamp phi to prevent camera flipping
                this.phi = Math.max(this.minPhi, Math.min(this.maxPhi, this.phi));
                
                this.lastMouseX = e.clientX;
                this.lastMouseY = e.clientY;
                
                this.updateCameraPosition();
            }
        });
        
        canvas.addEventListener('mouseup', (e) => {
            if (e.button === 2) { // Right mouse button
                this.isRotating = false;
                canvas.style.cursor = 'grab';
            }
        });
        
        // Mouse wheel for zoom (smoother with easing)
        canvas.addEventListener('wheel', (e) => {
            e.preventDefault();
            
            const delta = e.deltaY > 0 ? 1 : -1;
            const zoomAmount = delta * this.zoomSpeed * (1 + Math.abs(delta) * 0.5); // Accelerated zoom
            this.radius += zoomAmount;
            this.radius = Math.max(this.minRadius, Math.min(this.maxRadius, this.radius));
            
            this.updateCameraPosition();
        });
        
        // Set initial cursor
        canvas.style.cursor = 'grab';
    }
    
    updateCameraPosition() {
        // Convert spherical coordinates to Cartesian
        const x = this.radius * Math.sin(this.phi) * Math.cos(this.theta);
        const y = this.radius * Math.cos(this.phi);
        const z = this.radius * Math.sin(this.phi) * Math.sin(this.theta);
        
        // Update camera position
        this.camera.position.set(x, y, z);
        this.camera.lookAt(0, 0, 0);
        
        // Update camera matrix
        this.camera.updateMatrixWorld();
    }
    
    // Method to reset camera to default position
    resetCamera() {
        this.radius = 10;
        this.theta = 0;
        this.phi = Math.PI / 2;
        this.updateCameraPosition();
    }
    
    // Method to set camera position programmatically
    setCameraPosition(radius, theta, phi) {
        this.radius = radius;
        this.theta = theta;
        this.phi = phi;
        this.updateCameraPosition();
    }
}

