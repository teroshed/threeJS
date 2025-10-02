/**
 * 🌍 GLOBAL CONTROLS EVENT HANDLERS
 * 
 * Handles global controls (timing, background, vertex markers, etc.)
 */

import { setupRangeControl, setupCheckbox } from '../ui-helpers.js';
import { applyGradientBackground, setDirection, setOpacity, setAngle, updateGradientPreviews, currentGradient } from '../gradient-manager.js';
import { updateGlobalEffectProperty } from '../effect-control-utils.js';

let effectsManager = null;

export function setEffectsManager(manager) {
    effectsManager = manager;
}

export function setupGlobalControls() {
    // Click delay
    setupRangeControl('clickDelay', 'clickDelayValue', (value) => {
        const delayMs = parseInt(value);
        effectsManager?.setClickRate(delayMs);
        console.log(`⏱️ Click delay updated to: ${delayMs}ms`);
    }, (value) => `${value}ms`);

    // Background controls
    setupRangeControl('bgOpacity', 'bgOpacityValue', (value) => {
        setOpacity(parseFloat(value));
        applyGradientBackground(currentGradient);
    });

    setupRangeControl('bgAngle', 'bgAngleValue', (value) => {
        setAngle(parseInt(value));
        updateGradientPreviews();
        applyGradientBackground(currentGradient);
    });

    // Gradient direction
    const directionSelect = document.getElementById('bgGradientDirection');
    directionSelect?.addEventListener('change', (e) => {
        setDirection(e.target.value);
        updateGradientPreviews();
        applyGradientBackground(currentGradient);
        toggleAngleSlider(e.target.value);
        console.log(`🧭 Gradient direction changed to: ${e.target.value}`);
    });

    // Vertex marker controls
    setupCheckbox('useVertexMarkers', (checked) => {
        updateGlobalEffectProperty('useVertexMarkers', checked);
        console.log(`🎯 Vertex markers: ${checked ? 'ON' : 'OFF'}`);
    });

    const markerShapeSelect = document.getElementById('vertexMarkerShape');
    markerShapeSelect?.addEventListener('change', (e) => {
        updateGlobalEffectProperty('vertexMarkerShape', e.target.value);
        console.log(`🎯 Marker shape changed to: ${e.target.value}`);
    });

    setupRangeControl('vertexMarkerSize', 'vertexMarkerSizeValue', (value) => {
        updateGlobalEffectProperty('vertexMarkerSize', parseFloat(value));
    });

    setupRangeControl('outlineOpacity', 'outlineOpacityValue', (value) => {
        updateGlobalEffectProperty('outlineOpacity', parseFloat(value));
    });

    // Clear effects button
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
