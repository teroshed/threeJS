/**
 * ⚙️ UI OPTIONS - SINGLE SOURCE OF TRUTH FOR UI DEFAULTS
 * 
 * Change ANY UI default here - everything updates automatically!
 * This is THE place to configure the control panel behavior.
 */

// 🎨 Default UI State
export const UI_DEFAULTS = {
    // Background settings
    defaultBackground: 'twilight',    // Which gradient to show on load
    gradientDirection: 'vertical',    // Default gradient direction
    gradientOpacity: 1.0,             // Default background opacity (0.0 - 1.0)
    
    // Effect defaults
    defaultZMode: 'random',           // Default Z-position mode for ClickSnake
    
    // Panel state
    panelCollapsed: false             // Start with panel open/closed
};

// 🎢 Z-Position Modes
export const Z_MODES = {
    'set': {
        name: 'Fixed',
        description: 'Cubes at fixed Z position'
    },
    'random': {
        name: 'Random',
        description: 'Random depth variation'
    },
    'wave': {
        name: 'Wave',
        description: 'Smooth sine wave pattern'
    },
    'spiral': {
        name: 'Spiral',
        description: 'Spiraling depth effect'
    },
    'pulse': {
        name: 'Pulse',
        description: 'Rhythmic depth pulsing'
    },
    'oscillate': {
        name: 'Oscillate',
        description: 'Back and forth motion'
    }
};

// 🎨 Background Gradient Presets
export const BACKGROUND_GRADIENTS = {
    'midnight': {
        name: 'Midnight',
        colors: ['#0f0c29', '#302b63', '#24243e'],
        emoji: '🌃'
    },
    'twilight': {
        name: 'Twilight',
        colors: ['#667eea', '#764ba2', '#f093fb'],
        emoji: '🌆'
    },
    'sunset': {
        name: 'Sunset',
        colors: ['#ff6b6b', '#ee5a24', '#f79f1f'],
        emoji: '🌅'
    },
    'ocean': {
        name: 'Ocean',
        colors: ['#0575e6', '#021b79', '#00d2ff'],
        emoji: '🌊'
    },
    'forest': {
        name: 'Forest',
        colors: ['#134e5e', '#71b280', '#2c3e50'],
        emoji: '🌲'
    },
    'neon': {
        name: 'Neon',
        colors: ['#ff00cc', '#3333ff', '#00ffff'],
        emoji: '💜'
    },
    'aurora': {
        name: 'Aurora',
        colors: ['#00c6ff', '#0072ff', '#00fff2'],
        emoji: '🌌'
    },
    'fire': {
        name: 'Fire',
        colors: ['#f12711', '#f5af19', '#ff6b6b'],
        emoji: '🔥'
    },
    'cosmic': {
        name: 'Cosmic',
        colors: ['#360033', '#0b8793', '#d31027'],
        emoji: '🪐'
    },
    'pure': {
        name: 'Pure Black',
        colors: ['#000000', '#000000', '#000000'],
        emoji: '⚫'
    }
};

// 🧭 Gradient Direction Options
export const GRADIENT_DIRECTIONS = {
    'vertical': { name: 'Vertical ↕️', angle: 0 },
    'horizontal': { name: 'Horizontal ↔️', angle: 90 },
    'diagonal-tl': { name: 'Diagonal ↖️', angle: 135 },
    'diagonal-tr': { name: 'Diagonal ↗️', angle: 45 },
    'radial': { name: 'Radial ⭕', angle: null }
};

