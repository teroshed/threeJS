import ClickSnake from './clickEffects/ClickSnake.js';


export default class EffectsManager {



    
    static ON_CLICK_EFFECTS = {
        ClickSnake: ClickSnake
    };

    static ON_CLICK_RATE = 30; //ms
    static FRAME_RATE = 60; //fps


    constructor() {
        this.onClickEffects = [];
        this.idleEffects = [];

        this.camera = null;
        this.scene = null;


        this.mouse = null;
        this.mouseDown = false;
        
    }


    isMouseDown() {
        return this.mouseDown;
    }

    initialize() {
        console.log("Initializing effects manager");

        this.lastClickTime = 0;
        this.lastFrameTime = 0;
        
        this.onClickEffects.push(new ClickSnake(10, true));

        setInterval(this.onClickTick.bind(this), EffectsManager.ON_CLICK_RATE);


    }

    onClickTick() {
        if(this.mouseDown) {
            for(let i = 0; i < this.onClickEffects.length; i++) {
                if(this.onClickEffects[i].active && this.mouseDown) {
                    this.onClickEffects[i].onClick(this.mouse, this.camera);
                }
            }
        }
    }


    /**
     * 
     * @param {*} effectName Name of the effect to set active see {ON_CLICK_EFFECTS}
     * @param {*} active 
     */
    setEffectActive(effectName, active) {
        console.log("Setting effect active", effectName, active);
        this.onClickEffects.forEach(effect => {
            if(effect.name === effectName) {
                effect.setActive(active);
                effect.update(this.camera, this.scene, this.mouse);
            }
        });
    }

    update(camera, scene, mouse) {
        this.camera = camera;   
        this.scene = scene;
        this.mouse = mouse;

        this.onClickEffects.forEach(effect => {
            effect.update(this.camera, this.scene, this.mouse);
        });

        this.idleEffects.forEach(effect => {
            effect.update(this.camera, this.scene, this.mouse);
        });
    }   

    clearEffects() {
        this.onClickEffects.forEach(effect => {
            effect.clear();
        });
    }

    clearEffect(effectName) {
        this.onClickEffects.forEach(effect => {
            if(effect.name === effectName) {
                effect.clear();
            }
        });
    }

    updateMousePosition(mouse) {
        this.mouse = mouse;
    }

    updateMouseDown(mouseDown) {
        console.log("Updating mouse down", mouseDown);
        this.mouseDown = mouseDown;
    }


}