/**
 * ✨ IDLE EFFECTS EVENT HANDLERS
 * 
 * Handles all idle effect controls (RandomCubes, CameraOrbit, SimulatedDrag)
 */

import { 
    setupEffectRangeControl, 
    setupEffectCheckbox, 
    setupEffectColorPicker, 
    setupEffectActivation,
    setupRotationControls,
    setupEffectSelect
} from '../effect-control-utils.js';

export function setupRandomCubesControls() {
    // Range controls
    setupEffectRangeControl('rcMaxCubes', 'rcMaxCubesValue', 'RandomCubes', 'maxCubes', parseInt);
    setupEffectRangeControl('rcCubeSize', 'rcCubeSizeValue', 'RandomCubes', 'cubeSize', parseFloat);
    setupEffectRangeControl('rcSpawnRate', 'rcSpawnRateValue', 'RandomCubes', 'cubeSpawnRate', parseFloat);
    setupEffectRangeControl('rcFadeRate', 'rcFadeRateValue', 'RandomCubes', 'cubeFadeRate', parseFloat);
    setupEffectRangeControl('rcRotationSpeed', 'rcRotationSpeedValue', 'RandomCubes', 'rotationSpeed', parseFloat);

    // Checkboxes
    setupEffectCheckbox('rcRandomColor', 'RandomCubes', 'cubeRandomColor');
    
    // Rotation controls
    setupRotationControls('rc', 'RandomCubes');
    
    // Activation
    setupEffectActivation('randomCubesActive', 'RandomCubes');
}

export function setupCameraOrbitControls() {
    // Range controls
    setupEffectRangeControl('orbitRadius', 'orbitRadiusValue', 'CameraOrbit', 'radius', parseFloat);
    setupEffectRangeControl('orbitSpeed', 'orbitSpeedValue', 'CameraOrbit', 'speed', parseFloat);
    setupEffectRangeControl('orbitHeight', 'orbitHeightValue', 'CameraOrbit', 'height', parseFloat);
    setupEffectRangeControl('orbitTilt', 'orbitTiltValue', 'CameraOrbit', 'tilt', parseFloat);

    // Direction select
    setupEffectSelect('orbitDirection', 'CameraOrbit', 'direction', parseInt);
    
    // Activation
    setupEffectActivation('cameraOrbitActive', 'CameraOrbit');
}

export function setupKaleidoscopeControls() {
    // Range controls
    setupEffectRangeControl('kaleidoscopeSegments', 'kaleidoscopeSegmentsValue', 'Kaleidoscope', 'segments', parseInt);
    setupEffectRangeControl('kaleidoscopeRadius', 'kaleidoscopeRadiusValue', 'Kaleidoscope', 'baseRadius', parseFloat);
    setupEffectRangeControl('kaleidoscopeLineWidth', 'kaleidoscopeLineWidthValue', 'Kaleidoscope', 'lineWidth', parseFloat);
    setupEffectRangeControl('kaleidoscopeRotationSpeed', 'kaleidoscopeRotationSpeedValue', 'Kaleidoscope', 'rotationSpeed', parseFloat);
    setupEffectRangeControl('kaleidoscopeMirrorAlpha', 'kaleidoscopeMirrorAlphaValue', 'Kaleidoscope', 'mirrorAlpha', parseFloat);
    
    // Activation
    setupEffectActivation('kaleidoscopeActive', 'Kaleidoscope');
}

export function setupSupershapeControls() {
    // Range controls
    setupEffectRangeControl('supershapeSegments', 'supershapeSegmentsValue', 'Supershape', 'segments', parseInt);
    setupEffectRangeControl('supershapeRadius', 'supershapeRadiusValue', 'Supershape', 'baseRadius', parseFloat);
    setupEffectRangeControl('supershapeM', 'supershapeMValue', 'Supershape', 'm', parseInt);
    setupEffectRangeControl('supershapeN1', 'supershapeN1Value', 'Supershape', 'n1', parseFloat);
    setupEffectRangeControl('supershapeN2', 'supershapeN2Value', 'Supershape', 'n2', parseFloat);
    setupEffectRangeControl('supershapeN3', 'supershapeN3Value', 'Supershape', 'n3', parseFloat);
    setupEffectRangeControl('supershapeRotationSpeed', 'supershapeRotationSpeedValue', 'Supershape', 'rotationSpeed', parseFloat);
    
    // Activation
    setupEffectActivation('supershapeActive', 'Supershape');
}

export function setupSimulatedDragControls() {
    // Range controls
    setupEffectRangeControl('simDragSpeed', 'simDragSpeedValue', 'SimulatedDrag', 'speed', parseFloat);
    setupEffectRangeControl('simDragTrailLength', 'simDragTrailLengthValue', 'SimulatedDrag', 'trailLength', parseInt);
    setupEffectRangeControl('simDragCubeSize', 'simDragCubeSizeValue', 'SimulatedDrag', 'cubeSize', parseFloat);
    setupEffectRangeControl('simDragFadeSpeed', 'simDragFadeSpeedValue', 'SimulatedDrag', 'fadeSpeed', parseFloat);
    setupEffectRangeControl('simDragRotationSpeed', 'simDragRotationSpeedValue', 'SimulatedDrag', 'rotationSpeed', parseFloat);
    setupEffectRangeControl('simDragPathSize', 'simDragPathSizeValue', 'SimulatedDrag', 'pathSize', parseFloat);

    // Pattern select
    setupEffectSelect('simDragPattern', 'SimulatedDrag', 'pattern');
    
    // Checkboxes
    setupEffectCheckbox('simDragRandomColor', 'SimulatedDrag', 'randomColor');
    
    // Color picker
    setupEffectColorPicker('simDragColor', 'SimulatedDrag', 'fixedColor');
    
    // Activation
    setupEffectActivation('simulatedDragActive', 'SimulatedDrag');
}
