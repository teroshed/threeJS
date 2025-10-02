/**
 * 🎵 AUDIO ANALYZER
 * 
 * Handles Web Audio API integration, FFT analysis, and beat detection
 * for real-time audio visualization.
 */

export default class AudioAnalyzer {
    constructor() {
        this.audioContext = null;
        this.analyser = null;
        this.source = null;
        this.audioElement = null;
        
        // Analysis data
        this.frequencyData = null;
        this.timeDomainData = null;
        this.bufferLength = 0;
        
        // Beat detection
        this.beatDetector = new BeatDetector();
        this.lastBeatTime = 0;
        this.beatThreshold = 0.3;
        
        // Audio state
        this.isPlaying = false;
        this.volume = 1.0;
        this.currentTime = 0;
        this.duration = 0;
        
        // Frequency bands for visualization
        this.frequencyBands = 32;
        this.frequencyDataArray = new Uint8Array(32);
        
        console.log('🎵 AudioAnalyzer initialized');
    }

    /**
     * Initialize Web Audio API
     */
    async initialize() {
        try {
            // Create audio context
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Create analyser node
            this.analyser = this.audioContext.createAnalyser();
            this.analyser.fftSize = 256; // Higher = more frequency resolution
            this.analyser.smoothingTimeConstant = 0.8; // Smoother transitions
            
            // Get buffer length
            this.bufferLength = this.analyser.frequencyBinCount;
            this.frequencyData = new Uint8Array(this.bufferLength);
            this.timeDomainData = new Uint8Array(this.bufferLength);
            
            console.log('🎵 Web Audio API initialized');
            console.log(`   FFT Size: ${this.analyser.fftSize}`);
            console.log(`   Buffer Length: ${this.bufferLength}`);
            
            return true;
        } catch (error) {
            console.error('❌ Failed to initialize audio:', error);
            return false;
        }
    }

    /**
     * Load and play an audio file
     */
    async loadAudioFile(file) {
        try {
            // Create audio element
            this.audioElement = new Audio();
            this.audioElement.crossOrigin = 'anonymous';
            
            // Create object URL from file
            const audioURL = URL.createObjectURL(file);
            this.audioElement.src = audioURL;
            
            // Connect to Web Audio API
            this.source = this.audioContext.createMediaElementSource(this.audioElement);
            this.source.connect(this.analyser);
            this.analyser.connect(this.audioContext.destination);
            
            // Set up event listeners
            this.setupAudioEventListeners();
            
            // Load the audio
            await this.audioElement.load();
            this.duration = this.audioElement.duration;
            
            console.log(`🎵 Audio loaded: ${file.name}`);
            console.log(`   Duration: ${this.duration.toFixed(2)}s`);
            
            return true;
        } catch (error) {
            console.error('❌ Failed to load audio file:', error);
            return false;
        }
    }

    /**
     * Set up audio event listeners
     */
    setupAudioEventListeners() {
        this.audioElement.addEventListener('play', () => {
            this.isPlaying = true;
            console.log('▶️ Audio playing');
        });

        this.audioElement.addEventListener('pause', () => {
            this.isPlaying = false;
            console.log('⏸️ Audio paused');
        });

        this.audioElement.addEventListener('ended', () => {
            this.isPlaying = false;
            this.currentTime = 0;
            console.log('🔚 Audio ended');
        });

        this.audioElement.addEventListener('timeupdate', () => {
            this.currentTime = this.audioElement.currentTime;
        });

        this.audioElement.addEventListener('volumechange', () => {
            this.volume = this.audioElement.volume;
        });
    }

    /**
     * Play the audio
     */
    async play() {
        if (!this.audioElement) {
            console.warn('⚠️ No audio loaded');
            return false;
        }

        try {
            // Resume audio context if suspended
            if (this.audioContext.state === 'suspended') {
                await this.audioContext.resume();
            }
            
            await this.audioElement.play();
            return true;
        } catch (error) {
            console.error('❌ Failed to play audio:', error);
            return false;
        }
    }

    /**
     * Pause the audio
     */
    pause() {
        if (this.audioElement) {
            this.audioElement.pause();
        }
    }

    /**
     * Stop the audio
     */
    stop() {
        if (this.audioElement) {
            this.audioElement.pause();
            this.audioElement.currentTime = 0;
        }
    }

