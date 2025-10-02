import ClickSnake from './clickEffects/ClickSnake.js';
import RandomCubes from './idleEffects/RandomCubes.js';
import CameraOrbit from './idleEffects/CameraOrbit.js';
import { Z_MODES } from '../ui/ui-constants.js';

/**
 * 🎯 CENTRALIZED EFFECT CONFIGURATION
 * 
 * This is THE single source of truth for all effect parameters!
 * Change values here and they automatically propagate to:
 * - EffectsManager (effect behavior)
 * - UI sliders and controls (default values)
 * 
 * All effect parameters (cubeSize, speed, colors, etc.) are defined here.
 */
const EFFECTS_DEFAULTS = {

    // Click Snake Effect Configuration
    CLICK_SNAKE: {
        name: "ClickSnake",
        class: ClickSnake,
        maxLength: 200,
        autoFade: true,
        cubeSize: 1,
        fadeSpeed: 0.05,
        rotationSpeed: 0.1,
        randomColor: true,
        fixedColor: '#ff00ff',
        zMode: Z_MODES.WAVE,  // Using enum for type safety!
        zValue: 0,              // Base Z position
        zVariance: 2,           // Variance amount for random/wave modes
        zMin: -5,               // Minimum Z boundary
        zMax: 10,               // Maximum Z boundary
        planeDistance: 0        // Distance of interaction plane from camera (0 = at origin)
    },

    // Random Cubes Effect Configuration
    RANDOM_CUBES: {
        name: "RandomCubes",
        class: RandomCubes,
        maxCubes: 10,
        cubeSize: 0.25,
        cubeSpawnRate: 0.1,
        cubeFadeRate: 0.01,
        cubeRandomColor: true,
        rotationSpeed: 0.02
    },

    // Camera Orbit Effect Configuration
    CAMERA_ORBIT: {
        name: "CameraOrbit",
        class: CameraOrbit,
        radius: 10,           // Distance from origin
        speed: 0.005,         // Rotation speed
        direction: 1,         // 1 = clockwise, -1 = counter-clockwise
        height: 0,            // Y position offset
        tilt: 0               // Camera tilt angle (0-90 degrees)
    },

    // Global Settings
    GLOBAL: {
        clickRate: 30, // ms between click events
        frameRate: 60  // fps
    }
};

export default EFFECTS_DEFAULTS;
