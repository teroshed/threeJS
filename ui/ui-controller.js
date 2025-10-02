// UI Controller - connects UI to EffectsManager
import * as THREE from 'three';
import EFFECTS_DEFAULTS from '../effects/EffectsDefaults.js';
import { Z_MODES, BACKGROUND_GRADIENTS, GRADIENT_DIRECTIONS, UI_DEFAULTS } from './ui-options.js';

// Get reference to effects manager from main.js
let effectsManager = null;
let scene = null;
let renderer = null;
let currentGradient = UI_DEFAULTS.defaultBackground;
let currentDirection = UI_DEFAULTS.gradientDirection;
let currentOpacity = UI_DEFAULTS.gradientOpacity;

// Export function to initialize UI with effects manager
export function initUI(manager, sceneRef, rendererRef) {
    effectsManager = manager;
    scene = sceneRef;
    renderer = rendererRef;
    initializeUIValues();
    setupEventListeners();
    applyGradientBackground(currentGradient);
}

/**
 * Calculate smart slider range based on default value
 * Range is default * 0.1 to default * 5 (or sensible overrides)
 */
function calculateSliderRange(defaultValue, overrides = {}) {
    if (overrides.min !== undefined && overrides.max !== undefined) {
        return { min: overrides.min, max: overrides.max, step: overrides.step || 'auto' };
    }

    let min, max, step;

    if (defaultValue === 0) {
        // Special case for zero defaults
        min = 0;
        max = overrides.max || 1;
        step = 0.01;
    } else if (defaultValue < 1 && defaultValue > 0) {
        // Small decimal values
        min = Math.max(0, defaultValue * 0.1);
        max = defaultValue * 5;
        step = Math.max(0.001, defaultValue * 0.1);
    } else if (defaultValue < 0) {
        // Negative values
        min = defaultValue * 5;
        max = Math.abs(defaultValue) * 5;
        step = Math.max(0.1, Math.abs(defaultValue) * 0.1);
    } else {
        // Larger integer values
        min = Math.max(1, Math.floor(defaultValue * 0.1));
        max = Math.ceil(defaultValue * 5);
        step = Math.max(1, Math.floor(defaultValue * 0.05));
    }

    return {
        min: overrides.min ?? min,
        max: overrides.max ?? max,
        step: overrides.step ?? step
    };
}

// Initialize UI controls with default values
function initializeUIValues() {
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
    setInputValue('snakeColor', snakeDefaults.fixedColor);
    setCheckboxValue('clickSnakeActive', true);

    // Populate Z-mode dropdown
    populateZModes();

    // Random Cubes defaults
    const rcDefaults = EFFECTS_DEFAULTS.RANDOM_CUBES;
    
    setupSmartSlider('rcMaxCubes', rcDefaults.maxCubes);
    setupSmartSlider('rcCubeSize', rcDefaults.cubeSize);
    setupSmartSlider('rcSpawnRate', rcDefaults.cubeSpawnRate);
    setupSmartSlider('rcFadeRate', rcDefaults.cubeFadeRate);
    setupSmartSlider('rcRotationSpeed', rcDefaults.rotationSpeed);
    
    setCheckboxValue('rcRandomColor', rcDefaults.cubeRandomColor);
    setCheckboxValue('randomCubesActive', false);

    // Global defaults
    const globalDefaults = EFFECTS_DEFAULTS.GLOBAL;
    setupSmartSlider('clickRate', globalDefaults.clickRate);

    // Background gradient controls
    setupSmartSlider('bgOpacity', UI_DEFAULTS.gradientOpacity, { min: 0, max: 1, step: 0.05 });
    populateGradientDirections();
    createGradientGrid();
}

