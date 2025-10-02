// 🎭 MODAL MANAGER - Grid Navigation System

let modal;
let modalClose;
let gridView;
let settingsView;
let settingsContent;
let settingsTitle;
let backBtn;

export async function initModalSystem() {
    modal = document.getElementById('settingsModal');
    modalClose = document.getElementById('modalClose');
    gridView = document.getElementById('gridView');
    settingsView = document.getElementById('settingsView');
    settingsContent = document.getElementById('settingsContent');
    settingsTitle = document.getElementById('settingsTitle');
    backBtn = document.getElementById('backToGrid');

    // Load grid menu from external file
    await loadGridMenu();

    // Open modal button (cog in main panel)
    document.getElementById('openSettings')?.addEventListener('click', () => {
        openModal();
    });

    // Close modal
    modalClose?.addEventListener('click', closeModal);
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal?.classList.contains('active')) {
            closeModal();
        }
    });

    // Grid tile clicks (will be attached after grid loads)

    // Back button
    backBtn?.addEventListener('click', () => {
        showGridView();
    });

    // Outline item clicks (quick jump)
    document.querySelectorAll('.outline-item').forEach(item => {
        item.addEventListener('click', () => {
            const category = item.dataset.category;
            if (category) {
                openCategory(category);
            }
        });
    });

    // Outline section title clicks (category jump)
    document.querySelectorAll('.outline-section-title[data-category]').forEach(title => {
        title.addEventListener('click', () => {
            const category = title.dataset.category;
            if (category) {
                openCategory(category);
            }
        });
    });

    console.log('🎭 Modal system initialized with grid navigation');
}

async function loadGridMenu() {
    try {
        const response = await fetch('/ui/components/templates/grid-menu.html');
        if (response.ok) {
            const html = await response.text();
            gridView.innerHTML = html;
            console.log('✅ Loaded grid menu from external file');
            
            // Re-attach event listeners to the dynamically loaded tiles
            document.querySelectorAll('.menu-tile').forEach(tile => {
                tile.addEventListener('click', () => {
                    const category = tile.dataset.category;
                    openCategory(category);
                });
            });
        } else {
            console.warn('⚠️ Could not load grid-menu.html');
        }
    } catch (error) {
        console.error('❌ Error loading grid menu:', error);
    }
}

export function openModal() {
    if (modal) {
        modal.classList.add('active');
        showGridView();
    }
}

export function closeModal() {
    if (modal) {
        modal.classList.remove('active');
    }
}

function showGridView() {
    gridView?.classList.remove('hidden');
    settingsView?.classList.add('hidden');
}

function showSettingsView(categoryTitle) {
    gridView?.classList.add('hidden');
    settingsView?.classList.remove('hidden');
    if (settingsTitle) {
        settingsTitle.textContent = categoryTitle;
    }
}

async function openCategory(category) {
    // Set title based on category
    const titles = {
        'click-effects': '⚡ Click Effects',
        'drag-effects': '🖱️ Drag Effects',
        'idle-effects': '✨ Idle Effects',
        'global-settings': '🌍 Global Settings'
    };
    
    showSettingsView(titles[category] || 'Settings');
    
    // Try to load from external HTML file first
    const templatePath = `/ui/components/templates/${category}.html`;
    
    try {
        const response = await fetch(templatePath);
        if (response.ok) {
            const html = await response.text();
            settingsContent.innerHTML = html;
            console.log(`✅ Loaded ${category} from external file`);
            
            // Trigger re-initialization of controls for this category
            window.dispatchEvent(new CustomEvent('category-loaded', { detail: { category } }));
            return;
        }
    } catch (error) {
        console.log(`⚠️ External file not found, falling back to template`);
    }
    
    // Fallback to inline template
    const templateId = `${category}-template`;
    const template = document.getElementById(templateId);
    
    if (template && settingsContent) {
        settingsContent.innerHTML = template.innerHTML;
        console.log(`✅ Loaded ${category} from inline template`);
        
        // Trigger re-initialization of controls for this category
        window.dispatchEvent(new CustomEvent('category-loaded', { detail: { category } }));
    } else if (category === 'click-effects') {
        // Coming soon message
        settingsContent.innerHTML = `
            <div style="text-align: center; padding: 60px 20px;">
                <div style="font-size: 72px; margin-bottom: 20px;">⚡</div>
                <h3 style="color: #ffc107; margin-bottom: 10px;">Click Effects</h3>
                <p style="color: rgba(255,255,255,0.6);">Coming soon! Effects that trigger on single click.</p>
            </div>
        `;
        showSettingsView('⚡ Click Effects');
    }
}
