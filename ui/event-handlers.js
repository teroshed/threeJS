/**
 * 🎮 Event Handlers - All UI event listeners
 */

import { setupRangeControl, setupCheckbox, setupColorPicker, toggleRotationSlider } from './ui-helpers.js';
import { applyGradientBackground, setDirection, setOpacity, setAngle, updateGradientPreviews, currentGradient } from './gradient-manager.js';

let effectsManager = null;

export function setEffectsManager(manager) {
    effectsManager = manager;
}

export function setupAllEventListeners() {
    setupPanelToggles();
    setupClickSnakeControls();
    setupRandomCubesControls();
    setupCameraOrbitControls();
    setupGlobalControls();
}

function setupPanelToggles() {
    const closeBtn = document.getElementById('closePanel');
    const toggleBtn = document.getElementById('togglePanel');
    const panel = document.getElementById('controlPanel');

    closeBtn?.addEventListener('click', () => {
        panel.classList.add('collapsed');
    });

    toggleBtn?.addEventListener('click', () => {
        panel.classList.remove('collapsed');
    });
}

function setupClickSnakeControls() {
    setupRangeControl('snakeMaxLength', 'snakeMaxLengthValue', (value) => {
        updateEffectConfig('ClickSnake', 'maxLength', parseInt(value));
    });

    setupRangeControl('snakeCubeSize', 'snakeCubeSizeValue', (value) => {
        updateEffectConfig('ClickSnake', 'cubeSize', parseFloat(value));
    });

    setupRangeControl('snakeFadeSpeed', 'snakeFadeSpeedValue', (value) => {
        updateEffectConfig('ClickSnake', 'fadeSpeed', parseFloat(value));
    });

    setupRangeControl('snakeRotationSpeed', 'snakeRotationSpeedValue', (value) => {
        updateEffectConfig('ClickSnake', 'rotationSpeed', parseFloat(value));
    });

    setupRangeControl('snakeZMin', 'snakeZMinValue', (value) => {
        updateEffectConfig('ClickSnake', 'zMin', parseFloat(value));
    });

    setupRangeControl('snakeZMax', 'snakeZMaxValue', (value) => {
        updateEffectConfig('ClickSnake', 'zMax', parseFloat(value));
    });

    setupRangeControl('snakeZVariance', 'snakeZVarianceValue', (value) => {
        updateEffectConfig('ClickSnake', 'zVariance', parseFloat(value));
    });

    setupCheckbox('snakeAutoFade', (checked) => {
        updateEffectConfig('ClickSnake', 'autoFade', checked);
    });

    setupCheckbox('snakeRandomColor', (checked) => {
        updateEffectConfig('ClickSnake', 'randomColor', checked);
    });

    setupCheckbox('snakeRotationEnabled', (checked) => {
        toggleRotationSlider('snake', checked);
        updateEffectConfig('ClickSnake', 'rotationSpeed', checked ? parseFloat(document.getElementById('snakeRotationSpeed').value) : 0);
    });

    setupColorPicker('snakeColor', (color) => {
        updateEffectConfig('ClickSnake', 'fixedColor', color);
    });

    setupCheckbox('clickSnakeActive', (checked) => {
        effectsManager?.setEffectActive('ClickSnake', checked);
    });

    const zModeSelect = document.getElementById('snakeZMode');
    zModeSelect?.addEventListener('change', (e) => {
        updateEffectConfig('ClickSnake', 'zMode', e.target.value);
        console.log(`🎢 Z-mode changed to: ${e.target.value}`);
    });
}

function setupRandomCubesControls() {
    setupRangeControl('rcMaxCubes', 'rcMaxCubesValue', (value) => {
        updateEffectConfig('RandomCubes', 'maxCubes', parseInt(value));
    });

    setupRangeControl('rcCubeSize', 'rcCubeSizeValue', (value) => {
        updateEffectConfig('RandomCubes', 'cubeSize', parseFloat(value));
    });

    setupRangeControl('rcSpawnRate', 'rcSpawnRateValue', (value) => {
        updateEffectConfig('RandomCubes', 'cubeSpawnRate', parseFloat(value));
    });

    setupRangeControl('rcFadeRate', 'rcFadeRateValue', (value) => {
        updateEffectConfig('RandomCubes', 'cubeFadeRate', parseFloat(value));
    });

    setupRangeControl('rcRotationSpeed', 'rcRotationSpeedValue', (value) => {
        updateEffectConfig('RandomCubes', 'rotationSpeed', parseFloat(value));
    });

    setupCheckbox('rcRandomColor', (checked) => {
        updateEffectConfig('RandomCubes', 'cubeRandomColor', checked);
    });

    setupCheckbox('rcRotationEnabled', (checked) => {
        toggleRotationSlider('rc', checked);
        updateEffectConfig('RandomCubes', 'rotationSpeed', checked ? parseFloat(document.getElementById('rcRotationSpeed').value) : 0);
    });

    setupCheckbox('randomCubesActive', (checked) => {
        effectsManager?.setEffectActive('RandomCubes', checked);
    });
}

