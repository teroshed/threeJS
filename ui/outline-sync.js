/**
 * 📋 OUTLINE SYNCHRONIZATION
 * 
 * Syncs outline panel badges and states with actual effect states
 */

let effectsManager = null;

export function setEffectsManager(manager) {
    effectsManager = manager;
    // Initial sync on load
    syncAllBadges();
}

/**
 * Sync all effect badges with their current active states
 */
export function syncAllBadges() {
    if (!effectsManager) return;
    
    const allEffects = [...effectsManager.onClickEffects, ...effectsManager.idleEffects];
    
    allEffects.forEach(effect => {
        updateEffectBadge(effect.name, effect.active);
    });
    
    console.log('📋 All outline badges synced with effect states');
}

/**
 * Update a single effect's badge in the outline
 * @param {string} effectName - Name of the effect (e.g., "ClickSnake")
 * @param {boolean} isActive - Whether the effect is active
 */
export function updateEffectBadge(effectName, isActive) {
    const outlineItem = document.querySelector(`.outline-item[data-effect="${effectName}"]`);
    if (!outlineItem) return;
    
    const badge = outlineItem.querySelector('.outline-item-badge');
    if (!badge) return;
    
    if (isActive) {
        badge.textContent = 'ON';
        badge.style.display = 'inline-block';
    } else {
        badge.style.display = 'none';
    }
}

/**
 * Setup badge sync for a specific checkbox
 * @param {string} checkboxId - ID of the checkbox element
 * @param {string} effectName - Name of the effect
 */
export function setupBadgeSync(checkboxId, effectName) {
    const checkbox = document.getElementById(checkboxId);
    if (!checkbox) return;
    
    // Sync on checkbox change
    checkbox.addEventListener('change', (e) => {
        updateEffectBadge(effectName, e.target.checked);
    });
    
    // Initial sync based on checkbox state
    updateEffectBadge(effectName, checkbox.checked);
}

/**
 * Setup badge sync for all main panel checkboxes
 */
export function setupAllBadgeSyncs() {
    // Drag effects
    setupBadgeSync('clickSnakeActive', 'ClickSnake');
    setupBadgeSync('dragSpiralActive', 'DragSpiral');
    
    // Idle effects
    setupBadgeSync('randomCubesActive', 'RandomCubes');
    setupBadgeSync('cameraOrbitActive', 'CameraOrbit');
    setupBadgeSync('simulatedDragActive', 'SimulatedDrag');
    
    console.log('✅ Badge sync initialized for all effects');
}

