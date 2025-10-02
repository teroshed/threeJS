/**
 * 🌍 GLOBAL CONFIGURATION
 * 
 * This file contains global settings that are used across ALL effects.
 * It's separate from EffectsDefaults.js to avoid circular dependencies.
 * 
 * These values can be imported safely by base classes (Effect, IdleEffect, etc.)
 * without creating import cycles.
 */

// Import enums for type safety
import { VERTEX_MARKER_SHAPES } from '../ui/ui-constants.js';

const GLOBAL_CONFIG = {
    // Timing settings
    clickDelay: 30,      // ms delay between click events (0 = no delay)
    frameRate: 60,       // Target FPS
    
    // Visual settings (Note: linewidth is ignored by most browsers)
    outlineWidth: 100,     // Line width for cube outlines (ignored by WebGL)
    outlineOpacity: 0.6, // Opacity for cube outlines (0-1)
    outlineColor: 0x000000, // Color for cube outlines (hex)
    
    // Vertex markers (cubes/spheres at corners)
    useVertexMarkers: true,                    // Add small shapes at vertices
    vertexMarkerSize: 0.25,                    // Size multiplier relative to cube size (0.25 = 25% of cube)
    vertexMarkerShape: VERTEX_MARKER_SHAPES.BOX, // Using enum for type safety!
};

export default GLOBAL_CONFIG;

