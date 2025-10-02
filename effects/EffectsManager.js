import ClickSnake from './clickEffects/ClickSnake.js';
import RandomCubes from './idleEffects/RandomCubes.js';
import EFFECTS_DEFAULTS from './EffectsDefaults.js';


export default class EffectsManager {

    // Click effects configuration - sourced from defaults
    static ON_CLICK_EFFECTS = [
        EFFECTS_DEFAULTS.CLICK_SNAKE
    ];

    // Idle effects configuration - sourced from defaults
    static IDLE_EFFECTS = [
        EFFECTS_DEFAULTS.RANDOM_CUBES
    ];

    static ON_CLICK_RATE = EFFECTS_DEFAULTS.GLOBAL.clickRate;
    static FRAME_RATE = EFFECTS_DEFAULTS.GLOBAL.frameRate;

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
        
        // Initialize click effects from configuration
        EffectsManager.ON_CLICK_EFFECTS.forEach(effectConfig => {
            const { name, class: EffectClass, ...params } = effectConfig;
            
            // Extract parameter values in order (excluding name and class)
            const paramValues = Object.values(params);
            
            // Create instance with spread parameters
            const effectInstance = new EffectClass(...paramValues);
            
            console.log(`Initialized click effect: ${name}`, params);
            this.onClickEffects.push(effectInstance);
        });

        // Initialize idle effects from configuration
        EffectsManager.IDLE_EFFECTS.forEach(effectConfig => {
            const { name, class: EffectClass, ...params } = effectConfig;
            
            // Extract parameter values in order (excluding name and class)
            const paramValues = Object.values(params);
            
            // Create instance with spread parameters
            const effectInstance = new EffectClass(...paramValues);
            
            console.log(`Initialized idle effect: ${name}`, params);
            this.idleEffects.push(effectInstance);
        });

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
     * Set an effect active or inactive by name
     * @param {string} effectName - Name of the effect to set active (see ON_CLICK_EFFECTS or IDLE_EFFECTS)
     * @param {boolean} active - Whether to activate or deactivate the effect
     */
    setEffectActive(effectName, active) {
        console.log("Trying to set effect active", effectName, active);
        let found = false;
        
        // Check click effects
        this.onClickEffects.forEach(effect => {
            if(effect.name === effectName) {
                found = true;
                console.log("Successfully set click effect active", effect.name, active);
                effect.setActive(active);
                effect.update(this.camera, this.scene, this.mouse);
            }
        });

        // Check idle effects
        this.idleEffects.forEach(effect => {
            if(effect.name === effectName) {
                found = true;
                console.log("Successfully set idle effect active", effect.name, active);
                effect.setActive(active);
                effect.update(this.camera, this.scene, this.mouse);
            }
        });

        if(!found) {
            console.warn(`Effect "${effectName}" not found`);
        }
    }

    update(camera, scene, mouse) {
        this.camera = camera;   
        this.scene = scene;
        this.mouse = mouse;

        this.onClickEffects.forEach(effect => {
            if(effect.active) {
                effect.update(this.camera, this.scene, this.mouse);
            }
        });

        this.idleEffects.forEach(effect => {
            if(effect.active) {
                effect.update(this.camera, this.scene, this.mouse);
            }
        });
    }   

    /**
     * Clear all effects (both click and idle)
     */
    clearEffects() {
        this.onClickEffects.forEach(effect => {
            effect.clear();
        });
        
        this.idleEffects.forEach(effect => {
            effect.clear();
        });
    }

    /**
     * Clear a specific effect by name
     * @param {string} effectName - Name of the effect to clear
     */
    clearEffect(effectName) {
        this.onClickEffects.forEach(effect => {
            if(effect.name === effectName) {
                effect.clear();
            }
        });

        this.idleEffects.forEach(effect => {
            if(effect.name === effectName) {
                effect.clear();
            }
        });
    }

    updateMousePosition(mouse) {
        this.mouse = mouse;
    }

    updateMouseDown(mouseDown) {
        this.mouseDown = mouseDown;
    }
}
