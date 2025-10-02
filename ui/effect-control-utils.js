/**
 * 🎛️ EFFECT CONTROL UTILITIES
 * 
 * Reusable utilities for setting up effect controls
 */

import { setupRangeControl, setupCheckbox, setupColorPicker, toggleRotationSlider } from './ui-helpers.js';
import { setupSmartSlider } from './slider-utils.js';

let effectsManager = null;

export function setEffectsManager(manager) {
    effectsManager = manager;
}

/**
 * Setup a range control for an effect property
 */
export function setupEffectRangeControl(controlId, valueId, effectName, property, transform = (v) => v, displayTransform = null) {
    setupRangeControl(controlId, valueId, (value) => {
        updateEffectConfig(effectName, property, transform(value));
    }, displayTransform);
}

/**
 * Setup a smart slider for an effect property
 */
export function setupEffectSmartSlider(controlId, valueId, defaultValue, effectName, property, transform = (v) => v, overrides = {}) {
    setupSmartSlider(controlId, valueId, defaultValue, (value) => {
        updateEffectConfig(effectName, property, transform(value));
    }, overrides);
}

/**
 * Setup a checkbox for an effect property
 */
export function setupEffectCheckbox(controlId, effectName, property, transform = (v) => v) {
    setupCheckbox(controlId, (checked) => {
        updateEffectConfig(effectName, property, transform(checked));
    });
}

/**
 * Setup a color picker for an effect property
 */
export function setupEffectColorPicker(controlId, effectName, property) {
    setupColorPicker(controlId, (color) => {
        updateEffectConfig(effectName, property, color);
    });
}

/**
 * Setup effect activation checkbox
 */
export function setupEffectActivation(controlId, effectName) {
    setupCheckbox(controlId, (checked) => {
        effectsManager?.setEffectActive(effectName, checked);
    });
}

/**
 * Setup rotation controls (checkbox + slider)
 */
export function setupRotationControls(prefix, effectName) {
    setupCheckbox(`${prefix}RotationEnabled`, (checked) => {
        toggleRotationSlider(prefix, checked);
        updateEffectConfig(effectName, 'rotationSpeed', checked ? parseFloat(document.getElementById(`${prefix}RotationSpeed`).value) : 0);
    });
}

/**
 * Setup a select dropdown for an effect property
 */
export function setupEffectSelect(controlId, effectName, property, transform = (v) => v) {
    const select = document.getElementById(controlId);
    select?.addEventListener('change', (e) => {
        updateEffectConfig(effectName, property, transform(e.target.value));
    });
}

/**
 * Update effect configuration
 */
export function updateEffectConfig(effectName, property, value) {
    if (!effectsManager) return;

    const allEffects = [...effectsManager.onClickEffects, ...effectsManager.idleEffects];
    
    allEffects.forEach(effect => {
        if (effect.name === effectName) {
            effect[property] = value;
        }
    });
}

/**
 * Update drag effect properties (specifically for DragSpiral)
 */
export function updateDragEffect(effectName, property, value) {
    if (!effectsManager) return;
    
    const effect = effectsManager.onClickEffects.find(e => e.name === effectName);
    if (effect && effect[property] !== undefined) {
        effect[property] = value;
        console.log(`🌀 ${effectName}.${property} updated to:`, value);
    }
}

/**
 * Update global effect property (affects all effects)
 */
export function updateGlobalEffectProperty(property, value) {
    if (!effectsManager) return;

    const allEffects = [...effectsManager.onClickEffects, ...effectsManager.idleEffects];
    
    allEffects.forEach(effect => {
        effect[property] = value;
    });
    
    console.log(`✨ Updated global property ${property} to ${value} for all effects`);
}
