import * as THREE from 'three';

export class Effect {

    update(camera, scene, mouse) {
        this.camera = camera;
        this.scene = scene;
        this.mouse = mouse;
    }

    createCube(size , position, color) {
        const geometry = new THREE.BoxGeometry(size, size, size);

        let r, g, b;
        r = color & 0xFF;
        g = (color >> 8) & 0xFF;
        b = (color >> 16) & 0xFF;
        const material = new THREE.MeshBasicMaterial({color: new THREE.Color(r, g, b), opacity: 1, transparent: true});
        const cube = new THREE.Mesh( geometry, material );
        cube.position.x = position.x;
        cube.position.y = position.y;
        cube.position.z = position.z;
        this.scene.add(cube);
        return cube;
    }
}
