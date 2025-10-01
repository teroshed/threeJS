import { ClickEffect } from "./ClickEffect.js";
import * as THREE from 'three';

class ClickSnake extends ClickEffect {

    constructor(maxLength, autoFade) {
        super();

        this.name = "ClickSnake";
        this.headPosition = {x: 0, y: 0, z: 0};
        this.active = false;
        this.cubeArray = [];

        this.autoFade = autoFade;

        this.maxLength = maxLength;
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

        const cube = super.createCube(0.5,
            {x: intersectionPoint.x, y: intersectionPoint.y, z: intersectionPoint.z - 0.1 + Math.random()*0.2}, 
            Math.random() * 0xFFFFFF
        );

        this.cubeArray.push(cube);

        if(this.cubeArray.length > this.maxLength) {
            this.removeCube(0);
            
        }
    }

    update(camera, scene, mouse) {
        super.update(camera, scene, mouse);

        console.log("Updatte of click snake", this.autoFade);
        if(this.autoFade) {
            console.log("Auto fading");
            this.cubeArray.forEach((cube, index) => {
                console.log("Cube ", index, cube.material.opacity);
                cube.material.opacity -= 0.01;
                if(cube.material.opacity <= 0) {
                    this.removeCube(index);
                }
            });
        }
        
    }

    setActive(active) {
        this.active = active;
    }

    clear() {
        this.cubeArray.forEach(cube => {
            this.scene.remove(cube);
        });
    }

    removeCube(index) {
        this.scene.remove(this.cubeArray[index]);
        this.cubeArray.splice(index, 1);
    }
}

export default ClickSnake;

