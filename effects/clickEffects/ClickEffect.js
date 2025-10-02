import { Effect } from "../Effect.js";


export class ClickEffect extends Effect {

    constructor() {
        super();
    }

    onClick(mouse, camera)
    {
        if (!this.active) return;

        // Your click logic here
    }

    

    update(camera, scene) {
        super.update(camera, scene);
    }
}