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

    // Open modal buttons (cog buttons in main panel)
    document.querySelectorAll('.cog-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;
            if (category) {
                // Open directly to that category
                openModal();
                if (category === 'drag') {
                    openCategory('drag-effects');
                } else if (category === 'idle') {
                    openCategory('idle-effects');
                }
            } else {
                // Old behavior - open to grid
                openModal();
            }
        });
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

    // Outline item clicks (quick jump + scroll)
    document.querySelectorAll('.outline-item').forEach(item => {
        item.addEventListener('click', () => {
            const category = item.dataset.category;
            const effectName = item.dataset.effect;
            const sectionName = item.dataset.section;
            
            if (category) {
                openCategory(category).then(() => {
                    // Scroll to specific effect or section after category loads
                    if (effectName) {
                        scrollToEffect(effectName);
                    } else if (sectionName) {
                        scrollToSection(sectionName);
                    }
                });
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
        const response = await fetch('/ui/components/settings/grid/templates/grid-menu.html');
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
    
    // Update outline active states
    updateOutlineActiveState(category);
    
    // Map category names to file paths
    const pathMap = {
        'click-effects': '/ui/components/settings/effects/click/templates/click-effects.html',
        'drag-effects': '/ui/components/settings/effects/drag/templates/drag-effects.html',
        'idle-effects': '/ui/components/settings/effects/idle/templates/idle-effects.html',
        'global-settings': '/ui/components/settings/effects/global/templates/global-settings.html'
    };
    
    const templatePath = pathMap[category];
    
    try {
        const response = await fetch(templatePath);
        if (response.ok) {
            const html = await response.text();
            settingsContent.innerHTML = html;
            console.log(`✅ Loaded ${category} from external file`);
            
            // Initialize drag-effects specific UI
            if (category === 'drag-effects') {
                await initDragEffectsUI();
            }
            
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
    } else {
        console.warn(`⚠️ No template found for ${category}`);
    }
}

/**
 * Update outline item active states based on current category
 */
function updateOutlineActiveState(category) {
    // Remove active from all outline items
    document.querySelectorAll('.outline-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active to first item in current category
    const categoryItems = document.querySelectorAll(`.outline-item[data-category="${category}"]`);
    if (categoryItems.length > 0) {
        categoryItems[0].classList.add('active');
    }
    
    console.log(`📋 Outline updated for category: ${category}`);
}

/**
 * Scroll to a specific effect section in settings
 */
function scrollToEffect(effectName) {
    setTimeout(() => {
        // Try multiple selectors to find the effect section
        const section = document.querySelector(`[data-effect-section="${effectName}"]`) ||
                       document.querySelector(`h4:has-text("${effectName}")`) ||
                       Array.from(document.querySelectorAll('h4')).find(h4 => 
                           h4.textContent.includes(effectName)
                       );
        
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            console.log(`📜 Scrolled to effect: ${effectName}`);
        }
    }, 100); // Wait for content to render
}

/**
 * Scroll to a specific section in global settings
 */
function scrollToSection(sectionName) {
    setTimeout(() => {
        // Try to find section by data attribute or heading text
        const section = document.querySelector(`[data-section="${sectionName}"]`) ||
                       Array.from(document.querySelectorAll('h4')).find(h4 => 
                           h4.textContent.toLowerCase().includes(sectionName.toLowerCase())
                       );
        
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            console.log(`📜 Scrolled to section: ${sectionName}`);
        }
    }, 100);
}

// Initialize drag effects specific UI elements (color palettes, etc.)
async function initDragEffectsUI() {
    const { populateZModes } = await import('../../ui-helpers.js');
    const { Z_MODES } = await import('../../ui-constants.js');
    const { createColorPaletteGrid, COLOR_PALETTE_KEYS } = await import('../../ui-color-palettes.js');
    
    // Populate Z-modes dropdown for ClickSnake
    populateZModes('snakeZMode', Z_MODES.WAVE);
    
    // Create color palette grid for DragSpiral
    createColorPaletteGrid('spiralColorPaletteGrid', COLOR_PALETTE_KEYS.RAINBOW, (paletteKey) => {
        console.log(`🎨 Selected palette: ${paletteKey}`);
        // TODO: Update DragSpiral to use selected palette
    });
    
    console.log('🎨 Drag effects UI initialized (Z-modes + color palettes)');
}
