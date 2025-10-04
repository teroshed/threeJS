/**
 * 🎮 EVENT HANDLERS - Main orchestrator
 * 
 * Imports and coordinates all event handler modules
 */

import { setEffectsManager as setUtilsManager } from './effect-control-utils.js';
import { setEffectsManager as setGlobalManager } from './event-handlers/global-controls-handlers.js';
import { setupPanelToggles } from './event-handlers/panel-handlers.js';
import { setupClickSnakeControls, setupDragSpiralControls } from './event-handlers/click-effects-handlers.js';
import { setupRandomCubesControls, setupCameraOrbitControls, setupKaleidoscopeControls, setupSupershapeControls, setupSimulatedDragControls } from './event-handlers/idle-effects-handlers.js';
import { setupGlobalControls } from './event-handlers/global-controls-handlers.js';

let effectsManager = null;

export function setEffectsManager(manager) {
    effectsManager = manager;
    // Pass to all sub-modules
    setUtilsManager(manager);
    setGlobalManager(manager);
}

export function setupAllEventListeners() {
    setupPanelToggles();
    setupClickSnakeControls();
    setupDragSpiralControls();
    setupRandomCubesControls();
    setupCameraOrbitControls();
    setupKaleidoscopeControls();
    setupSupershapeControls();
    setupSimulatedDragControls();
    setupGlobalControls();
}

// Re-export for backward compatibility
export { setupPanelToggles } from './event-handlers/panel-handlers.js';
export { setupClickSnakeControls, setupDragSpiralControls } from './event-handlers/click-effects-handlers.js';
export { setupRandomCubesControls, setupCameraOrbitControls, setupKaleidoscopeControls, setupSupershapeControls, setupSimulatedDragControls } from './event-handlers/idle-effects-handlers.js';
export { setupGlobalControls } from './event-handlers/global-controls-handlers.js';