/**
 * 🎭 Modal Manager - Handle modal open/close and tab switching
 */

let currentTab = 'click-effects';

export function initModalSystem() {
    const modal = document.getElementById('settingsModal');
    const modalClose = document.getElementById('modalClose');
    const cogButtons = document.querySelectorAll('.cog-btn');
    const tabs = document.querySelectorAll('.modal-tab');

    // Cog buttons open modal to specific tab
    cogButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const targetTab = btn.dataset.modal;
            openModal(targetTab);
        });
    });

    // Close button
    modalClose?.addEventListener('click', closeModal);

    // Click outside to close
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Tab switching
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;
            switchTab(targetTab);
        });
    });

    console.log('🎭 Modal system initialized');
}

export function openModal(tabName = null) {
    const modal = document.getElementById('settingsModal');
    
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
        
        if (tabName) {
            switchTab(tabName);
        }
        
        console.log(`📂 Modal opened${tabName ? ` to tab: ${tabName}` : ''}`);
    }
}

export function closeModal() {
    const modal = document.getElementById('settingsModal');
    
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scroll
        console.log('📂 Modal closed');
    }
}

export function switchTab(tabName) {
    currentTab = tabName;

    // Update tab buttons
    document.querySelectorAll('.modal-tab').forEach(tab => {
        if (tab.dataset.tab === tabName) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        if (content.id === tabName) {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    });

    console.log(`📑 Switched to tab: ${tabName}`);
}

export function getCurrentTab() {
    return currentTab;
}

