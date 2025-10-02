/**
 * 🎵 AUDIO CONTROLLER
 * 
 * Handles all audio UI interactions and connects to AudioAnalyzer
 */

import AudioAnalyzer from '../effects/audioAnalyzer/AudioAnalyzer.js';
import MP3Converter from '../effects/audioAnalyzer/mp3Converter.js';

export default class AudioController {
    constructor() {
        this.audioAnalyzer = new AudioAnalyzer();
        this.mp3Converter = new MP3Converter();
        this.isInitialized = false;
        this.currentFile = null;
        
        // UI elements
        this.elements = {};
        
        // Animation frame for real-time updates
        this.animationId = null;
        
        console.log('🎵 AudioController initialized');
    }

    /**
     * Initialize the audio controller
     */
    async initialize() {
        try {
            // Initialize audio analyzer
            const success = await this.audioAnalyzer.initialize();
            if (!success) {
                throw new Error('Failed to initialize audio analyzer');
            }

            // Get UI elements
            this.getUIElements();
            
            // Setup event listeners
            this.setupEventListeners();
            
            this.isInitialized = true;
            console.log('🎵 AudioController ready');
            
            return true;
        } catch (error) {
            console.error('❌ Failed to initialize audio controller:', error);
            return false;
        }
    }

    /**
     * Get all UI elements
     */
    getUIElements() {
        this.elements = {
            // File upload
            fileInput: document.getElementById('audioFileInput'),
            fileInfo: document.getElementById('fileInfo'),
            fileName: document.getElementById('fileName'),
            fileSize: document.getElementById('fileSize'),
            
            // Audio controls
            playPauseBtn: document.getElementById('playPauseBtn'),
            stopBtn: document.getElementById('stopBtn'),
            volumeSlider: document.getElementById('volumeSlider'),
            volumeValue: document.getElementById('volumeValue'),
            seekSlider: document.getElementById('seekSlider'),
            timeDisplay: document.getElementById('timeDisplay'),
            beatThreshold: document.getElementById('beatThreshold'),
            beatThresholdValue: document.getElementById('beatThresholdValue'),
            
            // Audio status
            volumeLevelBar: document.getElementById('volumeLevelBar'),
            bassLevelBar: document.getElementById('bassLevelBar'),
            trebleLevelBar: document.getElementById('trebleLevelBar'),
            beatIndicator: document.getElementById('beatIndicator')
        };
    }

    /**
     * Update UI elements (called when panel is loaded)
     */
    updateUIElements() {
        this.getUIElements();
        // Don't setup event listeners here - they're already set up in initialize()
        // This just refreshes the element references
    }

    /**
     * Setup all event listeners
     */
    setupEventListeners() {
        // Avoid double-binding
        if (this._listenersBound) {
            return;
        }
        this._listenersBound = true;
        // File upload
        this.elements.fileInput?.addEventListener('change', (e) => {
            this.handleFileUpload(e.target.files[0]);
        });

        // Playback controls
        this.elements.playPauseBtn?.addEventListener('click', () => {
            this.togglePlayPause();
        });

        this.elements.stopBtn?.addEventListener('click', () => {
            this.stop();
        });

        // Volume control
        this.elements.volumeSlider?.addEventListener('input', (e) => {
            this.setVolume(parseFloat(e.target.value));
        });

        // Seek control
        this.elements.seekSlider?.addEventListener('input', (e) => {
            this.seekTo(parseFloat(e.target.value));
        });

        // Beat threshold
        this.elements.beatThreshold?.addEventListener('input', (e) => {
            this.setBeatThreshold(parseFloat(e.target.value));
        });

        // Start real-time updates
        this.startUpdates();
    }

