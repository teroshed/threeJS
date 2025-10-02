/**
 * 🎛️ PANEL EVENT HANDLERS
 * 
 * Handles panel toggle and navigation controls
 */

export function setupPanelToggles() {
    const closeBtn = document.getElementById('closePanel');
    const toggleBtn = document.getElementById('togglePanel');
    const panel = document.getElementById('controlPanel');

    closeBtn?.addEventListener('click', () => {
        panel.classList.add('collapsed');
    });

    toggleBtn?.addEventListener('click', () => {
        panel.classList.remove('collapsed');
    });
}
