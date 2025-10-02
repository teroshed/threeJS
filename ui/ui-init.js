/**
 * 🚀 UI Initialization - Setup UI with defaults
 */

import EFFECTS_DEFAULTS from '../effects/EffectsDefaults.js';
import { Z_MODES, Z_MODE_INFO, BACKGROUND_GRADIENTS, GRADIENT_DIRECTIONS } from './ui-constants.js';
import { UI_DEFAULTS } from './ui-defaults.js';
import { setupSmartSlider } from './slider-utils.js';
import { setCheckboxValue, setInputValue, toggleRotationSlider } from './ui-helpers.js';
import { getGradientCSS, currentGradient, currentDirection, applyGradientBackground } from './gradient-manager.js';

export function initializeUIValues() {
    // Click Snake defaults
    const snakeDefaults = EFFECTS_DEFAULTS.CLICK_SNAKE;
    
    setupSmartSlider('snakeMaxLength', snakeDefaults.maxLength);
    setupSmartSlider('snakeCubeSize', snakeDefaults.cubeSize);
    setupSmartSlider('snakeFadeSpeed', snakeDefaults.fadeSpeed);
    setupSmartSlider('snakeRotationSpeed', snakeDefaults.rotationSpeed);
    setupSmartSlider('snakeZMin', snakeDefaults.zMin);
    setupSmartSlider('snakeZMax', snakeDefaults.zMax);
    setupSmartSlider('snakeZVariance', snakeDefaults.zVariance);
    
    setCheckboxValue('snakeAutoFade', snakeDefaults.autoFade);
    setCheckboxValue('snakeRandomColor', snakeDefaults.randomColor);
    setCheckboxValue('snakeRotationEnabled', UI_DEFAULTS.rotationEnabled);
    setInputValue('snakeColor', snakeDefaults.fixedColor);
    setCheckboxValue('clickSnakeActive', true);

    toggleRotationSlider('snake', UI_DEFAULTS.rotationEnabled);
    populateZModes();

    // Random Cubes defaults
    const rcDefaults = EFFECTS_DEFAULTS.RANDOM_CUBES;
    
    setupSmartSlider('rcMaxCubes', rcDefaults.maxCubes);
    setupSmartSlider('rcCubeSize', rcDefaults.cubeSize);
    setupSmartSlider('rcSpawnRate', rcDefaults.cubeSpawnRate);
    setupSmartSlider('rcFadeRate', rcDefaults.cubeFadeRate);
    setupSmartSlider('rcRotationSpeed', rcDefaults.rotationSpeed);
    
    setCheckboxValue('rcRandomColor', rcDefaults.cubeRandomColor);
    setCheckboxValue('rcRotationEnabled', UI_DEFAULTS.rotationEnabled);
    setCheckboxValue('randomCubesActive', false);

    toggleRotationSlider('rc', UI_DEFAULTS.rotationEnabled);

    // Camera Orbit defaults
    const orbitDefaults = EFFECTS_DEFAULTS.CAMERA_ORBIT;
    
    setupSmartSlider('orbitRadius', orbitDefaults.radius);
    setupSmartSlider('orbitSpeed', orbitDefaults.speed, { min: 0, max: 0.05, step: 0.001 });
    setupSmartSlider('orbitHeight', orbitDefaults.height, { min: -20, max: 20, step: 0.5 });
    setupSmartSlider('orbitTilt', orbitDefaults.tilt, { min: 0, max: 90, step: 1 });
    
    const directionSelect = document.getElementById('orbitDirection');
    if (directionSelect) {
        directionSelect.value = orbitDefaults.direction.toString();
    }
    
    setCheckboxValue('cameraOrbitActive', false);

    // Global defaults
    const globalDefaults = EFFECTS_DEFAULTS.GLOBAL;
    setupSmartSlider('clickRate', globalDefaults.clickRate);

    // Background gradient controls
    setupSmartSlider('bgOpacity', UI_DEFAULTS.gradientOpacity, { min: 0, max: 1, step: 0.05 });
    setupSmartSlider('bgAngle', UI_DEFAULTS.gradientAngle, { min: 0, max: 360, step: 5 });
    
    populateGradientDirections();
    createGradientGrid();
}

function populateZModes() {
    const select = document.getElementById('snakeZMode');
    if (!select) return;

    select.innerHTML = '';

    // Get the default Z mode from the effect defaults
    const snakeDefaults = EFFECTS_DEFAULTS.CLICK_SNAKE;

    Object.entries(Z_MODES).forEach(([enumKey, value]) => {
        const info = Z_MODE_INFO[value];
        const option = document.createElement('option');
        option.value = value;
        option.textContent = `${info.name} - ${info.description}`;
        
        if (value === snakeDefaults.zMode) {
            option.selected = true;
        }
        select.appendChild(option);
    });
}

function populateGradientDirections() {
    const select = document.getElementById('bgGradientDirection');
    if (!select) return;

    select.innerHTML = '';

    Object.entries(GRADIENT_DIRECTIONS).forEach(([key, dir]) => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = dir.name;
        if (key === UI_DEFAULTS.gradientDirection) {
            option.selected = true;
        }
        select.appendChild(option);
    });
}

function createGradientGrid() {
    const grid = document.getElementById('gradientGrid');
    if (!grid) return;

    grid.innerHTML = '';

    Object.entries(BACKGROUND_GRADIENTS).forEach(([key, gradient]) => {
        const option = document.createElement('div');
        option.className = 'gradient-option';
        option.dataset.gradient = key;
        
        if (key === currentGradient) {
            option.classList.add('selected');
        }

        const preview = document.createElement('div');
        preview.className = 'gradient-preview';
        preview.style.background = getGradientCSS(gradient.colors, currentDirection);

        const label = document.createElement('div');
        label.className = 'gradient-label';
        label.innerHTML = `<span>${gradient.emoji}</span><span>${gradient.name}</span>`;

        option.appendChild(preview);
        option.appendChild(label);
        grid.appendChild(option);

        // Click handler
        option.addEventListener('click', () => handleGradientClick(key, option));
    });

    console.log('🎨 Created visual gradient preview grid');
}

function handleGradientClick(key, clickedOption) {
    document.querySelectorAll('.gradient-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    clickedOption.classList.add('selected');
    applyGradientBackground(key);
}
