/**
 * 🎯 AUDIO ENUMS
 * 
 * Type-safe enums for audio analysis and visualization
 */

// 🎵 Audio Analysis Types
export const AUDIO_ANALYSIS_TYPES = {
    FREQUENCY: 'frequency',
    TIME_DOMAIN: 'time_domain',
    BEAT_DETECTION: 'beat_detection',
    VOLUME: 'volume',
    SPECTRUM: 'spectrum'
};

// 🎵 Audio Analysis Type Descriptions
export const AUDIO_ANALYSIS_INFO = {
    [AUDIO_ANALYSIS_TYPES.FREQUENCY]: {
        name: 'Frequency Analysis',
        description: 'Analyze frequency components',
        emoji: '📊'
    },
    [AUDIO_ANALYSIS_TYPES.TIME_DOMAIN]: {
        name: 'Time Domain',
        description: 'Analyze amplitude over time',
        emoji: '📈'
    },
    [AUDIO_ANALYSIS_TYPES.BEAT_DETECTION]: {
        name: 'Beat Detection',
        description: 'Detect rhythmic patterns',
        emoji: '🥁'
    },
    [AUDIO_ANALYSIS_TYPES.VOLUME]: {
        name: 'Volume Level',
        description: 'Overall audio volume',
        emoji: '🔊'
    },
    [AUDIO_ANALYSIS_TYPES.SPECTRUM]: {
        name: 'Spectrum Analysis',
        description: 'Full frequency spectrum',
        emoji: '🌈'
    }
};

// 🎵 Frequency Bands
export const FREQUENCY_BANDS = {
    BASS: 'bass',
    LOW_MID: 'low_mid',
    MID: 'mid',
    HIGH_MID: 'high_mid',
    TREBLE: 'treble',
    PRESENCE: 'presence',
    BRILLIANCE: 'brilliance'
};

// 🎵 Frequency Band Ranges (Hz)
export const FREQUENCY_BAND_RANGES = {
    [FREQUENCY_BANDS.BASS]: { min: 20, max: 250, name: 'Bass', emoji: '🔊' },
    [FREQUENCY_BANDS.LOW_MID]: { min: 250, max: 500, name: 'Low Mid', emoji: '🎵' },
    [FREQUENCY_BANDS.MID]: { min: 500, max: 2000, name: 'Mid', emoji: '🎶' },
    [FREQUENCY_BANDS.HIGH_MID]: { min: 2000, max: 4000, name: 'High Mid', emoji: '🎼' },
    [FREQUENCY_BANDS.TREBLE]: { min: 4000, max: 8000, name: 'Treble', emoji: '🔔' },
    [FREQUENCY_BANDS.PRESENCE]: { min: 8000, max: 12000, name: 'Presence', emoji: '✨' },
    [FREQUENCY_BANDS.BRILLIANCE]: { min: 12000, max: 20000, name: 'Brilliance', emoji: '💎' }
};

// 🎵 Beat Detection Algorithms
export const BEAT_DETECTION_ALGORITHMS = {
    SIMPLE_THRESHOLD: 'simple_threshold',
    ADAPTIVE_THRESHOLD: 'adaptive_threshold',
    FREQUENCY_WEIGHTED: 'frequency_weighted',
    ENERGY_BASED: 'energy_based',
    SPECTRAL_FLUX: 'spectral_flux'
};

// 🎵 Beat Detection Algorithm Descriptions
export const BEAT_DETECTION_INFO = {
    [BEAT_DETECTION_ALGORITHMS.SIMPLE_THRESHOLD]: {
        name: 'Simple Threshold',
        description: 'Basic volume threshold detection',
        emoji: '📏'
    },
    [BEAT_DETECTION_ALGORITHMS.ADAPTIVE_THRESHOLD]: {
        name: 'Adaptive Threshold',
        description: 'Self-adjusting threshold',
        emoji: '🎯'
    },
    [BEAT_DETECTION_ALGORITHMS.FREQUENCY_WEIGHTED]: {
        name: 'Frequency Weighted',
        description: 'Weighted by frequency content',
        emoji: '⚖️'
    },
    [BEAT_DETECTION_ALGORITHMS.ENERGY_BASED]: {
        name: 'Energy Based',
        description: 'Based on energy changes',
        emoji: '⚡'
    },
    [BEAT_DETECTION_ALGORITHMS.SPECTRAL_FLUX]: {
        name: 'Spectral Flux',
        description: 'Advanced spectral analysis',
        emoji: '🌊'
    }
};

