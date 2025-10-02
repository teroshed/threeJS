/**
 * 🎯 UI ENUMS
 * 
 * Type-safe enums for UI components and visual settings
 */

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

// 🧭 Gradient Direction Options
export const GRADIENT_DIRECTIONS = {
    'vertical': { name: 'Vertical ↕️', angle: 0 },
    'horizontal': { name: 'Horizontal ↔️', angle: 90 },
    'diagonal-tl': { name: 'Diagonal ↖️', angle: 135 },
    'diagonal-tr': { name: 'Diagonal ↗️', angle: 45 },
    'radial': { name: 'Radial ⭕', angle: null }
};

// 🎯 Vertex Marker Shape Options
export const VERTEX_MARKER_SHAPES = {
    NONE: 'none',
    SPHERE: 'sphere',
    BOX: 'box'
};

// 🎯 Vertex Marker Shape Descriptions
export const VERTEX_MARKER_INFO = {
    [VERTEX_MARKER_SHAPES.NONE]: {
        name: 'None',
        description: 'No vertex markers',
        emoji: '❌'
    },
    [VERTEX_MARKER_SHAPES.SPHERE]: {
        name: 'Sphere',
        description: 'Spherical vertex markers',
        emoji: '⚪'
    },
    [VERTEX_MARKER_SHAPES.BOX]: {
        name: 'Box',
        description: 'Box-shaped vertex markers',
        emoji: '⬜'
    }
};

// 🎮 Control Types
export const CONTROL_TYPES = {
    RANGE: 'range',
    CHECKBOX: 'checkbox',
    SELECT: 'select',
    COLOR_PICKER: 'color_picker',
    BUTTON: 'button',
    TEXT_INPUT: 'text_input'
};

// 🎮 Control Type Descriptions
export const CONTROL_TYPE_INFO = {
    [CONTROL_TYPES.RANGE]: {
        name: 'Range Slider',
        description: 'Numeric value with min/max',
        emoji: '🎚️'
    },
    [CONTROL_TYPES.CHECKBOX]: {
        name: 'Checkbox',
        description: 'Boolean on/off toggle',
        emoji: '☑️'
    },
    [CONTROL_TYPES.SELECT]: {
        name: 'Select Dropdown',
        description: 'Choose from predefined options',
        emoji: '📋'
    },
    [CONTROL_TYPES.COLOR_PICKER]: {
        name: 'Color Picker',
        description: 'Choose color values',
        emoji: '🎨'
    },
    [CONTROL_TYPES.BUTTON]: {
        name: 'Button',
        description: 'Action trigger',
        emoji: '🔘'
    },
    [CONTROL_TYPES.TEXT_INPUT]: {
        name: 'Text Input',
        description: 'Text or number input',
        emoji: '📝'
    }
};

// 🎯 Panel Types
export const PANEL_TYPES = {
    SETTINGS: 'settings',
    AUDIO: 'audio',
    EFFECTS: 'effects',
    DEBUG: 'debug',
    HELP: 'help'
};

// 🎯 Panel Type Descriptions
export const PANEL_TYPE_INFO = {
    [PANEL_TYPES.SETTINGS]: {
        name: 'Settings',
        description: 'Global application settings',
        emoji: '⚙️'
    },
    [PANEL_TYPES.AUDIO]: {
        name: 'Audio',
        description: 'Audio controls and visualization',
        emoji: '🎵'
    },
    [PANEL_TYPES.EFFECTS]: {
        name: 'Effects',
        description: 'Visual effect controls',
        emoji: '✨'
    },
    [PANEL_TYPES.DEBUG]: {
        name: 'Debug',
        description: 'Development and debugging tools',
        emoji: '🐛'
    },
    [PANEL_TYPES.HELP]: {
        name: 'Help',
        description: 'Documentation and help',
        emoji: '❓'
    }
};
