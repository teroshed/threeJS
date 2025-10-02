import ClickSnake from './clickEffects/ClickSnake.js';
import DragSpiral from './clickEffects/DragSpiral.js';
import RandomCubes from './idleEffects/RandomCubes.js';
import CameraOrbit from './idleEffects/CameraOrbit.js';
import SimulatedDrag from './idleEffects/SimulatedDrag.js';
import { Z_MODES, PATTERN_TYPES, COLOR_MODES, SPAWN_MODES } from '../enums/index.js';

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
        colorMode: COLOR_MODES.RANDOM,
        fixedColor: '#ff00ff',
        zMode: Z_MODES.WAVE,  // Using enum for type safety!
        zValue: 0,              // Base Z position
        zVariance: 2,           // Variance amount for random/wave modes
        zMin: -5,               // Minimum Z boundary
        zMax: 10,               // Maximum Z boundary
        planeDistance: 0        // Distance of interaction plane from camera (0 = at origin)
    },

    // Drag Spiral Effect Configuration
    DRAG_SPIRAL: {
        name: "DragSpiral",
        class: DragSpiral,
        spiralArms: 3,          // Number of spiral arms (1-6)
        spiralTightness: 1.5,   // How tight the spiral (0.5-3.0)
        maxCubes: 150,          // Maximum cubes in effect
        cubeSize: 0.8,          // Base cube size
        fadeSpeed: 0.02,        // Fade out speed
        rotationSpeed: 0.08,    // Individual cube rotation
        colorMode: COLOR_MODES.RANDOM,  // Use rainbow colors
        fixedColor: '#00ffff',  // Fixed color if colorMode is FIXED
        colorShift: 5,          // Hue shift amount per cube (0-360)
        sizeVariation: 0.4      // Size randomness (0-1)
    },

    // Random Cubes Effect Configuration
    RANDOM_CUBES: {
        name: "RandomCubes",
        class: RandomCubes,
        maxCubes: 50,
        cubeSize: 0.5,
        cubeSpawnRate: 0.3,
        cubeFadeRate: 0.01,
                colorMode: COLOR_MODES.RANDOM,
        rotationSpeed: 0.02,
        // Random location bounds (world coordinates)
        spawnBounds: {
            xMin: -20,
            xMax: 20,
            yMin: -10,
            yMax: 10,
            zMin: -20,
            zMax: 20
        }
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

            // Simulated Drag Effect Configuration
            // 🎯 META-EFFECT: Triggers all active drag effects!
    SIMULATED_DRAG: {
        name: "SimulatedDrag",
        class: SimulatedDrag,
        pattern: PATTERN_TYPES.CIRCLE,    // Use enum for type safety
        speed: 0.05,          // Animation speed
        trailLength: 100,     // [UNUSED - kept for compatibility]
        cubeSize: 0.5,        // [UNUSED - kept for compatibility]
        fadeSpeed: 0.01,      // [UNUSED - kept for compatibility]
        rotationSpeed: 0.05,  // [UNUSED - kept for compatibility]
        colorMode: COLOR_MODES.RANDOM,    // [UNUSED - kept for compatibility]
        fixedColor: '#00ffff', // [UNUSED - kept for compatibility]
        pathSize: 5           // Size/radius of the pattern
            },

    // Global Settings
    // NOTE: Visual settings like outlineWidth/outlineOpacity are in GlobalConfig.js
    // to avoid circular dependencies
    GLOBAL: {
        clickDelay: 30,  // ms delay between click events (0 = no delay)
        frameRate: 60    // Target FPS
    }
};

export default EFFECTS_DEFAULTS;
