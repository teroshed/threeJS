import * as THREE from 'three';

export class Effect {

    constructor() {
        this.cubeArray = [];
        this.rotationSpeed = 0.02; // Default rotation speed
        this.randomColor = true;
        this.fixedColor = '#ff00ff';
        this.active = false; // Default to inactive
    }

    setActive(active) {
        this.active = active;
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
        
        // Add black outline to cube for better visual definition
        const edges = new THREE.EdgesGeometry(geometry);
        const lineMaterial = new THREE.LineBasicMaterial({ 
            color: 0x000000,  // Black outline
            transparent: true,
            opacity: 0.6,
            linewidth: 2
        });
        const outline = new THREE.LineSegments(edges, lineMaterial);
        cube.add(outline); // Attach to cube so it follows all transformations
        
        this.cubeArray.push(cube);
        this.scene.add(cube);
        return cube;
    }

    clear() {
        this.cubeArray.forEach(cube => {
            this.scene.remove(cube);
        });
        this.cubeArray = [];
    }
}
