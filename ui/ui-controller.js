/**
 * 🎛️ UI Controller - Main UI orchestrator
 */

import { initGradientManager, applyGradientBackground } from './gradient-manager.js';
import { initializeUIValues, initOutlineSyncing } from './ui-init.js';
import { setupAllEventListeners, setEffectsManager } from './event-handlers.js';
import { initModalSystem } from './components/settings/settings-manager.js';
import { UI_DEFAULTS } from './ui-defaults.js';
import { initSettingsModal } from './components/settings/settings-modal.js';

// Export the main initialization function
export function initUI(manager, sceneRef, rendererRef) {



    
    // Initialize gradient manager with scene reference
    initGradientManager(sceneRef);
    
    // Set effects manager reference for event handlers
    setEffectsManager(manager);
    
    // Initialize outline badge syncing
    initOutlineSyncing(manager);
    
    // Initialize modal system
    initModalSystem();

    
    
    // Listen for category loads to re-initialize controls
    window.addEventListener('category-loaded', (e) => {
        const category = e.detail.category;
        console.log(`🔄 Reinitializing controls for: ${category}`);
        initializeUIValues();
        setupAllEventListeners();
    });
    
    // Initialize all UI values from defaults
    initializeUIValues();
    
    // Setup all event listeners
    setupAllEventListeners();
    
    // Apply initial background gradient
    applyGradientBackground(UI_DEFAULTS.defaultBackground);

    //Newly added by me
    initSettingsModal();
    
    console.log('🎛️ UI Controller initialized with grid navigation');
}
