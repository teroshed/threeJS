/**
 * 🎨 UI DEFAULT VALUES
 * 
 * UI-specific defaults (backgrounds, panel state, UI toggles).
 * 
 * NOTE: Effect parameters (cubeSize, speed, etc.) are in effects/EffectsDefaults.js!
 * This file is ONLY for UI appearance and behavior settings.
 */

import { GRADIENT_KEYS, DIRECTION_KEYS } from './ui-constants.js';

export const UI_DEFAULTS = {
    // Background settings
    defaultBackground: GRADIENT_KEYS.TWILIGHT,      // Which gradient to show on load (enum!)
    gradientDirection: DIRECTION_KEYS.VERTICAL,     // Default gradient direction (enum!)
    gradientAngle: 140,                             // Default gradient angle (0-360)
    gradientOpacity: 0.65,                          // Default background opacity (0.0 - 1.0)
    
    // Panel state
    panelCollapsed: false,                          // Start with panel open/closed
    
    // Feature toggles
    rotationEnabled: true                           // Start with cube rotation on/off
};