    /**
     * Set volume (0.0 to 1.0)
     */
    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
        if (this.audioElement) {
            this.audioElement.volume = this.volume;
        }
    }

    /**
     * Seek to specific time
     */
    seekTo(time) {
        if (this.audioElement) {
            this.audioElement.currentTime = Math.max(0, Math.min(this.duration, time));
        }
    }

    /**
     * Update analysis data (call this every frame)
     */
    update() {
        if (!this.analyser || !this.isPlaying) {
            return;
        }

        // Get frequency data
        this.analyser.getByteFrequencyData(this.frequencyData);
        
        // Get time domain data (waveform)
        this.analyser.getByteTimeDomainData(this.timeDomainData);
        
        // Update frequency bands for visualization
        this.updateFrequencyBands();
        
        // Update beat detection
        this.updateBeatDetection();
    }

    /**
     * Update frequency bands for visualization
     */
    updateFrequencyBands() {
        const bandSize = Math.floor(this.bufferLength / this.frequencyBands);
        
        for (let i = 0; i < this.frequencyBands; i++) {
            let sum = 0;
            const start = i * bandSize;
            const end = Math.min(start + bandSize, this.bufferLength);
            
            for (let j = start; j < end; j++) {
                sum += this.frequencyData[j];
            }
            
            this.frequencyDataArray[i] = sum / (end - start);
        }
    }

    /**
     * Update beat detection
     */
    updateBeatDetection() {
        // Simple beat detection based on bass frequencies (0-4 bands)
        const bassSum = this.frequencyDataArray.slice(0, 4).reduce((a, b) => a + b, 0);
        const bassAverage = bassSum / 4;
        
        // Check if this is a beat
        const isBeat = bassAverage > this.beatThreshold && 
                      (Date.now() - this.lastBeatTime) > 200; // Minimum 200ms between beats
        
        if (isBeat) {
            this.lastBeatTime = Date.now();
            this.beatDetector.onBeat(bassAverage);
        }
    }

    /**
     * Get current frequency data
     */
    getFrequencyData() {
        return this.frequencyDataArray;
    }

    /**
     * Get current time domain data
     */
    getTimeDomainData() {
        return this.timeDomainData;
    }

    /**
     * Get beat detection result
     */
    getBeat() {
        return this.beatDetector.getBeat();
    }

    /**
     * Get overall volume level
     */
    getVolumeLevel() {
        if (!this.frequencyData) return 0;
        
        let sum = 0;
        for (let i = 0; i < this.frequencyData.length; i++) {
            sum += this.frequencyData[i];
        }
        return sum / this.frequencyData.length / 255; // Normalize to 0-1
    }

    /**
     * Get bass level (low frequencies)
     */
    getBassLevel() {
        if (!this.frequencyDataArray) return 0;
        
        const bassSum = this.frequencyDataArray.slice(0, 4).reduce((a, b) => a + b, 0);
        return bassSum / 4 / 255; // Normalize to 0-1
    }

    /**
     * Get treble level (high frequencies)
     */
    getTrebleLevel() {
        if (!this.frequencyDataArray) return 0;
        
        const trebleSum = this.frequencyDataArray.slice(-8).reduce((a, b) => a + b, 0);
        return trebleSum / 8 / 255; // Normalize to 0-1
    }

    /**
     * Set beat detection sensitivity
     */
    setBeatThreshold(threshold) {
        this.beatThreshold = Math.max(0, Math.min(1, threshold));
    }

    /**
     * Clean up resources
     */
    dispose() {
        if (this.audioElement) {
            this.audioElement.pause();
            this.audioElement.src = '';
        }
        
        if (this.source) {
            this.source.disconnect();
        }
        
        if (this.audioContext) {
            this.audioContext.close();
        }
    }
}

/**
 * Simple beat detector
 */
class BeatDetector {
    constructor() {
        this.beatHistory = [];
        this.beatThreshold = 0.3;
        this.lastBeatTime = 0;
        this.isBeat = false;
    }

    onBeat(intensity) {
        this.isBeat = true;
        this.lastBeatTime = Date.now();
        
        // Add to history for pattern detection
        this.beatHistory.push({
            time: this.lastBeatTime,
            intensity: intensity
        });
        
        // Keep only recent beats
        if (this.beatHistory.length > 10) {
            this.beatHistory.shift();
        }
    }

    getBeat() {
        const result = {
            isBeat: this.isBeat,
            intensity: this.beatHistory.length > 0 ? this.beatHistory[this.beatHistory.length - 1].intensity : 0,
            timeSinceLastBeat: Date.now() - this.lastBeatTime
        };
        
        // Reset beat flag
        this.isBeat = false;
        
        return result;
    }
}