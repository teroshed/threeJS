/**
 * 🎵 MP3 CONVERTER & FILE HANDLER
 * 
 * Handles MP3 file upload, validation, and preparation for Web Audio API
 */

export default class MP3Converter {
    constructor() {
        this.supportedFormats = ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg', 'audio/m4a'];
        this.maxFileSize = 50 * 1024 * 1024; // 50MB limit
        this.currentFile = null;
        
        console.log('🎵 MP3Converter initialized');
    }

    /**
     * Validate uploaded file
     */
    validateFile(file) {
        // Check file type
        if (!this.supportedFormats.includes(file.type)) {
            return {
                valid: false,
                error: `Unsupported file format: ${file.type}. Supported formats: MP3, WAV, OGG, M4A`
            };
        }

        // Check file size
        if (file.size > this.maxFileSize) {
            return {
                valid: false,
                error: `File too large: ${(file.size / 1024 / 1024).toFixed(1)}MB. Maximum size: 50MB`
            };
        }

        // Check if file is empty
        if (file.size === 0) {
            return {
                valid: false,
                error: 'File is empty'
            };
        }

        return {
            valid: true,
            file: file
        };
    }

    /**
     * Process uploaded file
     */
    async processFile(file) {
        const validation = this.validateFile(file);
        
        if (!validation.valid) {
            throw new Error(validation.error);
        }

        this.currentFile = file;
        
        // Create object URL for the file
        const audioURL = URL.createObjectURL(file);
        
        // Get file info
        const fileInfo = {
            name: file.name,
            size: file.size,
            type: file.type,
            url: audioURL,
            duration: 0 // Will be set when audio loads
        };

        console.log(`🎵 File processed: ${file.name}`);
        console.log(`   Size: ${(file.size / 1024 / 1024).toFixed(2)}MB`);
        console.log(`   Type: ${file.type}`);

        return fileInfo;
    }

    /**
     * Get file duration (async)
     */
    async getFileDuration(audioURL) {
        return new Promise((resolve, reject) => {
            const audio = new Audio();
            audio.crossOrigin = 'anonymous';
            
            audio.addEventListener('loadedmetadata', () => {
                const duration = audio.duration;
                audio.remove(); // Clean up
                resolve(duration);
            });
            
            audio.addEventListener('error', (e) => {
                audio.remove(); // Clean up
                reject(new Error('Failed to load audio metadata'));
            });
            
            audio.src = audioURL;
        });
    }

    /**
     * Format file size for display
     */
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    /**
     * Format duration for display
     */
    formatDuration(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    /**
     * Get file extension
     */
    getFileExtension(filename) {
        return filename.split('.').pop().toLowerCase();
    }

    /**
     * Check if file is MP3
     */
    isMP3(file) {
        return file.type === 'audio/mpeg' || 
               file.type === 'audio/mp3' || 
               this.getFileExtension(file.name) === 'mp3';
    }

    /**
     * Clean up resources
     */
    dispose() {
        if (this.currentFile) {
            // Revoke object URL to free memory
            if (this.currentFile.url) {
                URL.revokeObjectURL(this.currentFile.url);
            }
            this.currentFile = null;
        }
    }
}