function setupCameraOrbitControls() {
    setupRangeControl('orbitRadius', 'orbitRadiusValue', (value) => {
        updateEffectConfig('CameraOrbit', 'radius', parseFloat(value));
    });

    setupRangeControl('orbitSpeed', 'orbitSpeedValue', (value) => {
        updateEffectConfig('CameraOrbit', 'speed', parseFloat(value));
    });

    setupRangeControl('orbitHeight', 'orbitHeightValue', (value) => {
        updateEffectConfig('CameraOrbit', 'height', parseFloat(value));
    });

    setupRangeControl('orbitTilt', 'orbitTiltValue', (value) => {
        updateEffectConfig('CameraOrbit', 'tilt', parseFloat(value));
    });

    const orbitDirectionSelect = document.getElementById('orbitDirection');
    orbitDirectionSelect?.addEventListener('change', (e) => {
        updateEffectConfig('CameraOrbit', 'direction', parseInt(e.target.value));
        console.log(`🔄 Orbit direction: ${e.target.value === '1' ? 'Clockwise' : 'Counter-Clockwise'}`);
    });

    setupCheckbox('cameraOrbitActive', (checked) => {
        effectsManager?.setEffectActive('CameraOrbit', checked);
    });
}

function setupGlobalControls() {
    setupRangeControl('clickDelay', 'clickDelayValue', (value) => {
        const delayMs = parseInt(value);
        effectsManager?.setClickRate(delayMs);
        console.log(`⏱️ Click delay updated to: ${delayMs}ms`);
    }, (value) => `${value}ms`); // Add 'ms' suffix to display

    setupRangeControl('bgOpacity', 'bgOpacityValue', (value) => {
        setOpacity(parseFloat(value));
        applyGradientBackground(currentGradient);
    });

    setupRangeControl('bgAngle', 'bgAngleValue', (value) => {
        setAngle(parseInt(value));
        updateGradientPreviews();
        applyGradientBackground(currentGradient);
    });

    const directionSelect = document.getElementById('bgGradientDirection');
    directionSelect?.addEventListener('change', (e) => {
        setDirection(e.target.value);
        updateGradientPreviews();
        applyGradientBackground(currentGradient);
        toggleAngleSlider(e.target.value);
        console.log(`🧭 Gradient direction changed to: ${e.target.value}`);
    });

    document.getElementById('clearEffects')?.addEventListener('click', () => {
        effectsManager?.clearEffects();
    });
}

function toggleAngleSlider(direction) {
    const angleGroup = document.getElementById('bgAngle')?.closest('.control-group');
    if (angleGroup) {
        if (direction === 'radial') {
            angleGroup.style.display = 'none';
        } else {
            angleGroup.style.display = 'block';
        }
    }
}

function toggleGradientControls(gradientKey) {
    const directionGroup = document.getElementById('bgGradientDirection')?.closest('.control-group');
    const angleGroup = document.getElementById('bgAngle')?.closest('.control-group');
    
    // Hide direction and angle controls for solid colors (pure black/white)
    const isSolidColor = gradientKey === 'pure-black' || gradientKey === 'pure-white';
    
    if (directionGroup) {
        directionGroup.style.display = isSolidColor ? 'none' : 'block';
    }
    if (angleGroup) {
        angleGroup.style.display = isSolidColor ? 'none' : 'block';
    }
}

function updateEffectConfig(effectName, property, value) {
    if (!effectsManager) return;

    const allEffects = [...effectsManager.onClickEffects, ...effectsManager.idleEffects];
    
    allEffects.forEach(effect => {
        if (effect.name === effectName) {
            effect[property] = value;
            console.log(`Updated ${effectName}.${property} to ${value}`);
        }
    });
}
