/**
 * 🐍 CLICK EFFECTS EVENT HANDLERS
 * 
 * Handles all click effect controls (ClickSnake, DragSpiral)
 */

import { 
    setupEffectRangeControl, 
    setupEffectCheckbox, 
    setupEffectColorPicker, 
    setupEffectActivation,
    setupRotationControls,
    setupEffectSelect
} from '../effect-control-utils.js';
import { setupSmartSlider } from '../slider-utils.js';
import { updateDragEffect } from '../effect-control-utils.js';
import EFFECTS_DEFAULTS from '../../effects/EffectsDefaults.js';

export function setupClickSnakeControls() {
    // Range controls
    setupEffectRangeControl('snakeMaxLength', 'snakeMaxLengthValue', 'ClickSnake', 'maxLength', parseInt);
    setupEffectRangeControl('snakeCubeSize', 'snakeCubeSizeValue', 'ClickSnake', 'cubeSize', parseFloat);
    setupEffectRangeControl('snakeFadeSpeed', 'snakeFadeSpeedValue', 'ClickSnake', 'fadeSpeed', parseFloat);
    setupEffectRangeControl('snakeRotationSpeed', 'snakeRotationSpeedValue', 'ClickSnake', 'rotationSpeed', parseFloat);
    setupEffectRangeControl('snakeZMin', 'snakeZMinValue', 'ClickSnake', 'zMin', parseFloat);
    setupEffectRangeControl('snakeZMax', 'snakeZMaxValue', 'ClickSnake', 'zMax', parseFloat);
    setupEffectRangeControl('snakeZVariance', 'snakeZVarianceValue', 'ClickSnake', 'zVariance', parseFloat);

    // Checkboxes
    setupEffectCheckbox('snakeAutoFade', 'ClickSnake', 'autoFade');
    setupEffectCheckbox('snakeRandomColor', 'ClickSnake', 'randomColor');
    
    // Rotation controls
    setupRotationControls('snake', 'ClickSnake');
    
    // Color picker
    setupEffectColorPicker('snakeColor', 'ClickSnake', 'fixedColor');
    
    // Activation
    setupEffectActivation('clickSnakeActive', 'ClickSnake');

    // Z-mode select
    setupEffectSelect('snakeZMode', 'ClickSnake', 'zMode');
}

export function setupDragSpiralControls() {
    // Activation
    setupEffectActivation('dragSpiralActive', 'DragSpiral');
    
    // Smart sliders for drag effects (need special update logic)
    setupSmartSlider('spiralArms', 'spiralArmsValue', EFFECTS_DEFAULTS.DRAG_SPIRAL.spiralArms, (value) => {
        updateDragEffect('DragSpiral', 'spiralArms', parseInt(value));
    });
    
    setupSmartSlider('spiralTightness', 'spiralTightnessValue', EFFECTS_DEFAULTS.DRAG_SPIRAL.spiralTightness, (value) => {
        updateDragEffect('DragSpiral', 'spiralTightness', parseFloat(value));
    });
    
    setupSmartSlider('spiralMaxCubes', 'spiralMaxCubesValue', EFFECTS_DEFAULTS.DRAG_SPIRAL.maxCubes, (value) => {
        updateDragEffect('DragSpiral', 'maxCubes', parseInt(value));
    });
    
    setupSmartSlider('spiralCubeSize', 'spiralCubeSizeValue', EFFECTS_DEFAULTS.DRAG_SPIRAL.cubeSize, (value) => {
        updateDragEffect('DragSpiral', 'baseCubeSize', parseFloat(value));
    });
    
    setupSmartSlider('spiralFadeSpeed', 'spiralFadeSpeedValue', EFFECTS_DEFAULTS.DRAG_SPIRAL.fadeSpeed, (value) => {
        updateDragEffect('DragSpiral', 'fadeSpeed', parseFloat(value));
    });
    
    setupSmartSlider('spiralRotationSpeed', 'spiralRotationSpeedValue', EFFECTS_DEFAULTS.DRAG_SPIRAL.rotationSpeed, (value) => {
        updateDragEffect('DragSpiral', 'rotationSpeed', parseFloat(value));
    });
    
    setupSmartSlider('spiralColorShift', 'spiralColorShiftValue', EFFECTS_DEFAULTS.DRAG_SPIRAL.colorShift, (value) => {
        updateDragEffect('DragSpiral', 'colorShift', parseFloat(value));
    });
    
    setupSmartSlider('spiralSizeVariation', 'spiralSizeVariationValue', EFFECTS_DEFAULTS.DRAG_SPIRAL.sizeVariation, (value) => {
        updateDragEffect('DragSpiral', 'sizeVariation', parseFloat(value));
    });
    
    console.log('✅ Drag Spiral controls initialized');
}