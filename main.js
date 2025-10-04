import * as THREE from 'three';
import EffectsManager from './effects/EffectsManager.js';
import { initUI } from './ui/ui-controller.js';
import { syncUIWithEffectStates } from './ui/ui-init.js';
import AudioPanelManager from './ui/components/audio/audio-panel-manager.js';
import { CameraController } from './ui/camera-controller.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const effectsManager = new EffectsManager();
const audioPanelManager = new AudioPanelManager();

// Initialize camera controller
let cameraController = null;

camera.position.z = 10;

function animate() {
    renderer.render(scene, camera);
    effectsManager.update(camera, scene, mousePosition);
}

renderer.setAnimationLoop(animate);

const mousePosition = new THREE.Vector2();

const onStart = async () => {
    // Initialize audio panel manager first
    await audioPanelManager.initialize();
    
    // Get audio analyzer before initializing effects
    const audioAnalyzer = audioPanelManager.audioController.getAudioAnalyzer();
    
    // Initialize effects manager
    effectsManager.initialize();
    
    // Set audio analyzer for all effects
    effectsManager.setAudioAnalyzer(audioAnalyzer);
    
    // Initialize UI controller with renderer for gradient support
    initUI(effectsManager, scene, renderer);
    
    // Enable effects AFTER UI is initialized
    effectsManager.setEffectActive("ClickSnake", true);
    effectsManager.setEffectActive("RandomCubes", true); // Enable RandomCubes for beat testing
    effectsManager.setEffectActive("Kaleidoscope", true); // Enable Kaleidoscope for testing
    effectsManager.setEffectActive("Supershape", true); // Enable Supershape for testing
    
    // Sync UI with actual effect states
    syncUIWithEffectStates();
    
    // Initialize camera controller
    cameraController = new CameraController(camera, renderer);
    
    console.log('🎵 Audio-responsive effects ready! Upload an MP3 and watch the cubes dance! 🕺');
    console.log('🎥 Camera controls: Right-click + drag to rotate, scroll to zoom');
}

onStart();

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

window.addEventListener('keydown', (event) => {
    if(event.key === ' ') {
        effectsManager.clearEffects();
    }
});

renderer.domElement.addEventListener('mouseup', () => {
    effectsManager.updateMouseDown(false);
});

renderer.domElement.addEventListener('mousedown', (event) => {
    effectsManager.updateMouseDown(true);
});

renderer.domElement.addEventListener('mousemove', (event) => {
    mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
    mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;
    effectsManager.updateMousePosition(mousePosition);
});

// Export for debugging
window.effectsManager = effectsManager;
window.audioPanelManager = audioPanelManager;
window.scene = scene;
window.cameraController = cameraController;
console.log('🚀 Three.js Visualizer initialized');
