/**
 * 🎛️ UI Controller - Main UI orchestrator
 */

import { initGradientManager, applyGradientBackground } from './gradient-manager.js';
import { initializeUIValues } from './ui-init.js';
import { setupAllEventListeners, setEffectsManager } from './event-handlers.js';
import { initModalSystem } from './modal-manager.js';
import { UI_DEFAULTS } from './ui-defaults.js';

// Export the main initialization function
export function initUI(manager, sceneRef, rendererRef) {
    // Initialize gradient manager with scene reference
    initGradientManager(sceneRef);
    
    // Set effects manager reference for event handlers
    setEffectsManager(manager);
    
    // Initialize modal system
    initModalSystem();
    
    // Initialize all UI values from defaults
    initializeUIValues();
    
    // Setup all event listeners
    setupAllEventListeners();
    
    // Apply initial background gradient
    applyGradientBackground(UI_DEFAULTS.defaultBackground);
    
    console.log('🎛️ UI Controller initialized');
}
