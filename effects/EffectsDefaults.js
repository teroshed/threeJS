import ClickSnake from './clickEffects/ClickSnake.js';
import RandomCubes from './idleEffects/RandomCubes.js';

/**
 * Centralized configuration for all effects
 * Change values here and they'll propagate to EffectsManager AND UI
 */
const EFFECTS_DEFAULTS = {

    // Click Snake Effect Configuration
    CLICK_SNAKE: {
        name: "ClickSnake",
        class: ClickSnake,
        maxLength: 200,
        autoFade: true,
        cubeSize: 1,
        fadeSpeed: 0.01,
        rotationSpeed: 0.1,
        randomColor: true,
        fixedColor: '#ff00ff',
        zMode: 'random',      // 'set', 'random', 'wave', 'spiral', 'pulse', 'oscillate'
        zValue: 0,            // Base Z position
        zVariance: 2,       // Variance amount for random/wave modes
        zMin: -5,             // Minimum Z boundary
        zMax: 10               // Maximum Z boundary
    },

    // Random Cubes Effect Configuration
    RANDOM_CUBES: {
        name: "RandomCubes",
        class: RandomCubes,
        maxCubes: 10,
        cubeSize: 0.5,
        cubeSpawnRate: 0.1,
        cubeFadeRate: 0.01,
        cubeRandomColor: true,
        rotationSpeed: 0.02
    },

    // Global Settings
    GLOBAL: {
        clickRate: 30, // ms between click events
        frameRate: 60  // fps
    }
};

export default EFFECTS_DEFAULTS;
