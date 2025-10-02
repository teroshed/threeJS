/**
 * 🎯 UI CONSTANTS
 * 
 * Enums, presets, and configuration options for the UI
 */

// 🎢 Z-Position Mode Enum (use these keys!)
export const Z_MODES = {
    SET: 'set',
    RANDOM: 'random',
    WAVE: 'wave',
    SPIRAL: 'spiral',
    PULSE: 'pulse',
    OSCILLATE: 'oscillate'
};

// 🎢 Z-Position Mode Descriptions
export const Z_MODE_INFO = {
    [Z_MODES.SET]: {
        name: 'Fixed',
        description: 'Cubes at fixed Z position'
    },
    [Z_MODES.RANDOM]: {
        name: 'Random',
        description: 'Random depth variation'
    },
    [Z_MODES.WAVE]: {
        name: 'Wave',
        description: 'Smooth sine wave pattern'
    },
    [Z_MODES.SPIRAL]: {
        name: 'Spiral',
        description: 'Spiraling depth effect'
    },
    [Z_MODES.PULSE]: {
        name: 'Pulse',
        description: 'Rhythmic depth pulsing'
    },
    [Z_MODES.OSCILLATE]: {
        name: 'Oscillate',
        description: 'Back and forth motion'
    }
};

// 🎨 Background Gradient Keys (Enum-style)
export const GRADIENT_KEYS = {
    MIDNIGHT: 'midnight',
    TWILIGHT: 'twilight',
    SUNSET: 'sunset',
    OCEAN: 'ocean',
    FOREST: 'forest',
    NEON: 'neon',
    AURORA: 'aurora',
    FIRE: 'fire',
    COSMIC: 'cosmic',
    PURE_BLACK: 'pure-black',
    PURE_WHITE: 'pure-white'
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
    'pure-black': {
        name: 'Pure Black',
        colors: ['#000000'],
        emoji: '⚫'
    },
    'pure-white': {
        name: 'Pure White',
        colors: ['#ffffff'],
        emoji: '⚪'
    }
};

// 🧭 Gradient Direction Keys (Enum-style)
export const DIRECTION_KEYS = {
    VERTICAL: 'vertical',
    HORIZONTAL: 'horizontal',
    DIAGONAL_TL: 'diagonal-tl',
    DIAGONAL_TR: 'diagonal-tr',
    RADIAL: 'radial'
};

// 🎯 Vertex Marker Shape Options
export const VERTEX_MARKER_SHAPES = {
    NONE: 'none',
    SPHERE: 'sphere',
    BOX: 'box'
};

// 🧭 Gradient Direction Options
export const GRADIENT_DIRECTIONS = {
    'vertical': { name: 'Vertical ↕️', angle: 0 },
    'horizontal': { name: 'Horizontal ↔️', angle: 90 },
    'diagonal-tl': { name: 'Diagonal ↖️', angle: 135 },
    'diagonal-tr': { name: 'Diagonal ↗️', angle: 45 },
    'radial': { name: 'Radial ⭕', angle: null }
};

