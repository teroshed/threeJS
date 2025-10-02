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
        // console.log("In random cubes update, ", this.cubeArray.length);

        this.createCube(this.cubeSize, {x: 20-Math.random()*40, y: 10-Math.random()*20, z: -20 + Math.random()*40 }, Math.random()*0xFFFFFF);


        // console.log("Cube array length", this.cubeArray.length);
        if(this.cubeArray.length > this.maxCubes) {
            this.removeCube(0);
        }
    

        
    }
}

export default RandomCubes;
