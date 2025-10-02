/**
 * 🎨 Gradient Manager - Background gradient system
 */

import * as THREE from 'three';
import { BACKGROUND_GRADIENTS, GRADIENT_DIRECTIONS } from './ui-constants.js';
import { UI_DEFAULTS } from './ui-defaults.js';

export let currentGradient = UI_DEFAULTS.defaultBackground;
export let currentDirection = UI_DEFAULTS.gradientDirection;
export let currentOpacity = UI_DEFAULTS.gradientOpacity;
export let currentAngle = UI_DEFAULTS.gradientAngle;

let scene = null;

export function initGradientManager(sceneRef) {
    scene = sceneRef;
}

export function setGradient(key) {
    currentGradient = key;
}

export function setDirection(dir) {
    currentDirection = dir;
}

export function setOpacity(opacity) {
    currentOpacity = opacity;
}

export function setAngle(angle) {
    currentAngle = angle;
}

export function getGradientCSS(colors, direction) {
    if (direction === 'radial') {
        if (colors.length === 1) {
            return `radial-gradient(circle, ${colors[0]}, ${colors[0]})`;
        } else if (colors.length === 2) {
            return `radial-gradient(circle, ${colors[0]}, ${colors[1]})`;
        } else {
            const colorStops = colors.map((color, i) => 
                `${color} ${(i / (colors.length - 1) * 100).toFixed(0)}%`
            ).join(', ');
            return `radial-gradient(circle, ${colorStops})`;
        }
    } else {
        // ALWAYS use the current angle slider value!
        const angle = currentAngle;
        
        if (colors.length === 1) {
            return `linear-gradient(${angle}deg, ${colors[0]}, ${colors[0]})`;
        } else if (colors.length === 2) {
            return `linear-gradient(${angle}deg, ${colors[0]}, ${colors[1]})`;
        } else {
            const colorStops = colors.map((color, i) => 
                `${color} ${(i / (colors.length - 1) * 100).toFixed(0)}%`
            ).join(', ');
            return `linear-gradient(${angle}deg, ${colorStops})`;
        }
    }
}

export function applyGradientBackground(gradientKey) {
    const gradient = BACKGROUND_GRADIENTS[gradientKey];
    if (!gradient || !scene) return;

    const colors = gradient.colors;
    
    // Create gradient texture
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Create gradient based on direction
    let grd;
    
    if (currentDirection === 'radial') {
        grd = ctx.createRadialGradient(256, 256, 0, 256, 256, 512);
    } else {
        // ALWAYS use the current angle slider value!
        const angle = currentAngle;
        const rad = (angle * Math.PI) / 180;
        const x1 = 256 - Math.cos(rad) * 256;
        const y1 = 256 - Math.sin(rad) * 256;
        const x2 = 256 + Math.cos(rad) * 256;
        const y2 = 256 + Math.sin(rad) * 256;
        grd = ctx.createLinearGradient(x1, y1, x2, y2);
    }
    
    // Add color stops
    if (colors.length === 1) {
        grd.addColorStop(0, colors[0]);
        grd.addColorStop(1, colors[0]);
    } else if (colors.length === 2) {
        grd.addColorStop(0, colors[0]);
        grd.addColorStop(1, colors[1]);
    } else {
        colors.forEach((color, i) => {
            grd.addColorStop(i / (colors.length - 1), color);
        });
    }

    // Fill with gradient
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Apply opacity as a blend overlay
    if (currentOpacity < 1) {
        ctx.globalAlpha = 1 - currentOpacity;
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Apply to scene
    const texture = new THREE.CanvasTexture(canvas);
    scene.background = texture;

    currentGradient = gradientKey;
    console.log(`🎨 Applied gradient: ${gradient.name} ${gradient.emoji} (direction: ${currentDirection}, opacity: ${currentOpacity}, angle: ${currentAngle}°)`);
}

export function updateGradientPreviews() {
    // Update all gradient previews to reflect current angle
    document.querySelectorAll('.gradient-option').forEach(option => {
        const key = option.dataset.gradient;
        const gradient = BACKGROUND_GRADIENTS[key];
        const preview = option.querySelector('.gradient-preview');
        preview.style.background = getGradientCSS(gradient.colors, currentDirection);
    });
}