// 🎵 Audio Visualization Modes
export const AUDIO_VISUALIZATION_MODES = {
    BARS: 'bars',
    CIRCLE: 'circle',
    WAVE: 'wave',
    PARTICLE: 'particle',
    GEOMETRIC: 'geometric',
    ABSTRACT: 'abstract'
};

// 🎵 Audio Visualization Mode Descriptions
export const AUDIO_VISUALIZATION_INFO = {
    [AUDIO_VISUALIZATION_MODES.BARS]: {
        name: 'Frequency Bars',
        description: 'Classic frequency bar visualization',
        emoji: '📊'
    },
    [AUDIO_VISUALIZATION_MODES.CIRCLE]: {
        name: 'Circular Spectrum',
        description: 'Circular frequency display',
        emoji: '⭕'
    },
    [AUDIO_VISUALIZATION_MODES.WAVE]: {
        name: 'Waveform',
        description: 'Time-domain wave display',
        emoji: '🌊'
    },
    [AUDIO_VISUALIZATION_MODES.PARTICLE]: {
        name: 'Particle System',
        description: 'Particle-based visualization',
        emoji: '✨'
    },
    [AUDIO_VISUALIZATION_MODES.GEOMETRIC]: {
        name: 'Geometric Shapes',
        description: 'Geometric shape responses',
        emoji: '🔷'
    },
    [AUDIO_VISUALIZATION_MODES.ABSTRACT]: {
        name: 'Abstract Art',
        description: 'Abstract artistic visualization',
        emoji: '🎨'
    }
};

// 🎵 Audio File Formats
export const AUDIO_FILE_FORMATS = {
    MP3: 'mp3',
    WAV: 'wav',
    OGG: 'ogg',
    M4A: 'm4a',
    FLAC: 'flac',
    AAC: 'aac'
};

// 🎵 Audio File Format Descriptions
export const AUDIO_FILE_FORMAT_INFO = {
    [AUDIO_FILE_FORMATS.MP3]: {
        name: 'MP3',
        description: 'Compressed audio format',
        emoji: '🎵',
        mimeType: 'audio/mpeg'
    },
    [AUDIO_FILE_FORMATS.WAV]: {
        name: 'WAV',
        description: 'Uncompressed audio format',
        emoji: '🎼',
        mimeType: 'audio/wav'
    },
    [AUDIO_FILE_FORMATS.OGG]: {
        name: 'OGG',
        description: 'Open source audio format',
        emoji: '🔓',
        mimeType: 'audio/ogg'
    },
    [AUDIO_FILE_FORMATS.M4A]: {
        name: 'M4A',
        description: 'Apple audio format',
        emoji: '🍎',
        mimeType: 'audio/mp4'
    },
    [AUDIO_FILE_FORMATS.FLAC]: {
        name: 'FLAC',
        description: 'Lossless audio format',
        emoji: '💎',
        mimeType: 'audio/flac'
    },
    [AUDIO_FILE_FORMATS.AAC]: {
        name: 'AAC',
        description: 'Advanced audio codec',
        emoji: '🔊',
        mimeType: 'audio/aac'
    }
};

// 🎵 Audio Quality Levels
export const AUDIO_QUALITY_LEVELS = {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    ULTRA: 'ultra'
};

// 🎵 Audio Quality Level Descriptions
export const AUDIO_QUALITY_INFO = {
    [AUDIO_QUALITY_LEVELS.LOW]: {
        name: 'Low Quality',
        description: 'Fast processing, lower accuracy',
        emoji: '🐌',
        fftSize: 256,
        smoothingTimeConstant: 0.8
    },
    [AUDIO_QUALITY_LEVELS.MEDIUM]: {
        name: 'Medium Quality',
        description: 'Balanced performance and accuracy',
        emoji: '⚖️',
        fftSize: 512,
        smoothingTimeConstant: 0.7
    },
    [AUDIO_QUALITY_LEVELS.HIGH]: {
        name: 'High Quality',
        description: 'Better accuracy, more processing',
        emoji: '🚀',
        fftSize: 1024,
        smoothingTimeConstant: 0.6
    },
    [AUDIO_QUALITY_LEVELS.ULTRA]: {
        name: 'Ultra Quality',
        description: 'Maximum accuracy, intensive processing',
        emoji: '💎',
        fftSize: 2048,
        smoothingTimeConstant: 0.5
    }
};
