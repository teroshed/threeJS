import { IdleEffect } from "./IdleEffect.js";

class RandomCubes extends IdleEffect {

    constructor(maxCubes, cubeSize, cubeSpawnRate, cubeFadeRate, cubeRandomColor) {
        super();

        this.name = "RandomCubes";
        this.maxCubes = maxCubes;
        this.cubeSize = cubeSize;
        this.cubeSpawnRate = cubeSpawnRate;
        this.cubeFadeRate = cubeFadeRate;
        this.cubeRandomColor = cubeRandomColor;

        this.active = false;
    }

    update(camera, scene, mouse) {
        super.update(camera, scene, mouse);
        
        // Only create cubes if this effect is active!
        if (!this.active) {
            return;
        }

        // Spawn cubes randomly based on spawn rate
        if (Math.random() < this.cubeSpawnRate) {
            this.createCube(
                this.cubeSize, 
                {
                    x: 20 - Math.random() * 40, 
                    y: 10 - Math.random() * 20, 
                    z: -20 + Math.random() * 40
                }, 
                Math.random() * 0xFFFFFF
            );
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
        
        // Remove fully faded cubes
        this.cubeArray = this.cubeArray.filter(cube => cube.material.opacity > 0);
    }
}

export default RandomCubes;