function setupSmartSlider(id, defaultValue, overrides = {}) {
    const input = document.getElementById(id);
    const valueDisplay = document.getElementById(id + 'Value');
    
    if (input && valueDisplay) {
        const range = calculateSliderRange(defaultValue, overrides);
        
        input.min = range.min;
        input.max = range.max;
        input.step = range.step;
        input.value = defaultValue;
        
        valueDisplay.textContent = defaultValue;
        
        console.log(`📊 Smart slider [${id}]: min=${range.min}, max=${range.max}, step=${range.step}, default=${defaultValue}`);
    }
}

function populateZModes() {
    const select = document.getElementById('snakeZMode');
    if (!select) return;

    select.innerHTML = '';

    Object.entries(Z_MODES).forEach(([key, mode]) => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = `${mode.name} - ${mode.description}`;
        // Use UI_DEFAULTS for default Z mode
        if (key === UI_DEFAULTS.defaultZMode) {
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

        // Add click handler
        option.addEventListener('click', () => {
            // Remove selected from all
            document.querySelectorAll('.gradient-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            // Add selected to this one
            option.classList.add('selected');
            // Apply gradient
            applyGradientBackground(key);
        });
    });

    console.log('🎨 Created visual gradient preview grid');
}

function getGradientCSS(colors, direction) {
    const dirInfo = GRADIENT_DIRECTIONS[direction];
    
    if (direction === 'radial') {
        if (colors.length === 1) {
            return `radial-gradient(circle, ${colors[0]}, ${colors[0]})`;
        } else if (colors.length === 2) {
            return `radial-gradient(circle, ${colors[0]}, ${colors[1]})`;
        } else {
            const colorStops = colors.map((color, i) => 
                `${color} ${(i / (colors.length - 1) * 100).toFixed(0)}%`
            ).join(', ');
            return `radial-gradient(circle, ${colorStops})`;
        }
    } else {
        const angle = dirInfo.angle;
        if (colors.length === 1) {
            return `linear-gradient(${angle}deg, ${colors[0]}, ${colors[0]})`;
        } else if (colors.length === 2) {
            return `linear-gradient(${angle}deg, ${colors[0]}, ${colors[1]})`;
        } else {
            const colorStops = colors.map((color, i) => 
                `${color} ${(i / (colors.length - 1) * 100).toFixed(0)}%`
            ).join(', ');
            return `linear-gradient(${angle}deg, ${colorStops})`;
        }
    }
}

function applyGradientBackground(gradientKey) {
    const gradient = BACKGROUND_GRADIENTS[gradientKey];
    if (!gradient || !renderer) return;

    const colors = gradient.colors;
    const dirInfo = GRADIENT_DIRECTIONS[currentDirection];
    
    // Create gradient texture
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Create gradient based on direction
    let grd;
    
    if (currentDirection === 'radial') {
        grd = ctx.createRadialGradient(256, 256, 0, 256, 256, 512);
    } else {
        const angle = dirInfo.angle;
        const rad = (angle * Math.PI) / 180;
        const x1 = 256 - Math.cos(rad) * 256;
        const y1 = 256 - Math.sin(rad) * 256;
        const x2 = 256 + Math.cos(rad) * 256;
        const y2 = 256 + Math.sin(rad) * 256;
        grd = ctx.createLinearGradient(x1, y1, x2, y2);
    }
    
    // Add color stops
    if (colors.length === 1) {
        grd.addColorStop(0, colors[0]);
        grd.addColorStop(1, colors[0]);
    } else if (colors.length === 2) {
        grd.addColorStop(0, colors[0]);
        grd.addColorStop(1, colors[1]);
    } else {
        colors.forEach((color, i) => {
            grd.addColorStop(i / (colors.length - 1), color);
        });
    }

    // Fill with gradient
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // FIXED: Apply opacity as a blend overlay, not as alpha on the gradient
    if (currentOpacity < 1) {
        // Create a black rectangle with inverse opacity
        ctx.globalAlpha = 1 - currentOpacity;
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Apply to scene
    const texture = new THREE.CanvasTexture(canvas);
    scene.background = texture;

    currentGradient = gradientKey;
    console.log(`🎨 Applied gradient: ${gradient.name} ${gradient.emoji} (direction: ${currentDirection}, opacity: ${currentOpacity})`);
}

function updateGradientPreviews() {
    // Update all gradient previews to reflect current direction
    document.querySelectorAll('.gradient-option').forEach(option => {
        const key = option.dataset.gradient;
        const gradient = BACKGROUND_GRADIENTS[key];
        const preview = option.querySelector('.gradient-preview');
        preview.style.background = getGradientCSS(gradient.colors, currentDirection);
    });
}

function setInputValue(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.value = value;
    }
}

function setCheckboxValue(id, checked) {
    const element = document.getElementById(id);
    if (element) {
        element.checked = checked;
    }
}

function setupEventListeners() {
    // Panel toggle
    const closeBtn = document.getElementById('closePanel');
    const toggleBtn = document.getElementById('togglePanel');
    const panel = document.getElementById('controlPanel');

    closeBtn?.addEventListener('click', () => {
        panel.classList.add('collapsed');
    });

    toggleBtn?.addEventListener('click', () => {
        panel.classList.remove('collapsed');
    });

    // Click Snake Controls
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

    setupColorPicker('snakeColor', (color) => {
        updateEffectConfig('ClickSnake', 'fixedColor', color);
    });

    setupCheckbox('clickSnakeActive', (checked) => {
        effectsManager?.setEffectActive('ClickSnake', checked);
    });

    // Z-mode selector
    const zModeSelect = document.getElementById('snakeZMode');
    zModeSelect?.addEventListener('change', (e) => {
        updateEffectConfig('ClickSnake', 'zMode', e.target.value);
        console.log(`🎢 Z-mode changed to: ${e.target.value}`);
    });

    // Random Cubes Controls
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

    setupCheckbox('randomCubesActive', (checked) => {
        effectsManager?.setEffectActive('RandomCubes', checked);
    });

    // Global Settings
    setupRangeControl('clickRate', 'clickRateValue', (value) => {
        console.log('Click rate:', value);
    });

    // Background gradient opacity
    setupRangeControl('bgOpacity', 'bgOpacityValue', (value) => {
        currentOpacity = parseFloat(value);
        applyGradientBackground(currentGradient);
    });

    // Gradient direction selector
    const directionSelect = document.getElementById('bgGradientDirection');
    directionSelect?.addEventListener('change', (e) => {
        currentDirection = e.target.value;
        updateGradientPreviews();
        applyGradientBackground(currentGradient);
        console.log(`🧭 Gradient direction changed to: ${e.target.value}`);
    });

    // Clear button
    document.getElementById('clearEffects')?.addEventListener('click', () => {
        effectsManager?.clearEffects();
    });
}

// Helper functions
function setupRangeControl(inputId, valueId, callback) {
    const input = document.getElementById(inputId);
    const valueDisplay = document.getElementById(valueId);
    
    if (input && valueDisplay) {
        input.addEventListener('input', (e) => {
            const value = e.target.value;
            valueDisplay.textContent = value;
            callback(value);
        });
    }
}

function setupCheckbox(inputId, callback) {
    const input = document.getElementById(inputId);
    
    if (input) {
        input.addEventListener('change', (e) => {
            callback(e.target.checked);
        });
    }
}

function setupColorPicker(inputId, callback) {
    const input = document.getElementById(inputId);
    
    if (input) {
        input.addEventListener('input', (e) => {
            callback(e.target.value);
        });
    }
}

function updateEffectConfig(effectName, property, value) {
    if (!effectsManager) return;

    // Find the effect and update its property
    const allEffects = [...effectsManager.onClickEffects, ...effectsManager.idleEffects];
    
    allEffects.forEach(effect => {
        if (effect.name === effectName) {
            effect[property] = value;
            console.log(`Updated ${effectName}.${property} to ${value}`);
        }
    });
}