    /**
     * Handle file upload
     */
    async handleFileUpload(file) {
        if (!file) return;

        try {
            // Show loading state
            this.showFileInfo('Loading...', '0 MB');

            // Process file
            const fileInfo = await this.mp3Converter.processFile(file);
            
            // Load audio
            const success = await this.audioAnalyzer.loadAudioFile(file);
            if (!success) {
                throw new Error('Failed to load audio file');
            }

            // Update UI
            this.currentFile = fileInfo;
            this.showFileInfo(fileInfo.name, this.mp3Converter.formatFileSize(fileInfo.size));
            this.showAudioControls();
            this.showAudioStatus();
            this.updateAudioStatusIndicator();
            
            // Update seek slider max
            this.elements.seekSlider.max = this.audioAnalyzer.duration;
            
            console.log('🎵 Audio file loaded successfully');

        } catch (error) {
            console.error('❌ Failed to load audio file:', error);
            this.showError(error.message);
        }
    }

    /**
     * Toggle play/pause
     */
    async togglePlayPause() {
        if (!this.audioAnalyzer.audioElement) {
            console.warn('⚠️ No audio loaded');
            return;
        }

        if (this.audioAnalyzer.isPlaying) {
            this.audioAnalyzer.pause();
            if (this.elements.playPauseBtn) {
                this.elements.playPauseBtn.textContent = '▶️ Play';
            }
        } else {
            const success = await this.audioAnalyzer.play();
            if (success && this.elements.playPauseBtn) {
                this.elements.playPauseBtn.textContent = '⏸️ Pause';
            }
        }
    }

    /**
     * Stop audio
     */
    stop() {
        this.audioAnalyzer.stop();
        if (this.elements.playPauseBtn) {
            this.elements.playPauseBtn.textContent = '▶️ Play';
        }
        if (this.elements.seekSlider) {
            this.elements.seekSlider.value = 0;
        }
        this.updateTimeDisplay();
    }

    /**
     * Set volume
     */
    setVolume(volume) {
        this.audioAnalyzer.setVolume(volume);
        if (this.elements.volumeValue) {
            this.elements.volumeValue.textContent = Math.round(volume * 100) + '%';
        }
    }

    /**
     * Seek to specific time
     */
    seekTo(progress) {
        if (this.audioAnalyzer.duration > 0) {
            const time = (progress / 100) * this.audioAnalyzer.duration;
            this.audioAnalyzer.seekTo(time);
        }
    }

    /**
     * Set beat threshold
     */
    setBeatThreshold(threshold) {
        console.log(`🎵 Setting beat threshold to: ${threshold}`);
        this.audioAnalyzer.setBeatThreshold(threshold);
        if (this.elements.beatThresholdValue) {
            this.elements.beatThresholdValue.textContent = Math.round(threshold * 100) + '%';
        }
    }

    /**
     * Show file info
     */
    showFileInfo(name, size) {
        if (this.elements.fileName) {
            this.elements.fileName.textContent = name;
        }
        if (this.elements.fileSize) {
            this.elements.fileSize.textContent = size;
        }
        if (this.elements.fileInfo) {
            this.elements.fileInfo.style.display = 'block';
        }
    }

    /**
     * Show audio controls
     */
    showAudioControls() {
        const playbackSection = document.getElementById('playbackSection');
        if (playbackSection) {
            playbackSection.style.display = 'block';
        }
    }

    /**
     * Show audio status
     */
    showAudioStatus() {
        const statusSection = document.getElementById('statusSection');
        if (statusSection) {
            statusSection.style.display = 'block';
        }
    }

    /**
     * Show error message
     */
    showError(message) {
        if (this.elements.fileName) {
            this.elements.fileName.textContent = 'Error: ' + message;
        }
        if (this.elements.fileSize) {
            this.elements.fileSize.textContent = '';
        }
        if (this.elements.fileInfo) {
            this.elements.fileInfo.style.display = 'block';
        }
    }

    /**
     * Update time display
     */
    updateTimeDisplay() {
        if (!this.audioAnalyzer.audioElement) return;

        const current = this.audioAnalyzer.currentTime;
        const duration = this.audioAnalyzer.duration;
        
        const currentStr = this.formatTime(current);
        const durationStr = this.formatTime(duration);
        
        if (this.elements.timeDisplay) {
            this.elements.timeDisplay.textContent = `${currentStr} / ${durationStr}`;
        }
        
        // Update seek slider
        if (duration > 0 && this.elements.seekSlider) {
            const progress = (current / duration) * 100;
            this.elements.seekSlider.value = progress;
        }
    }

