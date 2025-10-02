/**
 * 🎨 COLOR PALETTES
 * 
 * Reusable color palettes for effects
 */

export const COLOR_PALETTE_KEYS = {
    RAINBOW: 'rainbow',
    FIRE: 'fire',
    OCEAN: 'ocean',
    FOREST: 'forest',
    SUNSET: 'sunset',
    PURPLE_HAZE: 'purple-haze',
    NEON: 'neon',
    MONOCHROME: 'monochrome',
    PASTEL: 'pastel',
    CYBERPUNK: 'cyberpunk'
};

export const COLOR_PALETTES = {
    'rainbow': {
        name: 'Rainbow',
        emoji: '🌈',
        colors: ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3'],
        mode: 'cycle',  // 'cycle' = shift through colors, 'random' = pick random
        description: 'Full spectrum rainbow'
    },
    'fire': {
        name: 'Fire',
        emoji: '🔥',
        colors: ['#ff0000', '#ff4500', '#ff6347', '#ff7f50', '#ffa500', '#ffb347'],
        mode: 'cycle',
        description: 'Hot reds and oranges'
    },
    'ocean': {
        name: 'Ocean',
        emoji: '🌊',
        colors: ['#000080', '#0000cd', '#1e90ff', '#00bfff', '#87ceeb', '#b0e0e6'],
        mode: 'cycle',
        description: 'Cool blues and cyans'
    },
    'forest': {
        name: 'Forest',
        emoji: '🌲',
        colors: ['#013220', '#228b22', '#32cd32', '#90ee90', '#98fb98', '#adff2f'],
        mode: 'cycle',
        description: 'Natural greens'
    },
    'sunset': {
        name: 'Sunset',
        emoji: '🌅',
        colors: ['#ff1493', '#ff69b4', '#ff8c00', '#ffa500', '#ffb6c1', '#ffc0cb'],
        mode: 'cycle',
        description: 'Warm pinks and oranges'
    },
    'purple-haze': {
        name: 'Purple Haze',
        emoji: '💜',
        colors: ['#4b0082', '#8b00ff', '#9370db', '#ba55d3', '#da70d6', '#ee82ee'],
        mode: 'cycle',
        description: 'Deep purples and violets'
    },
    'neon': {
        name: 'Neon',
        emoji: '⚡',
        colors: ['#ff00ff', '#00ffff', '#ffff00', '#ff1493', '#00ff00', '#ff4500'],
        mode: 'random',
        description: 'Bright electric colors'
    },
    'monochrome': {
        name: 'Monochrome',
        emoji: '⚫',
        colors: ['#000000', '#404040', '#808080', '#c0c0c0', '#ffffff'],
        mode: 'cycle',
        description: 'Black to white gradient'
    },
    'pastel': {
        name: 'Pastel',
        emoji: '🎀',
        colors: ['#ffb3ba', '#ffdfba', '#ffffba', '#baffc9', '#bae1ff', '#e0bbff'],
        mode: 'random',
        description: 'Soft pastel tones'
    },
    'cyberpunk': {
        name: 'Cyberpunk',
        emoji: '🤖',
        colors: ['#ff006e', '#fb5607', '#ffbe0b', '#8338ec', '#3a86ff', '#06ffa5'],
        mode: 'random',
        description: 'High-tech neon vibes'
    }
};

/**
 * Get color from palette based on index/counter
 * @param {string} paletteKey - Key from COLOR_PALETTE_KEYS
 * @param {number} counter - Counter for color cycling
 * @returns {string} Hex color string
 */
export function getColorFromPalette(paletteKey, counter = 0) {
    const palette = COLOR_PALETTES[paletteKey];
    if (!palette) return '#ffffff';
    
    if (palette.mode === 'random') {
        const randomIndex = Math.floor(Math.random() * palette.colors.length);
        return palette.colors[randomIndex];
    } else {
        // Cycle mode
        const index = counter % palette.colors.length;
        return palette.colors[index];
    }
}

/**
 * Create a color palette preview grid (like gradient grid)
 * @param {string} containerId - ID of container element
 * @param {string} currentPalette - Currently selected palette key
 * @param {function} onSelect - Callback when palette is selected
 */
export function createColorPaletteGrid(containerId, currentPalette, onSelect) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    container.className = 'color-palette-grid';
    
    Object.entries(COLOR_PALETTES).forEach(([key, palette]) => {
        const option = document.createElement('div');
        option.className = 'palette-option';
        option.dataset.palette = key;
        
        if (key === currentPalette) {
            option.classList.add('selected');
        }
        
        // Create preview with color swatches
        const preview = document.createElement('div');
        preview.className = 'palette-preview';
        
        palette.colors.forEach(color => {
            const swatch = document.createElement('div');
            swatch.className = 'palette-swatch';
            swatch.style.backgroundColor = color;
            preview.appendChild(swatch);
        });
        
        const label = document.createElement('div');
        label.className = 'palette-label';
        label.innerHTML = `<span>${palette.emoji}</span><span>${palette.name}</span>`;
        
        option.appendChild(preview);
        option.appendChild(label);
        container.appendChild(option);
        
        // Click handler
        option.addEventListener('click', () => {
            document.querySelectorAll('.palette-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            option.classList.add('selected');
            if (onSelect) onSelect(key);
        });
    });
    
    console.log('🎨 Created color palette grid');
}

