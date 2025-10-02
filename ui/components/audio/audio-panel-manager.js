/**
 * 🎵 AUDIO PANEL MANAGER
 * 
 * Manages the audio panel component and its interactions
 */

import AudioController from '../../audio-controller.js';

export default class AudioPanelManager {
    constructor() {
        this.audioController = new AudioController();
        this.panel = null;
        this.toggleBtn = null;
        this.isOpen = false;
        
        console.log('🎵 AudioPanelManager initialized');
    }

    /**
     * Initialize the audio panel
     */
    async initialize() {
        try {
            // Load the audio panel template
            await this.loadAudioPanel();
            
            // Initialize audio controller
            await this.audioController.initialize();
            
            // Setup event listeners
            this.setupEventListeners();
            
            console.log('🎵 Audio panel ready');
            return true;
        } catch (error) {
            console.error('❌ Failed to initialize audio panel:', error);
            return false;
        }
    }

    /**
     * Load audio panel template
     */
    async loadAudioPanel() {
        try {
            const response = await fetch('/ui/components/audio/templates/audio-panel.html');
            const html = await response.text();

            // Create container for the panel
            const container = document.createElement('div');
            container.innerHTML = html;

            // Append ALL top-level nodes from template (panel + toggle button)
            while (container.firstElementChild) {
                document.body.appendChild(container.firstElementChild);
            }

            // Get panel elements
            this.panel = document.getElementById('audioPanel');
            this.toggleBtn = document.getElementById('audioToggleBtn');
            
            if (!this.panel || !this.toggleBtn) {
                throw new Error('Failed to find audio panel elements');
            }
            
            console.log('🎵 Audio panel template loaded');
        } catch (error) {
            console.error('❌ Failed to load audio panel template:', error);
            throw error;
        }
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Toggle button
        this.toggleBtn?.addEventListener('click', () => {
            this.togglePanel();
        });

        // Close button
        const closeBtn = document.getElementById('audioCloseBtn');
        closeBtn?.addEventListener('click', () => {
            this.closePanel();
        });

        // File input
        const fileInput = document.getElementById('audioFileInput');
        fileInput?.addEventListener('change', (e) => {
            this.handleFileUpload(e.target.files[0]);
        });

        // Playback controls
        const playPauseBtn = document.getElementById('playPauseBtn');
        const stopBtn = document.getElementById('stopBtn');
        
        playPauseBtn?.addEventListener('click', () => {
            this.togglePlayPause();
        });

        stopBtn?.addEventListener('click', () => {
            this.stop();
        });

        // Volume control
        const volumeSlider = document.getElementById('volumeSlider');
        volumeSlider?.addEventListener('input', (e) => {
            this.setVolume(parseFloat(e.target.value));
        });

        // Seek control
        const seekSlider = document.getElementById('seekSlider');
        seekSlider?.addEventListener('input', (e) => {
            this.seekTo(parseFloat(e.target.value));
        });

        // Beat threshold
        const beatThreshold = document.getElementById('beatThreshold');
        beatThreshold?.addEventListener('input', (e) => {
            this.setBeatThreshold(parseFloat(e.target.value));
        });

        // Update audio controller with new UI elements
        this.audioController.updateUIElements();
    }

    /**
     * Toggle panel visibility
     */
    togglePanel() {
        if (this.isOpen) {
            this.closePanel();
        } else {
            this.openPanel();
        }
    }

    /**
     * Open panel
     */
    openPanel() {
        this.panel?.classList.add('open');
        this.isOpen = true;
    }

    /**
     * Close panel
     */
    closePanel() {
        this.panel?.classList.remove('open');
        this.isOpen = false;
    }

    /**
     * Handle file upload
     */
    async handleFileUpload(file) {
        if (!file) return;

        try {
            // Show loading state
            this.showFileInfo('Loading...', '0 MB');

            // Process file through audio controller
            await this.audioController.handleFileUpload(file);

            // Show additional sections
            this.showPlaybackSection();
            this.showAnalysisSection();
            this.showStatusSection();

        } catch (error) {
            console.error('❌ File upload failed:', error);
            this.showError(error.message);
        }
    }

    /**
     * Toggle play/pause
     */
    async togglePlayPause() {
        await this.audioController.togglePlayPause();
    }

    /**
     * Stop audio
     */
    stop() {
        this.audioController.stop();
    }

    /**
     * Set volume
     */
    setVolume(volume) {
        this.audioController.setVolume(volume);
    }

    /**
     * Seek to specific time
     */
    seekTo(progress) {
        this.audioController.seekTo(progress);
    }

    /**
     * Set beat threshold
     */
    setBeatThreshold(threshold) {
        this.audioController.setBeatThreshold(threshold);
    }

    /**
     * Show file info
     */
    showFileInfo(name, size) {
        const fileName = document.getElementById('fileName');
        const fileSize = document.getElementById('fileSize');
        const fileInfo = document.getElementById('fileInfo');
        
        if (fileName) fileName.textContent = name;
        if (fileSize) fileSize.textContent = size;
        if (fileInfo) fileInfo.style.display = 'block';
    }

    /**
     * Show error message
     */
    showError(message) {
        this.showFileInfo('Error: ' + message, '');
    }

    /**
     * Show playback section
     */
    showPlaybackSection() {
        const section = document.getElementById('playbackSection');
        if (section) section.style.display = 'block';
    }

    /**
     * Show analysis section
     */
    showAnalysisSection() {
        const section = document.getElementById('analysisSection');
        if (section) section.style.display = 'block';
    }

    /**
     * Show status section
     */
    showStatusSection() {
        const section = document.getElementById('statusSection');
        if (section) section.style.display = 'block';
    }

    /**
     * Get audio controller instance
     */
    getAudioController() {
        return this.audioController;
    }

    /**
     * Clean up resources
     */
    dispose() {
        this.audioController.dispose();
        
        if (this.panel) {
            this.panel.remove();
        }
        
        if (this.toggleBtn) {
            this.toggleBtn.remove();
        }
    }
}
