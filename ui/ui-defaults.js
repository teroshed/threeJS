/**
 * 🎨 UI DEFAULT VALUES
 * 
 * THE single place to change UI defaults!
 * Change anything here and it updates everywhere instantly.
 */

import { Z_MODES } from './ui-constants.js';

export const UI_DEFAULTS = {
    // Background settings
    defaultBackground: 'twilight',              // Which gradient to show on load
    gradientDirection: 'vertical',              // Default gradient direction  
    gradientAngle: 140,                         // Default gradient angle (0-360)
    gradientOpacity: 0.65,                      // Default background opacity (0.0 - 1.0)
    
    // Panel state
    panelCollapsed: false,                      // Start with panel open/closed
    
    // Feature toggles
    rotationEnabled: true                       // Start with cube rotation on/off
};
