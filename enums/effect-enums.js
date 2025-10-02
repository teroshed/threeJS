/**
 * 🎯 EFFECT ENUMS
 * 
 * Type-safe enums for effect parameters and configurations
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

// 🎨 Effect Types
export const EFFECT_TYPES = {
    CLICK: 'click',
    IDLE: 'idle',
    AUDIO: 'audio'
};

// 🎨 Effect Categories
export const EFFECT_CATEGORIES = {
    VISUAL: 'visual',
    ANIMATION: 'animation',
    INTERACTION: 'interaction',
    AUDIO_RESPONSIVE: 'audio_responsive'
};

// 🎯 Pattern Types (for SimulatedDrag and similar effects)
export const PATTERN_TYPES = {
    CIRCLE: 'circle',
    LINE: 'line',
    SPIRAL: 'spiral',
    FIGURE8: 'figure8',
    LISSAJOUS: 'lissajous',
    RANDOM: 'random',
    SQUARE: 'square',
    TRIANGLE: 'triangle'
};

// 🎯 Pattern Type Descriptions
export const PATTERN_INFO = {
    [PATTERN_TYPES.CIRCLE]: {
        name: 'Circle',
        description: 'Smooth circular motion',
        emoji: '⭕'
    },
    [PATTERN_TYPES.LINE]: {
        name: 'Line',
        description: 'Straight line movement',
        emoji: '📏'
    },
    [PATTERN_TYPES.SPIRAL]: {
        name: 'Spiral',
        description: 'Spiraling outward motion',
        emoji: '🌀'
    },
    [PATTERN_TYPES.FIGURE8]: {
        name: 'Figure 8',
        description: 'Infinity symbol pattern',
        emoji: '♾️'
    },
    [PATTERN_TYPES.LISSAJOUS]: {
        name: 'Lissajous',
        description: 'Complex harmonic curves',
        emoji: '🌊'
    },
    [PATTERN_TYPES.RANDOM]: {
        name: 'Random',
        description: 'Random walk pattern',
        emoji: '🎲'
    },
    [PATTERN_TYPES.SQUARE]: {
        name: 'Square',
        description: 'Square wave pattern',
        emoji: '⬜'
    },
    [PATTERN_TYPES.TRIANGLE]: {
        name: 'Triangle',
        description: 'Triangular wave pattern',
        emoji: '🔺'
    }
};

// 🎨 Color Modes
export const COLOR_MODES = {
    RANDOM: 'random',
    FIXED: 'fixed',
    GRADIENT: 'gradient',
    AUDIO_RESPONSIVE: 'audio_responsive',
    TIME_BASED: 'time_based'
};

// 🎨 Color Mode Descriptions
export const COLOR_MODE_INFO = {
    [COLOR_MODES.RANDOM]: {
        name: 'Random',
        description: 'Random colors for each cube',
        emoji: '🌈'
    },
    [COLOR_MODES.FIXED]: {
        name: 'Fixed',
        description: 'Single color for all cubes',
        emoji: '🎨'
    },
    [COLOR_MODES.GRADIENT]: {
        name: 'Gradient',
        description: 'Smooth color transitions',
        emoji: '🌅'
    },
    [COLOR_MODES.AUDIO_RESPONSIVE]: {
        name: 'Audio Responsive',
        description: 'Colors change with audio',
        emoji: '🎵'
    },
    [COLOR_MODES.TIME_BASED]: {
        name: 'Time Based',
        description: 'Colors change over time',
        emoji: '⏰'
    }
};

// 🎯 Animation Easing Types
export const EASING_TYPES = {
    LINEAR: 'linear',
    EASE_IN: 'ease_in',
    EASE_OUT: 'ease_out',
    EASE_IN_OUT: 'ease_in_out',
    BOUNCE: 'bounce',
    ELASTIC: 'elastic',
    BACK: 'back'
};

// 🎯 Animation Easing Descriptions
export const EASING_INFO = {
    [EASING_TYPES.LINEAR]: {
        name: 'Linear',
        description: 'Constant speed',
        emoji: '📈'
    },
    [EASING_TYPES.EASE_IN]: {
        name: 'Ease In',
        description: 'Slow start, fast end',
        emoji: '🚀'
    },
    [EASING_TYPES.EASE_OUT]: {
        name: 'Ease Out',
        description: 'Fast start, slow end',
        emoji: '🛑'
    },
    [EASING_TYPES.EASE_IN_OUT]: {
        name: 'Ease In Out',
        description: 'Slow start and end',
        emoji: '🌊'
    },
    [EASING_TYPES.BOUNCE]: {
        name: 'Bounce',
        description: 'Bouncing motion',
        emoji: '⚽'
    },
    [EASING_TYPES.ELASTIC]: {
        name: 'Elastic',
        description: 'Elastic spring motion',
        emoji: '🪀'
    },
    [EASING_TYPES.BACK]: {
        name: 'Back',
        description: 'Overshoot and settle',
        emoji: '↩️'
    }
};

// 🎯 Spawn Modes (for particle effects)
export const SPAWN_MODES = {
    CONTINUOUS: 'continuous',
    BURST: 'burst',
    WAVE: 'wave',
    RANDOM: 'random',
    AUDIO_TRIGGERED: 'audio_triggered'
};

// 🎯 Spawn Mode Descriptions
export const SPAWN_MODE_INFO = {
    [SPAWN_MODES.CONTINUOUS]: {
        name: 'Continuous',
        description: 'Steady stream of particles',
        emoji: '🌊'
    },
    [SPAWN_MODES.BURST]: {
        name: 'Burst',
        description: 'Sudden burst of particles',
        emoji: '💥'
    },
    [SPAWN_MODES.WAVE]: {
        name: 'Wave',
        description: 'Wave-like spawning pattern',
        emoji: '🌊'
    },
    [SPAWN_MODES.RANDOM]: {
        name: 'Random',
        description: 'Random timing intervals',
        emoji: '🎲'
    },
    [SPAWN_MODES.AUDIO_TRIGGERED]: {
        name: 'Audio Triggered',
        description: 'Spawn based on audio beats',
        emoji: '🎵'
    }
};
