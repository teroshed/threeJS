# 🎵 Audio Analyzer System

## Overview

The audio analyzer system provides real-time audio analysis and visualization capabilities for the Three.js visualizer. It handles MP3 file upload, Web Audio API integration, and provides data for audio-reactive effects.

## Files

### `AudioAnalyzer.js`
Main audio analysis class that handles:
- Web Audio API initialization
- Audio file loading and playback
- Real-time frequency analysis (FFT)
- Beat detection
- Volume and frequency level monitoring

### `mp3Converter.js`
File handling utility that manages:
- MP3 file upload and validation
- File format support (MP3, WAV, OGG, M4A)
- File size validation (50MB limit)
- File metadata extraction

## Usage

```javascript
import AudioAnalyzer from './effects/audioAnalyzer/AudioAnalyzer.js';
import MP3Converter from './effects/audioAnalyzer/mp3Converter.js';

// Initialize
const audioAnalyzer = new AudioAnalyzer();
await audioAnalyzer.initialize();

// Load audio file
const file = document.getElementById('fileInput').files[0];
await audioAnalyzer.loadAudioFile(file);

// Play audio
await audioAnalyzer.play();

// Get analysis data
const frequencyData = audioAnalyzer.getFrequencyData();
const beat = audioAnalyzer.getBeat();
const volumeLevel = audioAnalyzer.getVolumeLevel();
```

## Features

### Audio Analysis
- **Frequency Analysis**: 32-band FFT analysis
- **Beat Detection**: Real-time beat detection with configurable sensitivity
- **Volume Monitoring**: Overall volume and frequency-specific levels
- **Time Domain**: Waveform data for visualization

### File Support
- MP3, WAV, OGG, M4A formats
- File size validation (50MB max)
- Automatic format detection
- Error handling and user feedback

### Real-time Updates
- 60fps analysis updates
- Smooth data transitions
- Configurable sensitivity
- Performance optimized

## Integration

The audio system integrates seamlessly with the existing effects system:

1. **AudioController** manages UI interactions
2. **AudioAnalyzer** provides data to effects
3. **Effects** can access audio data via `audioController.getAudioAnalyzer()`

## Future Enhancements

- Audio-reactive effects (BeatSnake, FrequencySpiral, etc.)
- Advanced beat detection algorithms
- Audio spectrum visualization
- Multiple audio source support
- Audio effects and filters
