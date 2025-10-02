/**
 * 🎚️ Slider Utilities - Magic slider calculations
 */

/**
 * Calculate smart slider range based on default value
 * Range is default * 0.1 to default * 5 (or sensible overrides)
 */
export function calculateSliderRange(defaultValue, overrides = {}) {
    if (overrides.min !== undefined && overrides.max !== undefined) {
        return { min: overrides.min, max: overrides.max, step: overrides.step || 'auto' };
    }

    let min, max, step;

    if (defaultValue === 0) {
        // Special case for zero defaults
        min = 0;
        max = overrides.max || 1;
        step = 0.01;
    } else if (defaultValue < 1 && defaultValue > 0) {
        // Small decimal values
        min = Math.max(0, defaultValue * 0.1);
        max = defaultValue * 5;
        step = Math.max(0.001, defaultValue * 0.1);
    } else if (defaultValue < 0) {
        // Negative values
        min = defaultValue * 5;
        max = Math.abs(defaultValue) * 5;
        step = Math.max(0.1, Math.abs(defaultValue) * 0.1);
    } else {
        // Larger integer values
        min = Math.max(1, Math.floor(defaultValue * 0.1));
        max = Math.ceil(defaultValue * 5);
        step = Math.max(1, Math.floor(defaultValue * 0.05));
    }

    return {
        min: overrides.min ?? min,
        max: overrides.max ?? max,
        step: overrides.step ?? step
    };
}

export function setupSmartSlider(id, defaultValue, overrides = {}) {
    const input = document.getElementById(id);
    const valueDisplay = document.getElementById(id + 'Value');
    
    if (input && valueDisplay) {
        const range = calculateSliderRange(defaultValue, overrides);
        
        input.min = range.min;
        input.max = range.max;
        input.step = range.step;
        input.value = defaultValue;
        
        valueDisplay.textContent = defaultValue;
        
        console.log(`📊 Smart slider [${id}]: min=${range.min}, max=${range.max}, step=${range.step}, default=${defaultValue}`);
    }
}