    /**
     * Format time for display
     */
    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    /**
     * Start real-time updates
     */
    startUpdates() {
        const update = () => {
            if (this.isInitialized) {
                this.update();
            }
            this.animationId = requestAnimationFrame(update);
        };
        update();
    }

    /**
     * Update audio analysis and UI
     */
    update() {
        if (!this.audioAnalyzer.isPlaying) return;

        // Update audio analysis
        this.audioAnalyzer.update();

        // Update time display
        this.updateTimeDisplay();
        
        // Update audio status indicator
        this.updateAudioStatusIndicator();

        // Update volume level bar
        const volumeLevel = this.audioAnalyzer.getVolumeLevel();
        if (this.elements.volumeLevelBar) {
            this.elements.volumeLevelBar.style.width = (volumeLevel * 100) + '%';
        }

        // Update frequency bars
        const bassLevel = this.audioAnalyzer.getBassLevel();
        const trebleLevel = this.audioAnalyzer.getTrebleLevel();
        
        if (this.elements.bassLevelBar) {
            this.elements.bassLevelBar.style.width = (bassLevel * 100) + '%';
        }
        if (this.elements.trebleLevelBar) {
            this.elements.trebleLevelBar.style.width = (trebleLevel * 100) + '%';
        }

        // Update beat indicator
        const beat = this.audioAnalyzer.getBeat();
        if (beat.isBeat && this.elements.beatIndicator) {
            this.elements.beatIndicator.classList.add('beat-active');
            setTimeout(() => {
                if (this.elements.beatIndicator) {
                    this.elements.beatIndicator.classList.remove('beat-active');
                }
            }, 200);
        }
    }

    /**
     * Get audio analyzer instance (for effects to use)
     */
    getAudioAnalyzer() {
        return this.audioAnalyzer;
    }

    /**
     * Update audio status indicator in the UI
     */
    updateAudioStatusIndicator() {
        const statusIndicator = document.getElementById('audioStatusIndicator');
        const statusText = document.getElementById('audioStatusText');
        const beatStatus = document.getElementById('audioBeatStatus');
        
        if (!statusIndicator || !statusText || !beatStatus) return;
        
        if (this.audioAnalyzer && this.audioAnalyzer.audioElement) {
            statusIndicator.style.display = 'block';
            
            if (this.audioAnalyzer.isPlaying) {
                statusText.textContent = '🎵 Audio Playing';
                statusText.style.color = '#4CAF50';
                
                const beat = this.audioAnalyzer.getBeat();
                const volume = this.audioAnalyzer.getVolumeLevel();
                const bass = this.audioAnalyzer.getBassLevel();
                const treble = this.audioAnalyzer.getTrebleLevel();
                
                beatStatus.innerHTML = `
                    <div>Volume: ${(volume * 100).toFixed(0)}% | Bass: ${(bass * 100).toFixed(0)}% | Treble: ${(treble * 100).toFixed(0)}%</div>
                    <div style="margin-top: 4px;">${beat.isBeat ? '🎵 BEAT DETECTED!' : 'Listening...'}</div>
                `;
            } else {
                statusText.textContent = '⏸️ Audio Paused';
                statusText.style.color = '#ff9800';
                beatStatus.textContent = 'Click play to start audio-responsive effects!';
            }
        } else {
            statusIndicator.style.display = 'block';
            statusText.textContent = '📁 No Audio Loaded';
            statusText.style.color = '#ff6b6b';
            beatStatus.textContent = 'Upload an MP3 file to see audio-responsive effects!';
        }
    }

    /**
     * Clean up resources
     */
    dispose() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        this.audioAnalyzer.dispose();
        this.mp3Converter.dispose();
    }
}
