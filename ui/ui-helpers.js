/**
 * 🛠️ UI Helpers - Helper functions for UI controls
 */

export function setInputValue(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.value = value;
    }
}

export function setCheckboxValue(id, checked) {
    const element = document.getElementById(id);
    if (element) {
        element.checked = checked;
    }
}

export function setupRangeControl(inputId, valueId, callback, formatter = null) {
    const input = document.getElementById(inputId);
    const valueDisplay = document.getElementById(valueId);
    
    if (input && valueDisplay) {
        input.addEventListener('input', (e) => {
            const value = e.target.value;
            // Use formatter if provided, otherwise just display the value
            valueDisplay.textContent = formatter ? formatter(value) : value;
            callback(value);
        });
    }
}

export function setupCheckbox(inputId, callback) {
    const input = document.getElementById(inputId);
    
    if (input) {
        input.addEventListener('change', (e) => {
            callback(e.target.checked);
        });
    }
}

export function setupColorPicker(inputId, callback) {
    const input = document.getElementById(inputId);
    
    if (input) {
        input.addEventListener('input', (e) => {
            callback(e.target.value);
        });
    }
}

export function toggleRotationSlider(prefix, enabled) {
    const sliderGroup = document.getElementById(`${prefix}RotationSliderGroup`);
    if (sliderGroup) {
        sliderGroup.style.display = enabled ? 'block' : 'none';
    }
}

